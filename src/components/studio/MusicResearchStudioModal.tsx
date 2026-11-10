/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MUSIC RESEARCH STUDIO MODAL & UNIFIED CONTAINER (GIAI ĐOẠN 4)
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 */

import React, { useState } from 'react';
import { PentatonicScaleAnalyzer } from './PentatonicScaleAnalyzer';
import { MelodyTranscriptionStudio } from './MelodyTranscriptionStudio';
import { AudioSpectrumAnalyzer } from './AudioSpectrumAnalyzer';
import { MusicalModeExplorer } from './MusicalModeExplorer';
import { TraditionalMusicScoreLibrary } from './TraditionalMusicScoreLibrary';
import { AiMusicResearchAssistant } from './AiMusicResearchAssistant';
import { X, Sliders, Music, Activity, Compass, BookOpen, Bot, Maximize2 } from 'lucide-react';

export type StudioTab = 'scales' | 'transcription' | 'spectrum' | 'modes' | 'scores' | 'ai';

interface MusicResearchStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: StudioTab;
}

export const MusicResearchStudioModal: React.FC<MusicResearchStudioModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'scales'
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>(initialTab);

  if (!isOpen) return null;

  const tabs: Array<{ id: StudioTab; name: string; icon: React.ReactNode; countLabel?: string }> = [
    { id: 'scales', name: '1. Pentatonic Scale', icon: <Sliders className="w-4 h-4" /> },
    { id: 'transcription', name: '2. Ký Âm Studio', icon: <Music className="w-4 h-4" /> },
    { id: 'spectrum', name: '3. Phổ Âm FFT', icon: <Activity className="w-4 h-4" /> },
    { id: 'modes', name: '4. Khách & Nam', icon: <Compass className="w-4 h-4" /> },
    { id: 'scores', name: '5. Thư Viện Bài Bản', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'ai', name: '6. AI Âm Luật', icon: <Bot className="w-4 h-4" /> }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#171513] border border-[#C9A45C]/50 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#C9A45C]/30 flex items-center justify-between bg-gradient-to-r from-[#781F25]/40 via-[#171513] to-[#493326]/30">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#C9A45C]">
              <span>GIAI ĐOẠN 4 · PHÒNG NGHIÊN CỨU ÂM HỌC</span>
              <span>·</span>
              <span className="text-[#F2E8D5]/70">Thành phố Huế, Việt Nam</span>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-[#FFF4DB]">
              MUSIC RESEARCH STUDIO – PHÒNG NGHIÊN CỨU ÂM LUẬT & KÝ ÂM
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#171513] border border-[#C9A45C]/30 text-[#C9A45C] hover:bg-[#781F25] hover:text-[#FFF4DB] transition-colors cursor-pointer"
            title="Đóng phòng nghiên cứu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-2.5 bg-[#171513]/90 border-b border-[#C9A45C]/20 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#781F25] text-[#FFF4DB] border border-[#E5C07B] shadow'
                    : 'bg-[#493326]/20 text-[#F2E8D5]/70 hover:text-[#FFF4DB] border border-transparent'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Sub-system Workspace View */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'scales' && <PentatonicScaleAnalyzer />}
          {activeTab === 'transcription' && <MelodyTranscriptionStudio />}
          {activeTab === 'spectrum' && <AudioSpectrumAnalyzer />}
          {activeTab === 'modes' && <MusicalModeExplorer />}
          {activeTab === 'scores' && <TraditionalMusicScoreLibrary />}
          {activeTab === 'ai' && <AiMusicResearchAssistant />}
        </div>

        {/* Bottom Status Bar */}
        <div className="p-3 bg-[#171513] border-t border-[#C9A45C]/20 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#F2E8D5]/60 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Web Audio API AudioContext Active</span>
            <span>·</span>
            <span>FFT 2048 Nodes</span>
          </div>
          <div>
            <span>Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
