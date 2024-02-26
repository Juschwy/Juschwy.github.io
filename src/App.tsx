import './App.css'
import {Header} from "./components/header/Header.tsx";
import {Display} from "./components/display/Display.tsx";
import {Footer} from "./components/footer/Footer.tsx";
import {useEffect, useRef} from "react";

function App() {
    const intervallIdRef = useRef<undefined | number>()

    function updateTitleIntervall(){
        if (intervallIdRef.current) {
            clearInterval(intervallIdRef.current)
        }
        if (document.visibilityState == "visible") {
            intervallIdRef.current = setInterval(() => {
                document.title = document.title.charAt(document.title.length - 1) + document.title.substring(0, document.title.length - 1)
            }, 500)
        }
    }

    useEffect(() => {
        document.title = "=======JUSCHWY======="
        updateTitleIntervall();
    }, []);
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
