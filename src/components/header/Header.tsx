import {NavLink} from "react-router-dom";
import "./header.css"

export function Header() {
    return (
        <header>
            <div>
                <img src="/icons/skullredhat.png" alt="Logo"/>
                <h1>JUSCHWY</h1>
            </div>
            <nav>
                <NavLink to={"/"}>Start</NavLink>
                <NavLink to={"/projects"}>Projects</NavLink>
            </nav>
        </header>
    )
}