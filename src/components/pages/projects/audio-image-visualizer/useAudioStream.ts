import {useRef, useState} from 'react'

export const useAudioStream = () => {
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const captureUserAudio = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream: MediaStream) => {
            setMediaStream(stream);
        })
    }
    const startStream = () => {
        captureUserAudio()
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current?.start()
        }
    }
    const stopStream = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => {
                if (track.readyState === 'live' && track.kind === 'audio') {
                    track.stop()
                }
            })
        }
    }

    return {
        startStream,
        stopStream,
        stream: mediaStream
    }
}