/**
 * Web Audio API synthesizer for Vietnamese Traditional Hue Royal Court Music
 * Generates organic pentatonic sound synthesis without external audio files.
 */

export interface EnsembleChannels {
  kenBau: boolean;
  danTyBa: boolean;
  danNguyet: boolean;
  danNhi: boolean;
  saoTruc: boolean;
  trongBan: boolean;
  naoBat: boolean;
}

class CourtAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string | null = null;
  private volume: number = 0.7;
  private masterGain: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private playbackInterval: any = null;
  private onTrackEndCallback: (() => void) | null = null;
  private onTimeUpdateCallback: ((currentSec: number, totalSec: number) => void) | null = null;
  private onInstrumentTriggerCallback: ((instKey: keyof EnsembleChannels) => void) | null = null;
  private currentPlayStep: number = 0;
  private ensembleChannels: EnsembleChannels = {
    kenBau: true,
    danTyBa: true,
    danNguyet: true,
    danNhi: true,
    saoTruc: true,
    trongBan: true,
    naoBat: true
  };

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      // Khởi tạo AnalyserNode (FFT Size 2048) cho phòng thí nghiệm phổ âm
      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 2048;
      this.analyserNode.smoothingTimeConstant = 0.85;

      // Tuyến âm: MasterGain -> Analyser -> Destination
      this.masterGain.connect(this.analyserNode);
      this.analyserNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    this.initContext();
    return this.analyserNode;
  }

  public getByteFrequencyData(dataArray: any): void {
    if (this.analyserNode) {
      this.analyserNode.getByteFrequencyData(dataArray);
    }
  }

  public getByteTimeDomainData(dataArray: any): void {
    if (this.analyserNode) {
      this.analyserNode.getByteTimeDomainData(dataArray);
    }
  }

  public calculateCentOffset(freq: number, refFreq: number): number {
    if (refFreq <= 0 || freq <= 0) return 0;
    return Math.round(1200 * Math.log2(freq / refFreq));
  }

  public freqFromCent(baseFreq: number, cents: number): number {
    return baseFreq * Math.pow(2, cents / 1200);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setCallbacks(
    onTimeUpdate?: (currentSec: number, totalSec: number) => void,
    onTrackEnd?: () => void
  ) {
    if (onTimeUpdate) this.onTimeUpdateCallback = onTimeUpdate;
    if (onTrackEnd) this.onTrackEndCallback = onTrackEnd;
  }

  public setEnsembleChannels(channels: EnsembleChannels) {
    this.ensembleChannels = { ...channels };
  }

  public getEnsembleChannels(): EnsembleChannels {
    return { ...this.ensembleChannels };
  }

  public setEnsembleTriggerCallback(cb: ((instKey: keyof EnsembleChannels) => void) | null) {
    this.onInstrumentTriggerCallback = cb;
  }

  // Play a single note simulating traditional instrument pluck/wind/gong
  public playInstrumentNote(
    freq: number,
    instrumentType: 'string' | 'wind' | 'drum' | 'bell' = 'string',
    duration: number = 1.2
  ) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    if (instrumentType === 'string') {
      // Plucked string (Dan Nguyet / Dan Tranh): triangle wave + quick attack + exponential decay
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      // subtle micro-vibrato
      osc.frequency.linearRampToValueAtTime(freq * 1.01, now + 0.15);
      osc.frequency.linearRampToValueAtTime(freq, now + 0.3);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.6, now + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    } else if (instrumentType === 'wind') {
      // Woodwind / Ken Bau / Sao: sawtooth with lowpass filter for bamboo warmth
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 2.5, now);
      osc.connect(filter);
      filter.connect(noteGain);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.4, now + 0.08);
      noteGain.gain.linearRampToValueAtTime(0.3, now + duration * 0.7);
      noteGain.gain.linearRampToValueAtTime(0.001, now + duration);

      osc.start(now);
      osc.stop(now + duration);
      return;
    } else if (instrumentType === 'bell') {
      // Tam Am La / Bell: rich sine mix with slow decay
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.5, now + 0.01);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.8);
    } else {
      // Drum / Trong Ban: low pitch drop
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

      noteGain.gain.setValueAtTime(0.8, now);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    }

    osc.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration * (instrumentType === 'bell' ? 2 : 1));
  }

  // Play a sequence of musical notes representing a traditional court melody
  public playTrack(trackId: string, notesSequence: number[]) {
    this.stop();
    this.initContext();
    this.isPlaying = true;
    this.currentTrackId = trackId;
    this.currentPlayStep = 0;

    const stepIntervalMs = 450;
    const totalSteps = notesSequence.length * 4; // loop 4 cycles for a rich phrase

    this.playbackInterval = setInterval(() => {
      if (!this.isPlaying) return;

      const noteIdx = this.currentPlayStep % notesSequence.length;
      const baseFreq = notesSequence[noteIdx];
      const subStep = this.currentPlayStep % 4;

      // 1. Kèn Bầu (Lĩnh xướng Đại nhạc - phát âm ở các nốt chủ chốt hoặc đầu nhịp)
      if (this.ensembleChannels.kenBau && (subStep === 0 || subStep === 2)) {
        this.playInstrumentNote(baseFreq, 'wind', 0.65);
        if (this.onInstrumentTriggerCallback) this.onInstrumentTriggerCallback('kenBau');
      }

      // 2. Đàn Nguyệt (Giai điệu chính Tiểu nhạc)
      if (this.ensembleChannels.danNguyet) {
        this.playInstrumentNote(baseFreq, 'string', 0.7);
        if (this.onInstrumentTriggerCallback) this.onInstrumentTriggerCallback('danNguyet');
      }

      // 3. Đàn Tỳ Bà (Bè hoa mỹ rải âm)
      if (this.ensembleChannels.danTyBa && subStep % 2 === 1) {
        this.playInstrumentNote(baseFreq * 1.25, 'string', 0.5);
        if (this.onInstrumentTriggerCallback) this.onInstrumentTriggerCallback('danTyBa');
      }

      // 4. Đàn Nhị (Bè kéo legato ngân dài)
      if (this.ensembleChannels.danNhi && (subStep === 0 || subStep === 3)) {
        this.playInstrumentNote(baseFreq * 0.98, 'string', 0.85);
        if (this.onInstrumentTriggerCallback) this.onInstrumentTriggerCallback('danNhi');
      }

      // 5. Sáo Trúc (Bè cao bay bổng)
      if (this.ensembleChannels.saoTruc && subStep === 1) {
        const fluteFreq = baseFreq * 1.5 > 850 ? baseFreq : baseFreq * 1.5;
        this.playInstrumentNote(fluteFreq, 'wind', 0.55);
        if (this.onInstrumentTriggerCallback) this.onInstrumentTriggerCallback('saoTruc');
      }

      // 6. Trống Bản (Cầm phách nhịp chính ở đầu nhịp 0 và nhịp 2)
      if (this.ensembleChannels.trongBan && (subStep === 0 || subStep === 2)) {
        this.playInstrumentNote(130, 'drum', 0.2);
        if (this.onInstrumentTriggerCallback) this.onInstrumentTriggerCallback('trongBan');
      }

      // 7. Não Bạt / Chuông (Đánh điểm xuyết mỗi 8 bước nhịp)
      if (this.ensembleChannels.naoBat && this.currentPlayStep % 8 === 0) {
        this.playInstrumentNote(baseFreq * 2.2, 'bell', 1.4);
        if (this.onInstrumentTriggerCallback) this.onInstrumentTriggerCallback('naoBat');
      }

      this.currentPlayStep++;

      const currentSec = Math.round((this.currentPlayStep * stepIntervalMs) / 1000);
      const totalSec = Math.round((totalSteps * stepIntervalMs) / 1000);

      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(currentSec, totalSec);
      }

      if (this.currentPlayStep >= totalSteps) {
        this.stop();
        if (this.onTrackEndCallback) {
          this.onTrackEndCallback();
        }
      }
    }, stepIntervalMs);
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrackId = null;
    this.currentPlayStep = 0;
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = null;
    }
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // ignored
      }
    });
    this.activeOscillators = [];
  }

  // Phát chuỗi nốt ký âm tự do (Melody Transcription Player)
  public playCustomSequence(
    notes: Array<{ freq: number; durationMs: number; instrument?: 'string' | 'wind' | 'drum' | 'bell' }>,
    onStep?: (index: number) => void,
    onComplete?: () => void
  ) {
    this.stop();
    this.initContext();
    this.isPlaying = true;
    let currentIndex = 0;

    const playNext = () => {
      if (!this.isPlaying || currentIndex >= notes.length) {
        this.stop();
        if (onComplete) onComplete();
        return;
      }

      const note = notes[currentIndex];
      if (onStep) onStep(currentIndex);

      if (note.freq > 20) {
        this.playInstrumentNote(note.freq, note.instrument || 'string', (note.durationMs / 1000) * 0.95);
      }

      currentIndex++;
      this.playbackInterval = setTimeout(playNext, note.durationMs);
    };

    playNext();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrackId(): string | null {
    return this.currentTrackId;
  }
}

export const courtAudioEngine = new CourtAudioEngine();
