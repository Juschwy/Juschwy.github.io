import "./lspawebcams.css"
import {useEffect, useRef, useState} from "react";

export function LSPAWebcams() {
    const [counter, setCounter] = useState(0)
    const intevallIdRef = useRef<undefined | number>()
    const [intervalOut, setIntervalOut] = useState(1000)
    const [intervalOn, setIntervalOn] = useState(false)

    function toogleMonitoring() {
        if (intevallIdRef.current) {
            clearInterval(intevallIdRef.current)
        }
        if (intervalOn) {
            intevallIdRef.current = setInterval(() => {
                setCounter(counter => counter + 1)
            }, intervalOut)
        }
    }

    useEffect(() => {
        toogleMonitoring()
    }, [intervalOut, intervalOn]);

    return (
        <>
            <h1>LSPA-Webcams<span style={{color: (counter % 2 == 0 ? "black" : "red")}}>●</span></h1>
            <button onClick={() => setIntervalOn(intervalOn => !intervalOn)}>Monitoring {intervalOn ? "On" : "Off"}</button>
            <br/>
            <label>
                <input type="range" min={100} max={2000} value={intervalOut}
                       onChange={e => setIntervalOut(e.target.valueAsNumber)}/>
                Update image every {intervalOut} ms
            </label>
            <br/>
            <img className="webcam" src={"https://camwest.cumulus-segelflug.ch/snapshot.cgi?t=" + counter}
                 alt="LSPA-Webcam-West"/>
            <br/>
            <img className="webcam" src={"https://camnord.cumulus-segelflug.ch/snap.jpeg?t=" + counter}
                 alt="LSPA-Webcam-Nord"/>
            <br/>
            <img className="webcam" src={"https://camost.cumulus-segelflug.ch/snapshot.cgi?t=" + counter}
                 alt="LSPA-Webcam-Ost"/>
            <br/>
            <iframe src="https://www.flightradar24.com/simple_index.php?lat=47.57403&lon=9.04808&z=12" width="600"
                    height="600"></iframe>
        </>
    )
}