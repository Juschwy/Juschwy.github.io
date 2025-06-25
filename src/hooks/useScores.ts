import {useEffect, useState} from "react";
import type {ScoreType} from "../types/score.type.ts";

export function useScores() {
    const KEY = "scores"
    const [scores, setScores] = useState<ScoreType[]>(() => {
        const localValue = localStorage.getItem(KEY)
        if (localValue) return (JSON.parse(localValue) as ScoreType[]).map(score => ({...score, timestamp: new Date(score.timestamp)}))
        return [];
    })

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(scores))
    }, [scores])

    function clearScores(){
        setScores([])
    }

    return {scores, setScores, clearScores}
}