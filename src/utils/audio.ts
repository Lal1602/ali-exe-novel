// Audio synthesizer & streaming BGM engine for ALI: Anomali Pengubah Kepribadian

const BGM_TRACKS: Record<string, string> = {
  ambient: '/assets/audio/lofi-ambient.mp3',
  office: '/assets/audio/lofi-cozy.mp3',
  cozy: '/assets/audio/lofi-cozy.mp3',
  home: '/assets/audio/lofi-romance.mp3',
  romantic: '/assets/audio/lofi-romance.mp3',
  investigation: '/assets/audio/lofi-ambient.mp3',
  celebration: '/assets/audio/lofi-romance.mp3',
  quiet: '/assets/audio/lofi-ambient.mp3',
};

class SoundManager {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private isMuted: boolean = false;
  private currentMood: string = 'ambient';

  // HTMLAudio dual-player for crossfade
  private currentAudio: HTMLAudioElement | null = null;
  private fadeAudio: HTMLAudioElement | null = null;
  private currentTrackKey: string = '';
  private isBgmActive: boolean = false;
  private maxBgmVolume: number = 0.35;

  private sfxBuffers: Record<string, AudioBuffer> = {};
  private sfxLoading: boolean = false;

  public initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);

      this.loadSFXBuffers();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private async loadSFXBuffers() {
    if (this.sfxLoading || !this.ctx || typeof window === 'undefined') return;
    this.sfxLoading = true;

    const sfxList: Record<string, string> = {
      'advance': '/assets/audio/confirmation_001.wav',
      'advance-soft': '/assets/audio/confirmation_002.wav',
      'click': '/assets/audio/click_002.wav',
      'tick1': '/assets/audio/tick_001.wav',
      'tick2': '/assets/audio/tick_002.wav',
      'tick4': '/assets/audio/tick_004.wav',
      'select': '/assets/audio/select_001.wav',
      'switch': '/assets/audio/switch_001.wav',
      'pluck': '/assets/audio/pluck_001.wav',
    };

    for (const [key, url] of Object.entries(sfxList)) {
      const fetchWithRetry = async (attempts = 2): Promise<void> => {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const arrayBuffer = await res.arrayBuffer();
          if (this.ctx) {
            const decoded = await this.ctx.decodeAudioData(arrayBuffer);
            this.sfxBuffers[key] = decoded;
          }
        } catch {
          if (attempts > 0) {
            setTimeout(() => fetchWithRetry(attempts - 1), 1500);
          }
        }
      };
      fetchWithRetry();
    }
  }

  public playBuffer(name: string, playbackRate = 1.0, volume = 0.3): boolean {
    if (this.isMuted) return false;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return false;

    const buffer = this.sfxBuffers[name];
    if (!buffer) return false;

    try {
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.setValueAtTime(playbackRate, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);

      source.connect(gain);
      gain.connect(this.sfxGain);
      source.start(0);
      return true;
    } catch {
      return false;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.currentAudio) {
      this.currentAudio.muted = this.isMuted;
    }
    if (this.fadeAudio) {
      this.fadeAudio.muted = this.isMuted;
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // --- Visual Novel Royalty-Free Sound Effects ---

  /**
   * Typewriter text rendering chatter sound for visual novel dialogue
   * Uses real CC0 tick audio files with subtle pitch-shifting per character
   */
  public playTypewriterBlip(character: 'cegil' | 'ali' | 'inner' | 'system' = 'cegil') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const jitter = (Math.random() - 0.5) * 0.12;
    let played = false;

    if (character === 'cegil') {
      // Cegil: Sweet, cheerful, higher anime VN voice chatter
      played = this.playBuffer('tick1', 1.35 + jitter, 0.28);
    } else if (character === 'ali') {
      // Ali: Calm, deeper mellow masculine VN voice chatter
      played = this.playBuffer('tick1', 0.80 + jitter, 0.32);
    } else if (character === 'inner') {
      // Kata Hati: Gentle intimate whisper click
      played = this.playBuffer('tick2', 1.05 + jitter, 0.22);
    } else {
      // System / Narator: Crisp digital terminal tick
      played = this.playBuffer('tick4', 1.15 + jitter, 0.24);
    }

    if (played) return;

    // Procedural synthesis fallback while buffer is decoding
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      const baseFreq = character === 'cegil' ? 530 : character === 'ali' ? 290 : character === 'inner' ? 440 : 620;
      const freq = baseFreq * (1 + jitter);

      osc.type = character === 'inner' || character === 'system' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(character === 'ali' ? 1100 : 2200, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {}
  }

  /**
   * Sound played when pressing Space / clicking to advance to the NEXT dialogue line
   * Uses real CC0 confirmation_001.wav acoustic dialogue advance chime
   */
  public playDialogueAdvance() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    // Priority: Play real royalty-free confirmation audio file
    const played = this.playBuffer('advance', 1.0, 0.38);
    if (played) return;

    // Procedural fallback
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(260, now);
      osc1.frequency.exponentialRampToValueAtTime(140, now + 0.04);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc1.connect(gain1);
      gain1.connect(this.sfxGain);
      osc1.start(now);
      osc1.stop(now + 0.045);
    } catch {}
  }

  /**
   * Sound played when pressing Space while text is typing to instantly reveal full text
   * Uses real CC0 click_002.wav snappy text-snap sound
   */
  public playTextSkip() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    // Priority: Play real royalty-free click audio file
    const played = this.playBuffer('click', 1.25, 0.35);
    if (played) return;

    // Procedural fallback
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.linearRampToValueAtTime(740, now + 0.035);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.048);
    } catch {}
  }

  public playBlip(freq = 440) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const played = this.playBuffer('select', 1.0, 0.25);
    if (played) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.setValueAtTime(900, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  public playWhoosh() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {}
  }

  public playAffectionChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.35);
      }, idx * 75);
    });
  }

  public playErrorBuzz() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch {}
  }

  public playFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const chords = [
      { notes: [440, 554.37, 659.25], time: 0 },
      { notes: [493.88, 622.25, 739.99], time: 180 },
      { notes: [587.33, 739.99, 880], time: 360 },
      { notes: [659.25, 830.61, 987.77, 1318.51], time: 600 },
    ];

    chords.forEach((chord) => {
      setTimeout(() => {
        chord.notes.forEach((freq) => {
          if (!this.ctx || !this.sfxGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

          osc.connect(gain);
          gain.connect(this.sfxGain);

          osc.start();
          osc.stop(this.ctx.currentTime + 0.6);
        });
      }, chord.time);
    });
  }

  // --- BGM Streaming Engine with Crossfade ---

  public startBGM(mood = 'ambient') {
    this.isBgmActive = true;
    this.setMood(mood);
  }

  public setMood(mood: string) {
    this.currentMood = mood;
    if (!this.isBgmActive || typeof window === 'undefined') return;

    if (this.currentTrackKey === mood && this.currentAudio && !this.currentAudio.paused) return;

    const trackUrl = BGM_TRACKS[mood] || BGM_TRACKS.ambient;
    this.currentTrackKey = mood;

    try {
      const nextAudio = new Audio(trackUrl);
      nextAudio.loop = true;
      nextAudio.volume = 0;
      nextAudio.onerror = () => {
        // If network error occurred, retry loading the track after 2 seconds
        setTimeout(() => {
          if (this.isBgmActive && this.currentTrackKey === mood) {
            const retryAudio = new Audio(trackUrl);
            retryAudio.loop = true;
            retryAudio.volume = 0;
            retryAudio.muted = this.isMuted;
            retryAudio.play().then(() => this.crossfadeTo(retryAudio)).catch(() => {});
          }
        }, 2000);
      };

      const playPromise = nextAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.crossfadeTo(nextAudio);
          })
          .catch(() => {
            // Autoplay policy prevented playback until user interaction
            const resumeOnInteraction = () => {
              if (this.isBgmActive && nextAudio) {
                nextAudio.play().then(() => {
                  this.crossfadeTo(nextAudio);
                }).catch(() => {});
              }
              window.removeEventListener('click', resumeOnInteraction);
              window.removeEventListener('keydown', resumeOnInteraction);
            };
            window.addEventListener('click', resumeOnInteraction, { once: true });
            window.addEventListener('keydown', resumeOnInteraction, { once: true });
          });
      }
    } catch {
      // Ignore
    }
  }

  private crossfadeTo(newAudio: HTMLAudioElement) {
    const oldAudio = this.currentAudio;
    this.fadeAudio = oldAudio;
    this.currentAudio = newAudio;

    const fadeDuration = 800; // ms
    const steps = 16;
    const intervalTime = fadeDuration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      if (this.currentAudio) {
        this.currentAudio.volume = Math.min(this.maxBgmVolume, progress * this.maxBgmVolume);
      }
      if (this.fadeAudio) {
        this.fadeAudio.volume = Math.max(0, (1 - progress) * this.maxBgmVolume);
      }

      if (step >= steps) {
        clearInterval(timer);
        if (this.fadeAudio) {
          this.fadeAudio.pause();
          this.fadeAudio.src = '';
          this.fadeAudio = null;
        }
      }
    }, intervalTime);
  }

  public stopBGM() {
    this.isBgmActive = false;
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (this.fadeAudio) {
      this.fadeAudio.pause();
      this.fadeAudio = null;
    }
    this.currentTrackKey = '';
  }
}

export const sound = new SoundManager();
