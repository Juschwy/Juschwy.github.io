import {useEffect} from "react";

export function Rick(){
    useEffect(() => {
        document.title = "_U'VE_BEEN_RICK_ROLLED_"
    }, []);

    return (
        <video autoPlay loop>
            <source src="/vid/video.webm" type="video/webm"/>
        </video>
    )
}