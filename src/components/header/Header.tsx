import {NavLink} from "react-router-dom";
import "./header.css"

export function Header() {
    return (
        <header>
            <NavLink id={"root-link"} to={"/"}>
                <img src="/icons/skullredhat.png" alt="Logo"/>
                <h1>JUSCHWY</h1>
            </NavLink>
            <nav>
                <NavLink to={"/"}>Start</NavLink>
                <NavLink to={"/projects"}>Projects</NavLink>
            </nav>
        </header>
    )
}