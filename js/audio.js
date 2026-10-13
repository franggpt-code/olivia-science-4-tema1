// =============================================================================
// GESTOR DE AUDIO Y SÍNTESIS DE VOZ (Web Audio API + SpeechSynthesis)
// Cero dependencias externas: funciona 100% offline y en cualquier dispositivo
// =============================================================================

class SoundManager {
  constructor() {
    this.soundEnabled = true;
    this.voiceEnabled = false;
    this.audioCtx = null;
    this.synth = window.speechSynthesis || null;
    this.currentUtterance = null;
  }

  // Inicializa el AudioContext con la interacción del usuario
  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    if (!this.voiceEnabled && this.synth) {
      this.synth.cancel();
    }
    return this.voiceEnabled;
  }

  // Reproduce un tono sintetizado limpio con envolvente ADSR suave
  playTone(frequency, type = "sine", duration = 0.15, gainValue = 0.15, startTime = 0) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const t = this.audioCtx.currentTime + startTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(gainValue, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(t);
      osc.stop(t + duration);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  // Sonido de clic suave
  playClick() {
    this.playTone(600, "triangle", 0.05, 0.08);
  }

  // Sonido de respuesta correcta (Arpegio Do-Mi-Sol-Do agudo)
  playCorrect() {
    if (!this.soundEnabled) return;
    this.initContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, "sine", 0.18, 0.14, idx * 0.07);
    });
  }

  // Sonido de fallo suave (educativo, no frustrante)
  playIncorrect() {
    if (!this.soundEnabled) return;
    this.initContext();
    this.playTone(330, "sine", 0.18, 0.12, 0);
    this.playTone(260, "sine", 0.25, 0.12, 0.12);
  }

  // Sonido de combo / racha
  playStreak() {
    if (!this.soundEnabled) return;
    this.initContext();
    [440, 554, 659, 880, 1108].forEach((freq, idx) => {
      this.playTone(freq, "triangle", 0.15, 0.12, idx * 0.06);
    });
  }

  // Fanfarria de final de examen
  playFanfare() {
    if (!this.soundEnabled) return;
    this.initContext();
    const melody = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 523.25, d: 0.15, t: 0.16 },
      { f: 523.25, d: 0.15, t: 0.32 },
      { f: 659.25, d: 0.3, t: 0.48 },
      { f: 783.99, d: 0.2, t: 0.8 },
      { f: 1046.5, d: 0.6, t: 1.05 }
    ];
    melody.forEach(n => {
      this.playTone(n.f, "sine", n.d, 0.18, n.t);
    });
  }

  // Lectura en voz alta para Olivia
  speakText(text) {
    if (!this.voiceEnabled || !this.synth) return;
    try {
      this.synth.cancel(); // Detiene cualquier locución previa
      const cleanText = text.replace(/[*_#•]/g, " ").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "es-ES";
      utterance.rate = 0.95; // Velocidad ligeramente pausada para 4º de primaria
      utterance.pitch = 1.05; // Tono amable

      // Busca una voz en español si está disponible
      const voices = this.synth.getVoices();
      const esVoice = voices.find(v => v.lang.startsWith("es"));
      if (esVoice) utterance.voice = esVoice;

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (e) {
      console.warn("SpeechSynthesis error", e);
    }
  }

  stopVoice() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

const sound = new SoundManager();
