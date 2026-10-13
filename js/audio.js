// =============================================================================
// GESTOR DE AUDIO Y SÍNTESIS DE VOZ (Web Audio API + SpeechSynthesis)
// Totalmente adaptado para iPad (iOS 12.5.8+), Safari y navegadores modernos
// =============================================================================

class SoundManager {
  constructor() {
    this.soundEnabled = true;
    this.voiceEnabled = false;
    this.audioCtx = null;
    this.synth = ('speechSynthesis' in window) ? window.speechSynthesis : null;
    this.currentUtterance = null;
  }

  // Inicializa el AudioContext con la interacción del usuario
  initContext() {
    if (!this.audioCtx) {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        try {
          this.audioCtx = new AudioContextClass();
        } catch (e) {
          console.warn("AudioContext init error", e);
        }
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      try {
        this.audioCtx.resume();
      } catch (e) {
        console.warn("AudioContext resume error", e);
      }
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    if (!this.voiceEnabled && this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    return this.voiceEnabled;
  }

  // Reproduce un tono sintetizado limpio con envolvente ADSR suave
  playTone(frequency, type, duration, gainValue, startTime) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.audioCtx) return;

    type = type || "sine";
    duration = duration || 0.15;
    gainValue = gainValue || 0.15;
    startTime = startTime || 0;

    try {
      var t = this.audioCtx.currentTime + startTime;
      var osc = this.audioCtx.createOscillator();
      var gain = this.audioCtx.createGain();

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
      // Evita interrupciones en navegadores con restricciones de audio
    }
  }

  // Sonido de clic suave
  playClick() {
    this.playTone(600, "triangle", 0.05, 0.08, 0);
  }

  // Sonido de respuesta correcta (Arpegio Do-Mi-Sol-Do agudo)
  playCorrect() {
    if (!this.soundEnabled) return;
    this.initContext();
    var self = this;
    var notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach(function(freq, idx) {
      self.playTone(freq, "sine", 0.18, 0.14, idx * 0.07);
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
    var self = this;
    [440, 554, 659, 880, 1108].forEach(function(freq, idx) {
      self.playTone(freq, "triangle", 0.15, 0.12, idx * 0.06);
    });
  }

  // Fanfarria de final de examen
  playFanfare() {
    if (!this.soundEnabled) return;
    this.initContext();
    var self = this;
    var melody = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 523.25, d: 0.15, t: 0.16 },
      { f: 523.25, d: 0.15, t: 0.32 },
      { f: 659.25, d: 0.3, t: 0.48 },
      { f: 783.99, d: 0.2, t: 0.8 },
      { f: 1046.5, d: 0.6, t: 1.05 }
    ];
    melody.forEach(function(n) {
      self.playTone(n.f, "sine", n.d, 0.18, n.t);
    });
  }

  // Lectura en voz alta para Olivia (con soporte seguro en iOS)
  speakText(text) {
    if (!('speechSynthesis' in window) || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      var cleanText = text.replace(/[*_#•]/g, " ").trim();
      var utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "es-ES";
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      var voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        var esVoice = voices.find(function(v) { return v.lang && v.lang.indexOf("es") === 0; });
        if (esVoice) utterance.voice = esVoice;
      }

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("SpeechSynthesis error", e);
    }
  }

  stopVoice() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
  }
}

var sound = new SoundManager();

// Desbloqueo anticipado de AudioContext en iOS Safari con el primer toque en pantalla
['touchstart', 'touchend', 'click'].forEach(function(evt) {
  document.addEventListener(evt, function() {
    if (sound) sound.initContext();
  }, { passive: true, once: true });
});
