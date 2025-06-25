import {useState} from "react";

export function VsixDownloader() {
    const [publisher, setPublisher] = useState("")
    const [name, setName] = useState("")
    const [version, setVersion] = useState("")

    function downloadVSIX() {
        window.open(`https://${publisher}.gallery.vsassets.io/_apis/public/gallery/publisher/${publisher}/extension/${name}/${version}/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage`,
            "_blank")
    }

    return (
        <>
            <p>
                <label>Publisher: </label>
                <input type="text" value={publisher} onChange={e => setPublisher(e.target.value)}/>
            </p>
            <p>
                <label>Name: </label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            </p>
            <p>
                <label>Version: </label>
                <input type="text" value={version} onChange={e => setVersion(e.target.value)}/>
            </p>
            <button onClick={downloadVSIX} disabled={!publisher || !name || !version}>Download VSIX</button>

        </>
    )
}