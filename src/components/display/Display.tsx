import {Route, Routes} from "react-router-dom";
import {Start} from "../pages/Start.tsx";
import {Projects} from "../pages/Projects.tsx";
import {NotFound} from "../pages/NotFound.tsx";
import "./display.css"
import {WElements} from "../pages/projects/welements/WElements.tsx";

export function Display(){
    return (
        <main>
            <Routes>
                <Route index element={<Start/>}/>
                <Route path={"/projects"} element={<Projects/>}/>
                <Route path={"/projects/welements"} element={<WElements/>}/>
                <Route path={"/projects/lspa-webcams"} element={<h1>LSPA-Webcams</h1>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
        </main>
    )
}