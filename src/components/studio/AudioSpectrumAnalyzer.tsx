/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PHÂN HỆ 3: AUDIO SPECTRUM ANALYZER (PHÂN TÍCH QUANG PHỔ, SÓNG ÂM & CAO ĐỘ THỰC NGHIỆM)
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 */

import React, { useState, useEffect, useRef } from 'react';
import { AUDIO_SPECTRUM_BENCHMARKS } from '../../data/musicTheoryData';
import { courtAudioEngine } from '../../utils/audioEngine';
import { Play, Square, Activity, Radio, Info, BarChart3, Waves } from 'lucide-react';

export const AudioSpectrumAnalyzer: React.FC = () => {
  const [selectedBenchmark, setSelectedBenchmark] = useState<string>(AUDIO_SPECTRUM_BENCHMARKS[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'frequency' | 'waveform'>('frequency');
  const [livePeakHz, setLivePeakHz] = useState<number>(349.2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const benchmark = AUDIO_SPECTRUM_BENCHMARKS.find((b) => b.id === selectedBenchmark) || AUDIO_SPECTRUM_BENCHMARKS[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = courtAudioEngine.getAnalyser();
    const bufferLength = analyser ? analyser.frequencyBinCount : 1024;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = '#171513';
      ctx.fillRect(0, 0, width, height);

      // Hairline Grid Lines
      ctx.strokeStyle = 'rgba(201, 164, 92, 0.12)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      if (viewMode === 'frequency') {
        if (analyser && isAnalyzing) {
          analyser.getByteFrequencyData(dataArray);
        } else {
          // Simulated baseline spectrum when idle or testing benchmark
          for (let i = 0; i < bufferLength; i++) {
            const harmonic = Math.sin((i / 8) + Date.now() * 0.003) * 20;
            dataArray[i] = isAnalyzing ? Math.max(0, 70 - i * 0.15 + harmonic) : Math.max(0, 30 - i * 0.1);
          }
        }

        const barWidth = (width / 64) - 2;
        let x = 4;
        let maxVal = 0;
        let maxIndex = 0;

        for (let i = 0; i < 64; i++) {
          const barHeight = (dataArray[i * 2] / 255) * (height - 20);
          if (dataArray[i * 2] > maxVal) {
            maxVal = dataArray[i * 2];
            maxIndex = i * 2;
          }

          const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
          gradient.addColorStop(0, '#781F25');
          gradient.addColorStop(0.6, '#C9A45C');
          gradient.addColorStop(1, '#FFF4DB');

          ctx.fillStyle = gradient;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);
          x += barWidth + 2;
        }

        // Ước tính tần số đỉnh
        if (isAnalyzing && analyser) {
          const estimatedHz = Math.round((maxIndex * 24000) / bufferLength);
          if (estimatedHz > 50 && estimatedHz < 4000) {
            setLivePeakHz(estimatedHz);
          }
        }
      } else {
        // Waveform oscillogram view
        if (analyser && isAnalyzing) {
          analyser.getByteTimeDomainData(dataArray);
        } else {
          for (let i = 0; i < bufferLength; i++) {
            dataArray[i] = 128 + (isAnalyzing ? Math.sin((i / 16) + Date.now() * 0.008) * 45 : 0);
          }
        }

        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#E5C07B';
        ctx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
      }
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnalyzing, viewMode]);

  const handleTogglePlayback = () => {
    if (isAnalyzing) {
      courtAudioEngine.stop();
      setIsAnalyzing(false);
    } else {
      setIsAnalyzing(true);
      // Phát âm thanh mẫu thực nghiệm để FFT phân tích
      courtAudioEngine.playTrack('track-ddc', [349.23, 392.0, 466.16, 523.25, 587.33]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Benchmark Selector & Status Bar */}
      <div className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-[#C9A45C] font-semibold flex items-center gap-1.5">
            <Radio className="w-4 h-4" />
            <span>Mẫu đối chiếu âm học:</span>
          </span>
          {AUDIO_SPECTRUM_BENCHMARKS.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setSelectedBenchmark(b.id);
                setLivePeakHz(b.id === 'spec-ddc-2018' ? 349.2 : 261.6);
              }}
              className={`px-3 py-1.5 rounded text-xs transition-all cursor-pointer border ${
                selectedBenchmark === b.id
                  ? 'bg-[#781F25] text-[#FFF4DB] font-bold border-[#E5C07B]'
                  : 'bg-[#493326]/20 text-[#F2E8D5]/70 border-[#C9A45C]/30 hover:text-[#FFF4DB]'
              }`}
            >
              {b.id === 'spec-ddc-2018' ? 'Đại Nhạc: Đăng Đàn Cung (2018)' : 'Tiểu Nhạc: Đàn Nguyệt Nam Ai (1995)'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="inline-flex rounded-lg bg-[#493326]/30 p-1 border border-[#C9A45C]/30 text-xs">
            <button
              onClick={() => setViewMode('frequency')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === 'frequency' ? 'bg-[#C9A45C] text-[#171513] font-bold' : 'text-[#F2E8D5]/70'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Phổ FFT (Hz)</span>
            </button>
            <button
              onClick={() => setViewMode('waveform')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === 'waveform' ? 'bg-[#C9A45C] text-[#171513] font-bold' : 'text-[#F2E8D5]/70'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Sóng âm (Waveform)</span>
            </button>
          </div>

          <button
            onClick={handleTogglePlayback}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
              isAnalyzing
                ? 'bg-amber-600 text-[#171513] hover:bg-amber-500'
                : 'bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] hover:brightness-110'
            }`}
          >
            {isAnalyzing ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isAnalyzing ? 'Dừng đo' : 'Bắt đầu đo phổ âm'}</span>
          </button>
        </div>
      </div>

      {/* Main Spectrum Visualizer Screen */}
      <div className="p-5 rounded-xl bg-[#171513] border border-[#C9A45C]/40 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C9A45C]/20 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-[#C9A45C] uppercase tracking-wider">
                Trình hiển thị Phổ âm thanh thời gian thực (60 FPS FFT Analyser)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-sans bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                {benchmark.sourceType}
              </span>
            </div>
            <h3 className="text-base font-display font-bold text-[#FFF4DB] mt-0.5">
              {benchmark.title}
            </h3>
          </div>

          {/* Real-time Measurement Readout */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="p-2 rounded bg-[#493326]/30 border border-[#C9A45C]/30 text-center">
              <div className="text-[10px] text-[#F2E8D5]/60">Tần số đỉnh ($f_0$)</div>
              <div className="text-sm font-bold text-[#E5C07B]">{livePeakHz.toFixed(1)} Hz</div>
            </div>
            <div className="p-2 rounded bg-[#493326]/30 border border-[#C9A45C]/30 text-center">
              <div className="text-[10px] text-[#F2E8D5]/60">Nghệ nhân / Đơn vị</div>
              <div className="text-xs font-bold text-[#FFF4DB]">{benchmark.performer.split(' (')[0]}</div>
            </div>
          </div>
        </div>

        {/* HTML5 Canvas */}
        <div className="relative rounded-lg overflow-hidden border border-[#C9A45C]/30 bg-black/80">
          <canvas
            ref={canvasRef}
            width={860}
            height={260}
            className="w-full h-[260px] block"
          />

          {/* Axis Scale Markings */}
          <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[9px] font-mono text-[#C9A45C]/80 pointer-events-none">
            <span>50 Hz (Trầm)</span>
            <span>250 Hz</span>
            <span>500 Hz (Cung Hò - Xê)</span>
            <span>1000 Hz</span>
            <span>2000 Hz (Hài âm Kèn Bầu)</span>
            <span>4000 Hz (Thanh thoát)</span>
          </div>
        </div>

        {/* Descriptive Analysis & Harmonics Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
          <div className="md:col-span-7 space-y-2 text-xs">
            <h4 className="font-bold text-[#E5C07B] flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#C9A45C]" />
              <span>Nhận định Âm học & Cấu trúc Hài âm:</span>
            </h4>
            <p className="text-[#F2E8D5]/80 leading-relaxed font-sans">
              {benchmark.spectralDescription}
            </p>
          </div>

          <div className="md:col-span-5 p-3 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/20 space-y-1.5 text-xs font-mono">
            <div className="text-[11px] text-[#C9A45C] font-bold">Các đỉnh hài âm phân tích:</div>
            {benchmark.harmonicPeaks.map((peak) => (
              <div key={peak.harmonic} className="flex justify-between items-center text-[11px]">
                <span className="text-[#F2E8D5]/70">{peak.label}:</span>
                <span className="text-[#E5C07B]">{peak.freq.toFixed(1)} Hz ({peak.amplitudePct}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
