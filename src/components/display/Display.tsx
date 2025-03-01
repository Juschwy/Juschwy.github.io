import {Route, Routes} from "react-router-dom";
import {Start} from "../pages/Start.tsx";
import {Projects} from "../pages/Projects.tsx";
import {NotFound} from "../pages/NotFound.tsx";
import "./display.css"
import {WElements} from "../pages/projects/welements/WElements.tsx";
import {LSPAWebcams} from "../pages/projects/lspa-webcams/LSPAWebcams.tsx";
import {Rick} from "../pages/Rick.tsx";
import PeerTacToe from "../pages/projects/peer-tac-toe/PeerTacToe.tsx";
import {AudioImageVisualizer} from "../pages/projects/audio-image-visualizer/AudioImageVisualizer.tsx";

export function Display(){
    return (
        <main>
            <Routes>
                <Route index element={<Start/>}/>
                <Route path={"/projects"} element={<Projects/>}/>
                <Route path={"/projects/welements"} element={<WElements/>}/>
                <Route path={"/projects/lspa-webcams"} element={<LSPAWebcams/>}/>
                <Route path={"/projects/peer-tac-toe"} element={<PeerTacToe/>}/>
                <Route path={"/projects/audio-image-visualizer"} element={<AudioImageVisualizer/>}/>
                <Route path={"/llor-kcir"} element={<Rick/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
        </main>
    )
}