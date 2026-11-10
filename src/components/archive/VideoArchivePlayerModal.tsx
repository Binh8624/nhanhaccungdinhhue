/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * VIDEO ARCHIVE PLAYER (RITUAL TIMELINE & PRODUCTION RIGHTS)
 * Phân hệ 4 - Trung tâm Tư liệu số Chuyên sâu
 */

import React, { useState } from 'react';
import {
  X,
  Play,
  Film,
  Calendar,
  MapPin,
  Clock,
  Bookmark,
  ShieldCheck,
  Video
} from 'lucide-react';
import { VideoRecord } from '../../data/digitalArchiveData.ts';

interface VideoArchivePlayerModalProps {
  videoItem: VideoRecord;
  onClose: () => void;
}

export const VideoArchivePlayerModal: React.FC<VideoArchivePlayerModalProps> = ({
  videoItem,
  onClose
}) => {
  const [activeMoment, setActiveMoment] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 text-[#F2E8D5] animate-fadeIn">
      <div className="w-full max-w-4xl bg-[#171513] border border-[#C9A45C]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9A45C]/30 bg-[#171513]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#781F25] border border-[#C9A45C]/50 flex items-center justify-center">
              <Video className="w-4 h-4 text-[#C9A45C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#493326]/60 text-[#E5C07B] border border-[#C9A45C]/30">
                  {videoItem.code}
                </span>
                <span className="text-xs font-mono text-[#C9A45C]">Video Nghi Lễ & Diễn Xướng</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#FFF4DB] font-display line-clamp-1 mt-0.5">
                {videoItem.title}
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

        {/* Video Player Display Area */}
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-[#C9A45C]/40 bg-black shadow-2xl flex items-center justify-center group">
            <img
              src={videoItem.thumbnailUrl}
              alt={videoItem.title}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#781F25]/90 border-2 border-[#C9A45C] flex items-center justify-center shadow-xl shadow-red-950/50 group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-7 h-7 text-[#FFF4DB] ml-1" />
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-black/75 border border-[#C9A45C]/40 text-[#E5C07B]">
                Thời lượng: {videoItem.durationMinutes}
              </span>
            </div>

            {/* Status active marker */}
            {activeMoment && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-[#781F25]/90 border border-[#C9A45C] text-xs font-mono text-[#FFF4DB]">
                Mốc thời gian: {activeMoment}
              </div>
            )}
          </div>

          {/* Key Moments Timeline Bookmarks */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#C9A45C] font-bold flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Các Mốc Điển Lễ Trọng Yếu Trong Video</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {videoItem.keyMoments.map((km, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMoment(`${km.timeCode} – ${km.description}`)}
                  className="p-3 rounded-lg bg-[#493326]/20 hover:bg-[#493326]/40 border border-[#C9A45C]/30 text-left transition-all flex items-start gap-3 cursor-pointer group"
                >
                  <span className="px-2 py-0.5 rounded bg-[#171513] border border-[#C9A45C]/40 text-xs font-mono text-[#C9A45C] shrink-0 font-bold group-hover:border-[#C9A45C]">
                    {km.timeCode}
                  </span>
                  <span className="text-xs text-[#F2E8D5]/90 font-sans leading-relaxed line-clamp-2">
                    {km.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Metadata & Curatorial Rights Box */}
          <div className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 space-y-3 text-xs font-sans">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono text-[#C9A45C] gap-1 pb-2 border-b border-[#C9A45C]/20">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Không gian: {videoItem.location}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Năm ghi hình: {videoItem.recordedYear}</span>
              </span>
            </div>

            <p className="text-[#F2E8D5]/90 leading-relaxed">
              {videoItem.description}
            </p>

            <div className="pt-2 border-t border-[#C9A45C]/20 flex flex-col sm:flex-row justify-between text-[11px] text-[#F2E8D5]/60 gap-1">
              <span>Đơn vị sản xuất: <strong>{videoItem.productionUnit}</strong></span>
              <span className="text-emerald-400/90">{videoItem.rightsCategory}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
