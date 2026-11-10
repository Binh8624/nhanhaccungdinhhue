/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SÂN KHẤU HÒA TẤU TRỰC QUAN DUYỆT THỊ ĐƯỜNG (CONCERT VISUALIZER STAGE - GĐ5)
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 */

import React, { useState, useEffect } from 'react';
import { courtAudioEngine, EnsembleChannels } from '../../utils/audioEngine';
import { Play, Pause, Volume2, VolumeX, Radio, Sparkles, Activity, ShieldCheck, Music, RefreshCw } from 'lucide-react';

interface InstrumentStagePos {
  key: keyof EnsembleChannels;
  name: string;
  category: 'Đại Nhạc' | 'Tiểu Nhạc';
  side: 'left' | 'center' | 'right';
  xPct: number;
  yPct: number;
  icon: string;
}

export const ConcertVisualizerStage: React.FC = () => {
  const [audioSourceMode, setAudioSourceMode] = useState<'synthetic' | 'archive'>('synthetic');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTrigger, setActiveTrigger] = useState<keyof EnsembleChannels | null>(null);
  const [soloInstrument, setSoloInstrument] = useState<keyof EnsembleChannels | null>(null);
  const [ensembleChannels, setEnsembleChannels] = useState<EnsembleChannels>({
    kenBau: true,
    danTyBa: true,
    danNguyet: true,
    danNhi: true,
    saoTruc: true,
    trongBan: true,
    naoBat: true
  });

  const stageInstruments: InstrumentStagePos[] = [
    { key: 'danNguyet', name: 'Đàn Nguyệt', category: 'Tiểu Nhạc', side: 'left', xPct: 22, yPct: 40, icon: '🪕' },
    { key: 'danTyBa', name: 'Đàn Tỳ Bà', category: 'Tiểu Nhạc', side: 'left', xPct: 15, yPct: 65, icon: '🎸' },
    { key: 'saoTruc', name: 'Sáo Trúc', category: 'Tiểu Nhạc', side: 'left', xPct: 32, yPct: 65, icon: '🪈' },
    { key: 'trongBan', name: 'Trống Bản (Cầm phách)', category: 'Tiểu Nhạc', side: 'center', xPct: 50, yPct: 35, icon: '🥁' },
    { key: 'danNhi', name: 'Đàn Nhị', category: 'Tiểu Nhạc', side: 'center', xPct: 50, yPct: 70, icon: '🎻' },
    { key: 'kenBau', name: 'Kèn Bầu (Lĩnh xướng)', category: 'Đại Nhạc', side: 'right', xPct: 75, yPct: 40, icon: '🎺' },
    { key: 'naoBat', name: 'Não Bạt / Chuông', category: 'Đại Nhạc', side: 'right', xPct: 82, yPct: 65, icon: '🔔' }
  ];

  useEffect(() => {
    courtAudioEngine.setEnsembleTriggerCallback((instKey) => {
      setActiveTrigger(instKey);
      setTimeout(() => setActiveTrigger(null), 300);
    });

    return () => {
      courtAudioEngine.setEnsembleTriggerCallback(null);
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      courtAudioEngine.stop();
      setIsPlaying(false);
    } else {
      courtAudioEngine.setEnsembleChannels(ensembleChannels);
      courtAudioEngine.playTrack('track-visualizer', [349.23, 392.00, 466.16, 523.25, 587.33, 523.25, 466.16, 349.23]);
      setIsPlaying(true);
    }
  };

  const handleToggleMute = (instKey: keyof EnsembleChannels) => {
    const updated = { ...ensembleChannels, [instKey]: !ensembleChannels[instKey] };
    setEnsembleChannels(updated);
    courtAudioEngine.setEnsembleChannels(updated);
  };

  const handleToggleSolo = (instKey: keyof EnsembleChannels) => {
    if (soloInstrument === instKey) {
      const allOn: EnsembleChannels = {
        kenBau: true,
        danTyBa: true,
        danNguyet: true,
        danNhi: true,
        saoTruc: true,
        trongBan: true,
        naoBat: true
      };
      setSoloInstrument(null);
      setEnsembleChannels(allOn);
      courtAudioEngine.setEnsembleChannels(allOn);
    } else {
      const soloOnly: EnsembleChannels = {
        kenBau: instKey === 'kenBau',
        danTyBa: instKey === 'danTyBa',
        danNguyet: instKey === 'danNguyet',
        danNhi: instKey === 'danNhi',
        saoTruc: instKey === 'saoTruc',
        trongBan: instKey === 'trongBan',
        naoBat: instKey === 'naoBat'
      };
      setSoloInstrument(instKey);
      setEnsembleChannels(soloOnly);
      courtAudioEngine.setEnsembleChannels(soloOnly);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Audio Source Mode & Playback Bar */}
      <div className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 flex flex-wrap items-center justify-between gap-4">
        {/* Source Mode Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-[#C9A45C] font-semibold flex items-center gap-1.5">
            <Radio className="w-4 h-4" />
            <span>Nguồn âm thanh hòa tấu:</span>
          </span>

          <div className="inline-flex rounded-lg bg-[#493326]/30 p-1 border border-[#C9A45C]/30 text-xs">
            <button
              onClick={() => setAudioSourceMode('synthetic')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                audioSourceMode === 'synthetic'
                  ? 'bg-[#781F25] text-[#FFF4DB] font-bold shadow'
                  : 'text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
              }`}
            >
              Mô phỏng Đa bè (Web Audio API)
            </button>
            <button
              onClick={() => setAudioSourceMode('archive')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                audioSourceMode === 'archive'
                  ? 'bg-[#781F25] text-[#FFF4DB] font-bold shadow'
                  : 'text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
              }`}
            >
              Bản ghi âm gốc 2018 (Audio Archive GĐ3)
            </button>
          </div>
        </div>

        {/* Master Play Button */}
        <button
          onClick={handleTogglePlay}
          className={`px-5 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
            isPlaying
              ? 'bg-amber-600 text-[#171513] hover:bg-amber-500'
              : 'bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] hover:brightness-110'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isPlaying ? 'Tạm dừng hòa tấu' : 'Khởi tấu Dàn nhạc Cung đình'}</span>
        </button>
      </div>

      {/* Transparency Banner */}
      <div className="p-3.5 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/20 flex items-center justify-between gap-3 text-xs text-[#F2E8D5]/80 font-sans">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {audioSourceMode === 'synthetic' ? (
              <>
                Chế độ hiện tại: <strong>Âm thanh mô phỏng học thuật (Web Audio API đa bè)</strong>. Cho phép bật/tắt (Mute) hoặc độc tấu (Solo) từng khí cụ để phân tích cấu trúc phối khí cung đình.
              </>
            ) : (
              <>
                Chế độ hiện tại: <strong>Bản ghi âm gốc điền dã (Audio Archive GĐ3)</strong> – Hòa tấu Đăng Đàn Cung do Nhà hát Nghệ thuật Truyền thống Cung đình Huế biểu diễn tại Duyệt Thị Đường (2018).
              </>
            )}
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#C9A45C] shrink-0 hidden sm:inline">
          Duyệt Thị Đường · 1826
        </span>
      </div>

      {/* Sân Khấu Hoàng Gia Ảo (Interactive Stage Viewport) */}
      <div className="relative rounded-2xl border-2 border-[#C9A45C]/40 bg-gradient-to-b from-[#171513] via-[#201c18] to-[#171513] p-6 shadow-2xl min-h-[420px] flex flex-col justify-between overflow-hidden">
        {/* Stage Backdrop Architectural Lines */}
        <div className="absolute inset-x-8 top-4 flex justify-between items-center text-xs font-mono text-[#C9A45C]/40 border-b border-[#C9A45C]/20 pb-2 pointer-events-none">
          <span>TIỂU NHẠC (Hữu Dực Sảnh Điện)</span>
          <span className="text-[#E5C07B] font-serif font-bold text-sm tracking-widest">SÂN KHẤU NHÀ HÁT DUYỆT THỊ ĐƯỜNG</span>
          <span>ĐẠI NHẠC (Tả Dực Sân Rồng)</span>
        </div>

        {/* Ambient Stage Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Instrument Positions on Stage */}
        <div className="relative flex-grow my-8 min-h-[300px]">
          {stageInstruments.map((inst) => {
            const isActiveChannel = ensembleChannels[inst.key];
            const isTriggered = activeTrigger === inst.key;
            const isSolo = soloInstrument === inst.key;

            return (
              <div
                key={inst.key}
                style={{ left: `${inst.xPct}%`, top: `${inst.yPct}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
              >
                {/* Visual Glow Circle */}
                <div
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative shadow-xl ${
                    isTriggered
                      ? 'bg-[#781F25] border-[#FFF4DB] scale-125 shadow-amber-500/50 ring-4 ring-[#E5C07B]'
                      : isActiveChannel
                      ? 'bg-[#171513]/90 border-[#C9A45C] hover:border-[#FFF4DB]'
                      : 'bg-[#171513]/40 border-dashed border-[#F2E8D5]/20 opacity-40'
                  }`}
                >
                  <span className="text-2xl select-none">{inst.icon}</span>

                  {isTriggered && (
                    <span className="absolute inset-0 rounded-full border-2 border-[#FFF4DB] animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Name Label */}
                <div className="mt-2 text-center">
                  <div className="text-xs font-display font-bold text-[#FFF4DB] whitespace-nowrap">
                    {inst.name.split(' (')[0]}
                  </div>
                  <div className="text-[10px] text-[#C9A45C] font-mono">
                    {inst.category}
                  </div>
                </div>

                {/* Quick Channel Controls */}
                <div className="mt-1 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleToggleMute(inst.key)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold cursor-pointer transition-colors ${
                      isActiveChannel ? 'bg-[#493326] text-[#FFF4DB]' : 'bg-red-950 text-red-300'
                    }`}
                    title={isActiveChannel ? 'Tắt tiếng' : 'Bật tiếng'}
                  >
                    {isActiveChannel ? 'ON' : 'MUTE'}
                  </button>
                  <button
                    onClick={() => handleToggleSolo(inst.key)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold cursor-pointer transition-colors ${
                      isSolo ? 'bg-[#C9A45C] text-[#171513]' : 'bg-[#171513] text-[#C9A45C] border border-[#C9A45C]/30'
                    }`}
                    title="Độc tấu"
                  >
                    SOLO
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stage Floor Border */}
        <div className="pt-3 border-t border-[#C9A45C]/20 flex flex-wrap items-center justify-between text-[11px] text-[#F2E8D5]/60 font-mono">
          <span>Kỹ thuật mô phỏng: Web Audio API Oscillator & Dynamic Gain Nodes</span>
          <span>Không gian âm học: Cột gỗ lim & Vòm trần hoàng cung Huế</span>
        </div>
      </div>
    </div>
  );
};
