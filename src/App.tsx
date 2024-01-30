import './App.css'
import {Header} from "./components/header/Header.tsx";
import {Display} from "./components/display/Display.tsx";
import {Footer} from "./components/footer/Footer.tsx";
import {MutableRefObject, useEffect, useRef} from "react";

function App() {
    const intervallIdRef = useRef<undefined | number>()
    const titleState = useRef(">")
    useEffect(() => {
        console.log("test")
        intervallIdRef.current = setInterval((titleState: MutableRefObject<string>) => {
            titleState.current = "=" + titleState.current
            if (titleState.current.length >= 23){
                titleState.current = ">"
            }
            document.title = titleState.current
        }, 500, titleState)

        window
    }, []);

    return (
        <>
            <Header/>
            <Display/>
            <Footer/>
        </>
    )
}

export default App
