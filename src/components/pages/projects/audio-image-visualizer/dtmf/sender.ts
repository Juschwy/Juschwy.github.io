import {dtmfChars, dtmfFreqs} from "./helpers";

type SenderOptions = {
    duration?: number;
    pause?: number;
}

type FrequencyButton = {
    gain1: GainNode,
    osc1: OscillatorNode,
    osc2: OscillatorNode
}

export default class Sender {
    private options: SenderOptions;
    private audioContext?: AudioContext;
    private readonly grid: FrequencyButton[][];

    constructor(options: SenderOptions = {}) {
        const audioContext = new AudioContext();
        const grid: FrequencyButton[][] = [];
        for (let i = 0; i < dtmfFreqs[0].length; i++) {
            const row: FrequencyButton[] = [];
            const freq1 = dtmfFreqs[0][i];
            for (let j = 0; j < dtmfFreqs[1].length; j++) {
                const freq2 = dtmfFreqs[1][j];
                const button: FrequencyButton = {
                    gain1: new GainNode(audioContext, {gain: 0.0}),
                    osc1: audioContext.createOscillator(),
                    osc2: audioContext.createOscillator()
                };
                button.gain1.connect(audioContext.destination);

                button.osc1.type = "sine";
                button.osc1.frequency.value = freq1;
                button.osc1.connect(button.gain1);

                button.osc2.type = "sine";
                button.osc2.frequency.value = freq2;
                button.osc2.connect(button.gain1);

                button.osc1.start(0);
                button.osc2.start(0);

                row.push(button);
            }
            grid.push(row);
        }
        this.options = options;
        this.audioContext = audioContext;
        this.grid = grid;
    }

    play(str: string, cb: () => void) {
        if (!cb) cb = () => {}
        if (!str) return cb();
        const seq = str.toUpperCase().split("");
        const grid = this.grid;
        const duration = this.options.duration || 100;
        const pause = this.options.pause || 40;
        const doPlay = function () {
            const char = seq.shift();
            if (!char) return cb();
            const row = dtmfChars.findIndex(row => row.includes(char));
            const col = dtmfChars[row].indexOf(char)
            const button = grid[row][col];
            if (button) {
                button.gain1.gain.value = 1.0;
                setTimeout(function () {
                    button.gain1.gain.value = 0.0;
                    setTimeout(doPlay, pause);
                }, duration);
            } else {
                return cb();
            }
        };
        doPlay();
    }

    destroy() {
        if (this.audioContext) {
            if (typeof this.audioContext.close === "function") {
                this.audioContext.close();
            }
            this.audioContext = undefined;
        }
    }
}