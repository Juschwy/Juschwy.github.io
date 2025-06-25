import {useEffect, useRef, useState} from "react";
import {useScores} from "../../../hooks/useScores.ts";
import {useAudioStream} from "../../../hooks/useAudioStream.ts";
import {DtmfReceiver} from "../../../utils/dtmf";

export function HistoryGuesser(){
    const receiverRef = useRef(new DtmfReceiver({duration: 1000, step: 10}));
    const {stopStream, startStream, stream} = useAudioStream()
    const {scores, setScores, clearScores} = useScores()
    const [buffer, setBuffer] = useState("")
    const [info, setInfo] = useState("")
    const [isRecording, setIsRecording] = useState(false)

    /**
     * Format: #*<points>**<100 - points>*#
     * Maybe add also event to score list
     */
    function decodeDtmfPackage(data: unknown) {
        setBuffer(buffer => {
            const newBuffer = buffer + data;
            console.log(newBuffer)

            if (newBuffer.indexOf("#") === -1) {
                return ""
            }

            const matchPackages = /#\*[0-9]+\*\*[0-9]+\*#/.exec(newBuffer)
            if (matchPackages && matchPackages.length == 1) {
                const match = matchPackages[0].replace("#*", "").replace("*#", "")
                const [strValue1, strValue2] = match.split("**")
                const value1 = parseInt(strValue1)
                const value2 = parseInt(strValue2)

                if (isNaN(value1) || isNaN(value2) || value1 + value2 !== 100) {
                    setInfo("Received a package, but it was corrupted, please try again")
                    return ""
                }

                setScores(scores => [...scores, {score: value1, timestamp: new Date()}])
                setBuffer("")
            }

            return newBuffer;
        })
    }

    useEffect(() => {
        if (!stream) return

        receiverRef.current.start(stream, decodeDtmfPackage)
    }, [stream]);

    return (
        <>
            <h1>TipToi History Guesser</h1>
            <h2>Local Scores</h2>
            <p>
                <button disabled={isRecording} onClick={() => {
                    startStream()
                    setIsRecording(true)
                }}>Start</button>
                <button disabled={!isRecording} onClick={() => {
                    stopStream()
                    setBuffer("")
                    setIsRecording(false)
                }}>Stop
                </button>
            </p>
            {info}
            <p>
                Current buffer: {buffer}
            </p>

            <button onClick={clearScores}>Clear scores</button>
            <table>
                <thead>
                <tr>
                    <th>Score</th>
                    <th>Timestamp</th>
                </tr>
                </thead>
                <tbody>
                {
                    scores.map(score => (
                        <tr key={score.timestamp.toISOString()}>
                            <td>{score.score}</td>
                            <td>{score.timestamp.toISOString()}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}