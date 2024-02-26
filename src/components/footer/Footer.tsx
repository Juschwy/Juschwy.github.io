import "./footer.css"
import {NavLink} from "react-router-dom";

export function Footer(){
    return (
        <footer>
            <p> ©JUSCHWY</p>
            <div className="vertivalList">
                <NavLink to={"/llor-kcir"}>Impressum</NavLink>
                |
                <NavLink to={"/llor-kcir"}>Kontakt</NavLink>
            </div>
        </footer>
    )
}