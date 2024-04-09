import {NavLink} from "react-router-dom";

export function Projects(){
    return (
        <>
            <h1>Projects</h1>
            <ul>
                <li><NavLink to={"./welements"}>WElements</NavLink></li>
                <li><NavLink to={"./lspa-webcams"}>LSPA-Webcams</NavLink></li>
                <li><NavLink to={"./peer-tac-toe"}>Peer-Tac-Toe</NavLink></li>
            </ul>
        </>
    )
}