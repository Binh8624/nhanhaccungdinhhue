/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * AUDIO ARCHIVE STUDIO (WAVEFORM & SCHOLARLY SOUND METADATA)
 * Phân hệ 3 - Trung tâm Tư liệu số Chuyên sâu
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Music,
  Users,
  Calendar,
  ShieldCheck,
  Disc,
  Clock
} from 'lucide-react';
import { AudioRecord } from '../../data/digitalArchiveData.ts';

interface AudioArchiveStudioModalProps {
  audioItem: AudioRecord;
  onClose: () => void;
}

export const AudioArchiveStudioModal: React.FC<AudioArchiveStudioModalProps> = ({
  audioItem,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);

  // Giả lập tiến trình playback an toàn không phụ thuộc tệp ngoài
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5 * playbackSpeed;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 text-[#F2E8D5] animate-fadeIn">
      <div className="w-full max-w-3xl bg-[#171513] border border-[#C9A45C]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9A45C]/30 bg-[#171513]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#781F25] border border-[#C9A45C]/50 flex items-center justify-center">
              <Disc className={`w-5 h-5 text-[#C9A45C] ${isPlaying ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#493326]/60 text-[#E5C07B] border border-[#C9A45C]/30">
                  {audioItem.code}
                </span>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                  audioItem.soundType === 'Bản ghi âm gốc'
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    : 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                }`}>
                  {audioItem.soundType}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#FFF4DB] font-display line-clamp-1 mt-0.5">
                {audioItem.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#493326]/40 hover:bg-[#781F25] text-[#F2E8D5]/80 hover:text-white border border-[#C9A45C]/30 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Waveform Visualizer Display */}
          <div className="p-6 rounded-xl bg-[#0D0B0A] border border-[#C9A45C]/30 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#C9A45C]">
              <span className="flex items-center gap-1.5">
                <Music className="w-4 h-4" />
                <span>Thể loại: {audioItem.repertoireCategory}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Thời lượng: {audioItem.durationMinutes}</span>
              </span>
            </div>

            {/* Simulated Dynamic Waveform Bars */}
            <div className="h-28 flex items-center justify-between gap-1 sm:gap-1.5 px-2">
              {audioItem.waveformPattern.map((heightPercent, idx) => {
                const barProgress = (idx / audioItem.waveformPattern.length) * 100;
                const isPassed = barProgress <= playbackProgress;
                return (
                  <div
                    key={idx}
                    onClick={() => setPlaybackProgress(barProgress)}
                    style={{ height: `${heightPercent}%` }}
                    className={`flex-1 rounded-full transition-all duration-150 cursor-pointer ${
                      isPassed
                        ? 'bg-gradient-to-t from-[#C9A45C] to-[#E50914] shadow-sm shadow-[#C9A45C]/50'
                        : 'bg-[#493326]/40 hover:bg-[#C9A45C]/50'
                    }`}
                    title={`Chuyển đến ${Math.round(barProgress)}%`}
                  />
                );
              })}
            </div>

            {/* Playback Controls Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-[#C9A45C]/20">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-[#781F25] hover:bg-[#A32A32] text-[#FFF4DB] border border-[#C9A45C] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-[#781F25]/40"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <button
                  onClick={() => setPlaybackProgress(0)}
                  className="p-2 rounded-lg bg-[#493326]/30 hover:bg-[#493326] text-[#C9A45C] border border-[#C9A45C]/30 cursor-pointer"
                  title="Phát lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-[#493326]/30 hover:bg-[#493326] text-[#C9A45C] border border-[#C9A45C]/30 cursor-pointer"
                  title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Speed selector */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-[#F2E8D5]/60">Tốc độ:</span>
                {[0.75, 1, 1.25].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-1 rounded border transition-colors cursor-pointer ${
                      playbackSpeed === speed
                        ? 'bg-[#C9A45C] text-[#171513] border-[#C9A45C] font-bold'
                        : 'bg-[#493326]/30 text-[#F2E8D5]/80 border-[#C9A45C]/20 hover:bg-[#493326]'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Performers & Instruments Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-3.5 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/30 space-y-2">
              <span className="text-[#C9A45C] font-mono uppercase font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Nghệ Nhân & Nhạc Công Biểu Diễn</span>
              </span>
              <ul className="space-y-1 text-[#FFF4DB]">
                {audioItem.performers.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/30 space-y-2">
              <span className="text-[#C9A45C] font-mono uppercase font-bold flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" />
                <span>Nhạc Khí Xuất Hiện Trong Bản Thu</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {audioItem.instrumentsFeatured.map((inst, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#171513] border border-[#C9A45C]/30 text-[11px] text-[#E5C07B]"
                  >
                    {inst}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Historical Significance & Rights */}
          <div className="p-4 rounded-lg bg-[#171513] border border-[#C9A45C]/30 space-y-2 text-xs font-sans">
            <div className="text-xs font-mono uppercase text-[#C9A45C] font-bold">
              Ý Nghĩa Lịch Sử & Thẩm Định Âm Học
            </div>
            <p className="text-[#F2E8D5]/90 leading-relaxed">
              {audioItem.historicalSignificance}
            </p>
            <div className="pt-2 border-t border-[#C9A45C]/20 flex flex-col sm:flex-row justify-between text-[11px] text-[#F2E8D5]/60 gap-1">
              <span>Địa điểm thu âm: {audioItem.recordingLocation} ({audioItem.recordedYear})</span>
              <span className="text-emerald-400/90">{audioItem.license}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
