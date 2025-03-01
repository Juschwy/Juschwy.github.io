import {useAudioStream} from "./useAudioStream.ts";
import {useEffect, useRef, useState} from "react";
import {Receiver, Sender} from "./dtmf";
import {dtmfChars} from "./dtmf/helpers.ts";

//https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

export function AudioImageVisualizer() {
    const WIDTH = 300
    const HEIGHT = 150
    const canvasRef = useRef<null | HTMLCanvasElement>(null);
    const receiverRef = useRef(new Receiver({duration: 100, step: 10}));
    const senderRef = useRef(new Sender({duration: 100, pause: 40}));
    const [sendText, setSendText] = useState("");
    const [receivedText, setReceivedText] = useState("")

    const {stopStream, startStream, stream} = useAudioStream()

    useEffect(() => {
        if (!stream || !canvasRef.current) return
        receiverRef.current.start(stream, (data) => {
            setReceivedText(receivedText => receivedText + data)
        })

        const canvasCtx = canvasRef.current.getContext("2d");
        if (!canvasCtx) return
        const audioCtx = new AudioContext()
        const analyser = audioCtx.createAnalyser()

        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        function draw() {
            if (!canvasCtx) return
            requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);

            canvasCtx.fillStyle = "rgb(0 0 0)";
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            const barWidth = (WIDTH / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;

                canvasCtx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
                canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

                x += barWidth + 1;
            }
        }

        draw();
    }, [stream]);

    function send() {
        senderRef.current.play(sendText, () => console.log("send", sendText))
    }

    function setText(text: string){
        let res = "";
        for (const char of text.toUpperCase()) {
            if (dtmfChars.findIndex(row => row.includes(char)) >= 0){
                res += char
            }
        }
        setSendText(res);
    }

    function addText(text: string){
        setSendText(sendText => sendText + text)
    }

    return (
        <>
            <h1>Audio-Image-Visualizer [Experiment]</h1>
            <div>
                <h2>Stream controls</h2>
                <p>
                    <button onClick={() => startStream()}>Start</button>
                    <button onClick={() => stopStream()}>Stop</button>
                </p>
            </div>
            <hr/>
            <div>
                <h2>Visualiser</h2>
                <canvas ref={canvasRef}/>
            </div>
            <hr/>
            <div>
                <h2>DTMF sender</h2>
                <table>
                    <tbody>
                    {dtmfChars.map((row, i) => (
                        <tr key={i}>
                            {row.map((btn, i) => (
                                <td key={i}>
                                    <button onClick={() => addText(btn)}>{btn}</button>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <p>
                    <input type="text" value={sendText} onChange={v => setText(v.target.value)}/>
                    <button onClick={send}>send</button>
                </p>
            </div>
            <hr/>
            <div>
                <h2>DTMF receiver</h2>
                <output>{receivedText}</output>
            </div>
        </>
    )
}