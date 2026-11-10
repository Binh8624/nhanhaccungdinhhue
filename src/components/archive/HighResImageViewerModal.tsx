/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * HIGH-RESOLUTION ARTIFACT IMAGE VIEWER (DEEP ZOOM & HOTSPOT ANNOTATIONS)
 * Phân hệ 2 - Trung tâm Tư liệu số Chuyên sâu
 */

import React, { useState } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info,
  Tag,
  Eye,
  EyeOff,
  Layers,
  Sparkles
} from 'lucide-react';
import { HighResArtifactImage, ImageAnnotationHotspot } from '../../data/digitalArchiveData.ts';

interface HighResImageViewerModalProps {
  artifactImage: HighResArtifactImage;
  onClose: () => void;
}

export const HighResImageViewerModal: React.FC<HighResImageViewerModalProps> = ({
  artifactImage,
  onClose
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showHotspots, setShowHotspots] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<ImageAnnotationHotspot | null>(
    artifactImage.hotspots[0] || null
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col text-[#F2E8D5] animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#C9A45C]/30 bg-[#171513]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#781F25] border border-[#C9A45C]/50 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#C9A45C]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#493326]/60 text-[#E5C07B] border border-[#C9A45C]/30">
                {artifactImage.code}
              </span>
              <span className="text-xs text-[#C9A45C] font-mono">IIIF Image API Level 2</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[#FFF4DB] font-display line-clamp-1">
              {artifactImage.title}
            </h2>
          </div>
        </div>

        {/* Right close and layer toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showHotspots
                ? 'bg-[#C9A45C] text-[#171513] border-[#C9A45C]'
                : 'bg-[#493326]/40 text-[#F2E8D5] border-[#C9A45C]/30 hover:bg-[#493326]'
            }`}
            title="Bật/Tắt điểm chú thích cấu trúc"
          >
            {showHotspots ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showHotspots ? 'Ẩn Chú Thích' : 'Hiện Chú Thích'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#493326]/40 hover:bg-[#781F25] text-[#F2E8D5]/80 hover:text-white border border-[#C9A45C]/30 transition-colors cursor-pointer"
            title="Đóng trình xem ảnh"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Deep Zoom Interactive Canvas */}
        <div className="flex-1 relative bg-[#0B0908] flex items-center justify-center overflow-auto p-4 select-none">
          {/* Zoom Toolbar */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#171513]/90 border border-[#C9A45C]/40 rounded-lg p-1.5 shadow-xl backdrop-blur-sm">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.4, 3.5))}
              className="p-1.5 rounded hover:bg-[#493326] text-[#C9A45C] cursor-pointer"
              title="Phóng to chi tiết"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.4, 0.8))}
              className="p-1.5 rounded hover:bg-[#493326] text-[#C9A45C] cursor-pointer"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="px-2 py-1 text-[11px] font-mono rounded hover:bg-[#493326] text-[#C9A45C] cursor-pointer"
              title="Khôi phục góc nhìn"
            >
              100%
            </button>
            <button
              onClick={() => setZoomLevel(2.2)}
              className="px-2 py-1 text-[11px] font-mono rounded hover:bg-[#493326] text-[#C9A45C] cursor-pointer"
              title="Xem chi tiết thớ gỗ"
            >
              220%
            </button>
          </div>

          {/* Deep Zoom Image Container */}
          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transition: 'transform 0.25s ease-out'
            }}
            className="relative max-w-full max-h-[80vh] rounded border border-[#C9A45C]/40 bg-[#171513] shadow-2xl"
          >
            <img
              src={artifactImage.imageUrl}
              alt={artifactImage.title}
              className="max-h-[80vh] w-auto object-contain rounded"
            />

            {/* Interactive Hotspots Overlaid on Image */}
            {showHotspots &&
              artifactImage.hotspots.map((hs, index) => {
                const isSelected = selectedHotspot?.id === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setSelectedHotspot(hs)}
                    style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-mono transition-transform cursor-pointer shadow-lg z-10 ${
                      isSelected
                        ? 'bg-[#E50914] text-white ring-4 ring-[#C9A45C] scale-125 animate-pulse'
                        : 'bg-[#C9A45C] text-[#171513] hover:scale-110 hover:bg-[#E5C07B]'
                    }`}
                    title={hs.title}
                  >
                    {index + 1}
                  </button>
                );
              })}
          </div>

          <div className="absolute bottom-4 left-4 text-[11px] font-mono text-[#F2E8D5]/50 bg-black/60 px-2 py-1 rounded">
            Click vào các số tròn 1, 2, 3 trên hiện vật để xem giám định âm học & hoa văn
          </div>
        </div>

        {/* Right Side: Hotspot Annotation Details & Curatorial Metadata */}
        <div className="w-full lg:w-[420px] bg-[#171513] border-l border-[#C9A45C]/30 flex flex-col p-5 overflow-y-auto space-y-6">
          {/* Selected Hotspot Box */}
          {selectedHotspot ? (
            <div className="p-4 rounded-xl bg-[#781F25]/20 border border-[#C9A45C]/50 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#C9A45C] text-[#171513] font-bold">
                  CHÚ THÍCH CẤU TRÚC #{artifactImage.hotspots.indexOf(selectedHotspot) + 1}
                </span>
                <span className="text-[11px] text-[#C9A45C] font-mono">
                  {selectedHotspot.organologicalCategory}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#FFF4DB] font-display">
                {selectedHotspot.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#F2E8D5]/90 font-sans leading-relaxed">
                {selectedHotspot.description}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/20 text-xs text-[#F2E8D5]/60">
              Chọn một điểm chú thích trên ảnh để xem phân tích bộ phận cấu tạo của hiện vật.
            </div>
          )}

          {/* List of all hotspots */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-[#C9A45C] font-bold flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Danh Mục Các Bộ Phận Giám Định</span>
            </h4>
            <div className="space-y-1.5">
              {artifactImage.hotspots.map((hs, idx) => (
                <button
                  key={hs.id}
                  onClick={() => setSelectedHotspot(hs)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${
                    selectedHotspot?.id === hs.id
                      ? 'bg-[#493326]/60 border-[#C9A45C] text-[#FFF4DB]'
                      : 'bg-[#171513] border-[#C9A45C]/20 text-[#F2E8D5]/70 hover:border-[#C9A45C]/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#C9A45C]/30 text-[#C9A45C] flex items-center justify-center font-mono text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-medium line-clamp-1">{hs.title}</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#C9A45C]/80 shrink-0">
                    {hs.organologicalCategory.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Museum Artifact Metadata */}
          <div className="p-4 rounded-lg bg-[#171513] border border-[#C9A45C]/30 space-y-2.5 text-xs font-sans">
            <h4 className="text-xs font-mono uppercase text-[#C9A45C] font-bold flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Hồ Sơ Cổ Vật Bảo Tàng</span>
            </h4>
            <div className="space-y-1.5 text-xs text-[#F2E8D5]/80">
              <div>
                <span className="text-[#F2E8D5]/50 block">Bộ sưu tập:</span>
                <span>{artifactImage.museumCollection}</span>
              </div>
              <div>
                <span className="text-[#F2E8D5]/50 block">Niên đại:</span>
                <span className="text-[#E5C07B]">{artifactImage.era}</span>
              </div>
              <div>
                <span className="text-[#F2E8D5]/50 block">Kích thước đo đạc thực tế:</span>
                <span>{artifactImage.dimensionsActual}</span>
              </div>
              <div>
                <span className="text-[#F2E8D5]/50 block">Chất liệu chế tác:</span>
                <span>{artifactImage.materials}</span>
              </div>
              <div>
                <span className="text-[#F2E8D5]/50 block">Bản quyền & Giấy phép:</span>
                <span className="text-green-400/90">{artifactImage.license}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
