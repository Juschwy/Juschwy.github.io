import './App.css'
import {Header} from "./components/header/Header.tsx";
import {Display} from "./components/display/Display.tsx";
import {Footer} from "./components/footer/Footer.tsx";
import {MutableRefObject, useEffect, useRef} from "react";

function App() {
    const intervallIdRef = useRef<undefined | number>()
    const titleState = useRef("=======JUSCHWY=======")

    function updateTitleIntervall(){
        if (intervallIdRef.current) {
            clearInterval(intervallIdRef.current)
        }
        if (document.visibilityState == "visible") {
            intervallIdRef.current = setInterval((titleState: MutableRefObject<string>) => {
                titleState.current = titleState.current.charAt(titleState.current.length - 1) + titleState.current.substring(0, titleState.current.length - 1)
                document.title = titleState.current
            }, 500, titleState)
        }
    }

    useEffect(updateTitleIntervall, []);
    document.addEventListener("visibilitychange", updateTitleIntervall);

    return (
        <>
            <Header/>
            <Display/>
            <Footer/>
        </>
    )
}

export default App
