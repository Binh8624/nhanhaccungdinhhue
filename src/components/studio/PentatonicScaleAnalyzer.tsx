/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PHÂN HỆ 1: PENTATONIC SCALE ANALYZER (PHÂN TÍCH THANG ÂM NGŨ CUNG & BIẾN ÂM)
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 */

import React, { useState } from 'react';
import { PENTATONIC_DEGREES, PitchDegree } from '../../data/musicTheoryData';
import { courtAudioEngine } from '../../utils/audioEngine';
import { Volume2, Sliders, Info, Sparkles, BookOpen } from 'lucide-react';

export const PentatonicScaleAnalyzer: React.FC = () => {
  const [baseHoPitch, setBaseHoPitch] = useState<'hoF' | 'hoC' | 'hoD'>('hoF');
  const [selectedDegree, setSelectedDegree] = useState<PitchDegree>(PENTATONIC_DEGREES[0]);
  const [microOffsetCents, setMicroOffsetCents] = useState<number>(0);
  const [instrumentTimbre, setInstrumentTimbre] = useState<'string' | 'wind' | 'bell'>('string');
  const [activeNotePlaying, setActiveNotePlaying] = useState<string | null>(null);

  const getActiveFreq = (deg: PitchDegree) => {
    const nominal = deg.nominalFrequencies[baseHoPitch].hz;
    if (microOffsetCents === 0 || deg.name !== selectedDegree.name) {
      return nominal;
    }
    return courtAudioEngine.freqFromCent(nominal, microOffsetCents);
  };

  const handlePlayDegree = (deg: PitchDegree) => {
    setSelectedDegree(deg);
    const freq = getActiveFreq(deg);
    courtAudioEngine.playInstrumentNote(freq, instrumentTimbre, 1.2);
    setActiveNotePlaying(deg.name);
    setTimeout(() => setActiveNotePlaying(null), 600);
  };

  const currentFreq = getActiveFreq(selectedDegree);
  const baseFreq = PENTATONIC_DEGREES[0].nominalFrequencies[baseHoPitch].hz;
  const currentCents = selectedDegree.nominalFrequencies[baseHoPitch].cents + microOffsetCents;

  return (
    <div className="space-y-6">
      {/* Top Controls: Base Hò Pitch & Instrument Timbre */}
      <div className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="text-[#C9A45C] font-semibold flex items-center gap-1.5">
            <Sliders className="w-4 h-4" />
            <span>Quy ước Cao độ Nốt Hò:</span>
          </span>
          <div className="inline-flex rounded-lg bg-[#493326]/30 p-1 border border-[#C9A45C]/30">
            <button
              onClick={() => { setBaseHoPitch('hoF'); setMicroOffsetCents(0); }}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                baseHoPitch === 'hoF' ? 'bg-[#781F25] text-[#FFF4DB] shadow' : 'text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
              }`}
            >
              Hò = Fa (F4 ~349Hz) · Kèn Bầu Huế
            </button>
            <button
              onClick={() => { setBaseHoPitch('hoC'); setMicroOffsetCents(0); }}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                baseHoPitch === 'hoC' ? 'bg-[#781F25] text-[#FFF4DB] shadow' : 'text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
              }`}
            >
              Hò = Đô (C4 ~261Hz) · Đàn Nguyệt
            </button>
            <button
              onClick={() => { setBaseHoPitch('hoD'); setMicroOffsetCents(0); }}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                baseHoPitch === 'hoD' ? 'bg-[#781F25] text-[#FFF4DB] shadow' : 'text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
              }`}
            >
              Hò = Rê (D4 ~293Hz) · Đàn Nhị
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#F2E8D5]/70">Âm sắc thử nghiệm:</span>
          <div className="inline-flex rounded-lg bg-[#493326]/30 p-1 border border-[#C9A45C]/30">
            <button
              onClick={() => setInstrumentTimbre('string')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                instrumentTimbre === 'string' ? 'bg-[#C9A45C] text-[#171513] font-bold' : 'text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
              }`}
            >
              Dây gảy (Đàn Tranh / Nguyệt)
            </button>
            <button
              onClick={() => setInstrumentTimbre('wind')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                instrumentTimbre === 'wind' ? 'bg-[#C9A45C] text-[#171513] font-bold' : 'text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
              }`}
            >
              Ống hơi (Kèn Bầu / Sáo)
            </button>
            <button
              onClick={() => setInstrumentTimbre('bell')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                instrumentTimbre === 'bell' ? 'bg-[#C9A45C] text-[#171513] font-bold' : 'text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
              }`}
            >
              Chuông / Khánh
            </button>
          </div>
        </div>
      </div>

      {/* 7 Degree Keyboard (Phím tương tác ngũ cung) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#F2E8D5]/80">
          <span>Hệ thống 7 bậc âm chữ nhạc (Click vào phím để phát âm và phân tích phổ âm học):</span>
          <span className="font-mono text-[#C9A45C]">Thang âm tự nhiên Cố đô</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {PENTATONIC_DEGREES.map((deg) => {
            const isSelected = selectedDegree.name === deg.name;
            const isPlaying = activeNotePlaying === deg.name;
            const freq = getActiveFreq(deg);

            return (
              <button
                key={deg.name}
                onClick={() => handlePlayDegree(deg)}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#781F25] border-[#E5C07B] shadow-xl ring-2 ring-[#C9A45C]'
                    : 'bg-[#171513] border-[#C9A45C]/30 hover:border-[#C9A45C]'
                } ${isPlaying ? 'scale-105 brightness-125' : ''}`}
              >
                <div className="text-[10px] font-mono text-[#C9A45C] uppercase tracking-wider mb-1">
                  {deg.nominalFrequencies[baseHoPitch].note}
                </div>
                <div className="text-3xl font-serif font-bold text-[#FFF4DB] mb-1">
                  {deg.hanChar}
                </div>
                <div className="text-sm font-display font-bold text-[#E5C07B]">
                  {deg.name}
                </div>
                <div className="mt-2 pt-2 border-t border-[#C9A45C]/20 text-[11px] font-mono text-[#F2E8D5]/70">
                  {freq.toFixed(1)} Hz
                </div>
                <div className="text-[10px] text-[#C9A45C]">
                  {deg.nominalFrequencies[baseHoPitch].cents} cents
                </div>
                {isPlaying && (
                  <div className="absolute inset-0 bg-[#E5C07B]/10 animate-pulse pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep Organological & Microtonal Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Detail Card */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-[#171513] border border-[#C9A45C]/40 space-y-4">
          <div className="flex items-center justify-between border-b border-[#C9A45C]/20 pb-3">
            <div>
              <div className="text-xs font-mono text-[#C9A45C] uppercase tracking-widest">
                Phân tích hiện tượng âm học
              </div>
              <h3 className="text-xl font-display font-bold text-[#FFF4DB] flex items-center gap-2">
                <span>Chữ nhạc: {selectedDegree.name} ({selectedDegree.hanChar})</span>
                <span className="text-xs font-normal font-sans text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded">
                  {selectedDegree.nominalFrequencies[baseHoPitch].note}
                </span>
              </h3>
            </div>
            <button
              onClick={() => handlePlayDegree(selectedDegree)}
              className="p-3 rounded-full bg-[#781F25] text-[#E5C07B] hover:bg-[#A32A32] transition-colors cursor-pointer shadow-lg"
              title="Phát lại nốt này"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-[#F2E8D5]/90">
            <div>
              <strong className="text-[#E5C07B]">Vai trò trong thang âm:</strong>
              <p className="mt-0.5">{selectedDegree.role}</p>
            </div>
            <div>
              <strong className="text-[#E5C07B]">Kỹ thuật bấm / nhấn ngón truyền thống:</strong>
              <p className="mt-0.5 text-stone-300">{selectedDegree.technique}</p>
            </div>
            <div>
              <strong className="text-[#E5C07B]">Đặc điểm âm học & Vi âm:</strong>
              <p className="mt-0.5 text-stone-300">{selectedDegree.acousticNote}</p>
            </div>
            <div>
              <strong className="text-[#E5C07B]">Kỹ thuật tô điểm (Ornamentation):</strong>
              <p className="mt-0.5 text-[#C9A45C] italic">{selectedDegree.ornamentation}</p>
            </div>
          </div>
        </div>

        {/* Right: Microtonal Slider & Cents Comparator */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-[#171513] border border-[#C9A45C]/40 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-[#FFF4DB] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C9A45C]" />
                <span>Hiệu chỉnh Vi âm (Microtonal Detune):</span>
              </span>
              <span className="font-mono text-[#E5C07B] font-bold">
                {microOffsetCents > 0 ? `+${microOffsetCents}` : microOffsetCents} cents
              </span>
            </div>

            <p className="text-[11px] text-[#F2E8D5]/70 mb-3">
              Mô phỏng ngón nhấn chùng (Xự non) hoặc nhấn căng (Xang già) của nghệ nhân Huế:
            </p>

            <input
              type="range"
              min="-50"
              max="60"
              step="5"
              value={microOffsetCents}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setMicroOffsetCents(val);
                const nominal = selectedDegree.nominalFrequencies[baseHoPitch].hz;
                const newFreq = courtAudioEngine.freqFromCent(nominal, val);
                courtAudioEngine.playInstrumentNote(newFreq, instrumentTimbre, 0.8);
              }}
              className="w-full accent-[#C9A45C] cursor-pointer"
            />

            <div className="flex justify-between text-[10px] font-mono text-[#F2E8D5]/50 mt-1">
              <span>-50 cents (Chùng sâu / Non)</span>
              <span>0 (Chuẩn)</span>
              <span>+60 cents (Căng già)</span>
            </div>
          </div>

          {/* Cents Measurement Box */}
          <div className="p-4 rounded-lg bg-[#493326]/30 border border-[#C9A45C]/30 space-y-2 text-xs font-mono">
            <div className="text-[11px] text-[#C9A45C] uppercase tracking-wider font-semibold">
              Bảng quy đổi tương quan học thuật
            </div>
            <div className="flex justify-between">
              <span className="text-[#F2E8D5]/70">Tần số thực tế ($f$):</span>
              <span className="text-[#FFF4DB] font-bold">{currentFreq.toFixed(2)} Hz</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F2E8D5]/70">Khoảng cách tới Hò:</span>
              <span className="text-[#E5C07B] font-bold">{currentCents} cents</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F2E8D5]/70">Tỷ lệ tương đối ($f / f_0$):</span>
              <span className="text-emerald-400 font-bold">{(currentFreq / baseFreq).toFixed(4)}</span>
            </div>
          </div>

          <div className="text-[11px] text-[#F2E8D5]/60 italic flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
            <span>Âm thanh tổng hợp mô phỏng Web Audio API theo công trình nghiên cứu của GS.TS Trần Văn Khê.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
