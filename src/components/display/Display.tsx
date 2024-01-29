import {Route, Routes} from "react-router-dom";
import {Start} from "../pages/Start.tsx";
import {Projects} from "../pages/Projects.tsx";
import {NotFound} from "../pages/NotFound.tsx";
import "./display.css"

export function Display(){
    return (
        <main>
            <Routes>
                <Route path={"/"} element={<Start/>}/>
                <Route path={"/projects"} element={<Projects/>}>
                    <Route path={"welements"} element={<h1>Welements</h1>}/>
                    <Route path={"lspa-webcams"} element={<h1>LSPA-Webcams</h1>}/>
                </Route>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
        </main>
    )
}