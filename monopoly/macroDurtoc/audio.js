/**
 * SINTETIZADOR DE ÁUDIO WEB // SONS TÁTICOS SCI-FI RETRO
 */

class TacticalAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    beep(freq = 800, duration = 0.08, type = 'sine', gainVal = 0.06) {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) { }
    }

    playClick() {
        this.beep(1200, 0.04, 'square', 0.03);
    }

    playAdvanceTurn() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        [440, 554, 659, 880].forEach((f, i) => {
            setTimeout(() => this.beep(f, 0.12, 'sawtooth', 0.05), i * 70);
        });
    }

    playSuccess() {
        this.beep(523.25, 0.08, 'sine', 0.06);
        setTimeout(() => this.beep(783.99, 0.12, 'sine', 0.06), 80);
    }

    playWarning() {
        this.beep(220, 0.15, 'sawtooth', 0.08);
        setTimeout(() => this.beep(180, 0.2, 'sawtooth', 0.08), 120);
    }
}

const sfx = new TacticalAudioEngine();
