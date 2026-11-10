/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PHÂN HỆ 4: MUSICAL MODE EXPLORER (NGHIÊN CỨU ĐIỆU KHÁCH & ĐIỆU NAM)
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 */

import React, { useState } from 'react';
import { MUSICAL_MODES, MusicalMode } from '../../data/musicTheoryData';
import { courtAudioEngine } from '../../utils/audioEngine';
import { Play, Volume2, Sparkles, BookOpen, Scale, ArrowRight } from 'lucide-react';

export const MusicalModeExplorer: React.FC = () => {
  const [selectedModeId, setSelectedModeId] = useState<string>(MUSICAL_MODES[0].id);
  const [isPlayingScale, setIsPlayingScale] = useState<boolean>(false);

  const currentMode = MUSICAL_MODES.find((m) => m.id === selectedModeId) || MUSICAL_MODES[0];

  const handlePlayModeScale = (mode: MusicalMode) => {
    setIsPlayingScale(true);
    // Chuỗi tần số theo điệu thức (Hò = F4 = 349.23 Hz)
    let notes: number[] = [];
    if (mode.id === 'mode-khach') {
      notes = [349.23, 392.00, 466.16, 523.25, 587.33, 698.46];
    } else if (mode.id === 'mode-nam-xuan') {
      // Xự non ~383 Hz
      notes = [349.23, 383.00, 466.16, 523.25, 587.33];
    } else {
      // Nam Ai: Xự non ~379 Hz, Xang già ~482 Hz, Cống non ~575 Hz
      notes = [349.23, 379.00, 482.00, 523.25, 575.00];
    }

    const playbackNotes = notes.map((f) => ({
      freq: f,
      durationMs: 700,
      instrument: 'string' as const
    }));

    courtAudioEngine.playCustomSequence(
      playbackNotes,
      undefined,
      () => setIsPlayingScale(false)
    );
  };

  return (
    <div className="space-y-6">
      {/* Mode Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {MUSICAL_MODES.map((mode) => {
          const isSelected = selectedModeId === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setSelectedModeId(mode.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#781F25] border-[#E5C07B] shadow-xl ring-2 ring-[#C9A45C]'
                  : 'bg-[#171513] border-[#C9A45C]/30 hover:border-[#C9A45C]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#C9A45C] uppercase tracking-wider">
                  {mode.category}
                </span>
                <span className="text-xs font-serif text-[#E5C07B] italic">
                  {mode.chineseName}
                </span>
              </div>
              <h3 className="text-base font-display font-bold text-[#FFF4DB] group-hover:text-[#E5C07B]">
                {mode.name}
              </h3>
              <p className="text-xs text-[#F2E8D5]/70 line-clamp-2 mt-1">
                {mode.emotionalAffect}
              </p>
            </button>
          );
        })}
      </div>

      {/* Mode Deep Explorer Card */}
      <div className="p-6 rounded-xl bg-[#171513] border border-[#C9A45C]/40 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C9A45C]/20 pb-4">
          <div>
            <div className="text-xs font-mono text-[#C9A45C] uppercase tracking-widest">
              Khảo tả cấu trúc điệu thức
            </div>
            <h2 className="text-2xl font-display font-bold text-[#FFF4DB] flex items-center gap-3">
              <span>{currentMode.name}</span>
              <span className="text-sm font-serif font-normal text-[#E5C07B]">
                ({currentMode.chineseName})
              </span>
            </h2>
          </div>

          <button
            onClick={() => handlePlayModeScale(currentMode)}
            disabled={isPlayingScale}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] hover:brightness-110 active:scale-95 text-[#171513] font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isPlayingScale ? 'Đang tấu thang âm...' : 'Thính âm chuỗi ngũ cung của Điệu'}</span>
          </button>
        </div>

        {/* Scale Formula Display */}
        <div className="p-4 rounded-xl bg-[#493326]/20 border border-[#C9A45C]/30 space-y-2">
          <div className="text-xs font-mono text-[#C9A45C] uppercase tracking-wider">
            Công thức quãng âm & Vi âm (Interval Cents):
          </div>
          <div className="text-sm font-mono text-[#FFF4DB] font-bold">
            {currentMode.scaleFormula}
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {currentMode.degrees.map((deg, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded bg-[#171513] border border-[#C9A45C]/40 text-xs font-bold text-[#E5C07B]"
              >
                {deg}
              </span>
            ))}
          </div>
        </div>

        {/* 2-Column: Performance Rules vs Ritual Space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rules */}
          <div className="space-y-4 text-xs leading-relaxed">
            <h4 className="text-sm font-bold font-display text-[#E5C07B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9A45C]" />
              <span>Quy tắc Rung - Nhấn - Mổ ngón truyền thống:</span>
            </h4>
            <div className="space-y-2 p-4 rounded-lg bg-[#171513] border border-[#C9A45C]/20">
              <div>
                <strong className="text-emerald-400">Các nốt được rung (Vibrato):</strong>
                <p className="text-[#F2E8D5]/80 mt-0.5">{currentMode.ornamentationRules.rung.join(', ')}</p>
              </div>
              <div className="pt-2 border-t border-[#C9A45C]/10">
                <strong className="text-amber-400">Các nốt phải nhấn vi âm:</strong>
                <p className="text-[#F2E8D5]/80 mt-0.5">{currentMode.ornamentationRules.nhan.join('; ')}</p>
              </div>
              <div className="pt-2 border-t border-[#C9A45C]/10">
                <strong className="text-stone-400">Các nốt buông (Không rung):</strong>
                <p className="text-[#F2E8D5]/80 mt-0.5">{currentMode.ornamentationRules.khongRung.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Context & Pieces */}
          <div className="space-y-4 text-xs leading-relaxed">
            <h4 className="text-sm font-bold font-display text-[#E5C07B] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#C9A45C]" />
              <span>Không gian nghi lễ & Khúc thức tiêu biểu:</span>
            </h4>
            <div className="space-y-3 p-4 rounded-lg bg-[#171513] border border-[#C9A45C]/20">
              <div>
                <strong className="text-[#C9A45C]">Ứng dụng nghi thức cung đình:</strong>
                <p className="text-[#F2E8D5]/90 mt-0.5">{currentMode.ritualApplication}</p>
              </div>
              <div className="pt-2 border-t border-[#C9A45C]/10">
                <strong className="text-[#C9A45C]">Các bản nhạc mẫu mực:</strong>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {currentMode.exemplarPieces.map((p, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#493326]/40 text-[#FFF4DB] text-[11px]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scholarly quote box */}
        <div className="p-4 rounded-lg bg-[#781F25]/20 border border-[#C9A45C]/30 text-xs text-[#F2E8D5]/90 italic leading-relaxed">
          <div className="font-semibold text-[#E5C07B] not-italic mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Khảo cứu âm luật học thuật:</span>
          </div>
          {currentMode.scholarlyAnalysis}
        </div>
      </div>
    </div>
  );
};
