import { dtmfFreqs, dtmfChars } from "./helpers.ts";

type OptionsType = {
    duration?: number;
    step?: number;
}

export default class DtmfReceiver {
    private options: OptionsType;
    private audioContext?: AudioContext;
    private _timer?: number;
    constructor(options: OptionsType = {}) {
        this.options = options;
    }
    start(stream: MediaStream, cb: (data: unknown) => void) {
        if (this._timer || !cb) return;

        this.audioContext = new AudioContext();

        const src = this.audioContext.createMediaStreamSource(stream);
        const analyser = this.audioContext.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0;
        src.connect(analyser);

        const freqs = new Uint8Array(analyser.frequencyBinCount);
        const binWidthInHz = this.audioContext.sampleRate / freqs.length / 2;

        function findDtmfIndex(data: Uint8Array, dtmfFreqs: number[], binWidthInHz: number) {
            let max = 0;
            let index = -1;
            for (let i = 0; i < dtmfFreqs.length; i++) {
                const bin = Math.round(dtmfFreqs[i] / binWidthInHz);
                if (data[bin] > max) {
                    max = data[bin];
                    index = i;
                }
            }
            return index;
        }

        let last: string;
        let counter = 0;
        let duration = this.options.duration || 100;
        let step = this.options.step || 10;

        this._timer = setInterval(function () {
            analyser.getByteFrequencyData(freqs);
            let max = 0;
            for (let i = 0; i < freqs.length; i++) {
                if (freqs[i] > max) max = freqs[i];
            }
            const x = findDtmfIndex(freqs, dtmfFreqs[0], binWidthInHz);
            const y = findDtmfIndex(freqs, dtmfFreqs[1], binWidthInHz);
            if (x >= 0 && y >= 0) {
                const c = dtmfChars[x][y];
                if (last == c) {
                    counter++;
                    if (counter > step * 0.75) {
                        cb(c);
                        counter = 0;
                    }
                } else {
                    counter = 0;
                }
                last = c;
            }
        }, duration / step);
    }
    stop() {
        clearInterval(this._timer);
        this._timer = undefined;
        if (this.audioContext) {
            if (typeof this.audioContext.close === "function") {
                this.audioContext.close();
            }
            this.audioContext = undefined;
        }
    }
}