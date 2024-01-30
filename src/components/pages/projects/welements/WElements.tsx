import {useEffect, useState} from "react";
import {chemicalElement, chemicalElements} from "./chemicalElements.ts";
import "./welements.css"

export function WElements() {
    const [words, setWords] = useState("")
    const [elements, setElements] = useState<{index: number, element: chemicalElement}[]>([])

    useEffect(() => {
        function searchForChars(chars: string) {
            let element = chemicalElements.find(element => element.symbol.toUpperCase() === chars.toUpperCase())
            console.log(element)
            return element;
        }

        let result: {index: number, element: chemicalElement}[] = []
        let input = words

        for (let i = 0; i < input.length; i++) {
            let x = 2;
            let element: chemicalElement;
            const search1 = searchForChars(input.substr(i, 1))
            const search2 = searchForChars(input.substr(i, 2));
            if (search2) {
                x = 2
                element = search2
            } else if (search1) {
                x = 1
                element = search1
            } else {
                x = 1
                element = {symbol: input.substr(i, 1), groupBlock: "standard"}
            }
            console.log(i, x, element.symbol)
            result = [...result, {index: i, element: element}]
            input = input.substr(x - 1, input.length)
            //i -= x;
        }
        setElements(result)
    }, [words]);

    return (
        <>
            <h1>Words to Chemical-Elements</h1>
            <input type="text" value={words} onChange={e => setWords(e.target.value)}/>
            <div id={"images"}>
            {elements.sort((a, b) => a.index - b.index).map((element) => (
                <div className={"element " + element.element.groupBlock}>
                    <div className={"number1"}>{element.element.atomicNumber ? element.element.atomicNumber  : " "}</div>
                    <div className={"number2"}>{element.element.atomicMass ? element.element.atomicMass.substr(0, 5)  : " "}</div>
                    <div className={"symbol"}>{element.element.symbol.toUpperCase()}</div>
                    <div className={"name"}>{element.element.name ? element.element.name : " "}</div>
                </div>
            ))}
            </div>
        </>
    )
}