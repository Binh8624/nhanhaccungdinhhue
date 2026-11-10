/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIGITAL MANUSCRIPT VIEWER (IIIF PRESENTATION 3.0)
 * Phân hệ 1 - Trung tâm Tư liệu số Chuyên sâu
 */

import React, { useState } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  BookOpen,
  Info,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { DigitalManuscript, ManuscriptPage } from '../../data/digitalArchiveData.ts';

interface ManuscriptViewerModalProps {
  manuscript: DigitalManuscript;
  onClose: () => void;
  onOpenTranscription?: (manuscript: DigitalManuscript, pageNumber: number) => void;
}

export const ManuscriptViewerModal: React.FC<ManuscriptViewerModalProps> = ({
  manuscript,
  onClose,
  onOpenTranscription
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState<'transcription' | 'metadata' | 'iiif'>('transcription');

  const currentPage: ManuscriptPage = manuscript.pages[currentPageIndex] || manuscript.pages[0];

  const handleNextPage = () => {
    if (currentPageIndex < manuscript.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      setZoomLevel(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      setZoomLevel(1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col text-[#F2E8D5] animate-fadeIn">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#C9A45C]/30 bg-[#171513]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#781F25] border border-[#C9A45C]/50 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-[#C9A45C]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#493326]/60 text-[#E5C07B] border border-[#C9A45C]/30">
                {manuscript.code}
              </span>
              <span className="text-xs text-[#C9A45C] font-mono">IIIF Presentation API 3.0</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[#FFF4DB] font-display line-clamp-1">
              {manuscript.title}
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onOpenTranscription && (
            <button
              onClick={() => onOpenTranscription(manuscript, currentPage.pageNumber)}
              className="px-3 py-1.5 rounded bg-[#781F25] hover:bg-[#A32A32] text-xs font-medium text-[#FFF4DB] border border-[#C9A45C]/40 transition-colors flex items-center gap-1.5 cursor-pointer shadow"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Không gian Phiên âm</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#493326]/40 hover:bg-[#781F25] text-[#F2E8D5]/80 hover:text-white border border-[#C9A45C]/30 transition-colors cursor-pointer"
            title="Đóng trình xem"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Interactive Deep Viewer Canvas */}
        <div className="flex-1 relative bg-[#0D0B0A] flex flex-col justify-between overflow-hidden">
          {/* Zoom & Canvas Toolbar */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#171513]/90 border border-[#C9A45C]/40 rounded-lg p-1.5 shadow-xl backdrop-blur-sm">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 3))}
              className="p-1.5 rounded hover:bg-[#493326] text-[#C9A45C] cursor-pointer"
              title="Phóng to"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.3, 0.7))}
              className="p-1.5 rounded hover:bg-[#493326] text-[#C9A45C] cursor-pointer"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-1.5 rounded hover:bg-[#493326] text-[#C9A45C] cursor-pointer"
              title="Xoay 90°"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setRotation(0);
              }}
              className="px-2 py-1 text-[11px] font-mono rounded hover:bg-[#493326] text-[#C9A45C] cursor-pointer"
              title="Đặt lại mức thu phóng"
            >
              100%
            </button>
          </div>

          {/* Page Indicator Tag */}
          <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded bg-[#171513]/90 border border-[#C9A45C]/40 text-xs font-mono text-[#E5C07B] shadow-xl">
            {currentPage.label} · Trang {currentPageIndex + 1} / {manuscript.pages.length}
          </div>

          {/* Interactive Canvas Area */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-6 select-none cursor-grab active:cursor-grabbing">
            <div
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transition: 'transform 0.2s ease-out'
              }}
              className="relative max-w-full max-h-[75vh] shadow-2xl border border-[#C9A45C]/40 rounded bg-[#171513]"
            >
              <img
                src={currentPage.imageUrl}
                alt={currentPage.label}
                className="max-h-[75vh] w-auto object-contain rounded"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-white/70">
                IIIF Tiled Canvas: {currentPage.width} x {currentPage.height}px
              </div>
            </div>
          </div>

          {/* Bottom Thumbnails Navigation */}
          <div className="h-20 bg-[#171513] border-t border-[#C9A45C]/30 flex items-center justify-between px-4 z-20">
            <button
              disabled={currentPageIndex === 0}
              onClick={handlePrevPage}
              className="p-2 rounded-lg border border-[#C9A45C]/30 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#493326] text-[#C9A45C] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Thumbnail strip */}
            <div className="flex items-center gap-3 overflow-x-auto py-1 max-w-[70vw]">
              {manuscript.pages.map((p, idx) => (
                <button
                  key={p.pageNumber}
                  onClick={() => {
                    setCurrentPageIndex(idx);
                    setZoomLevel(1);
                  }}
                  className={`relative shrink-0 w-12 h-14 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                    currentPageIndex === idx
                      ? 'border-[#C9A45C] scale-105 shadow-md shadow-[#C9A45C]/30'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={p.thumbnailUrl} alt={p.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] font-mono text-center text-[#E5C07B]">
                    {p.label}
                  </span>
                </button>
              ))}
            </div>

            <button
              disabled={currentPageIndex === manuscript.pages.length - 1}
              onClick={handleNextPage}
              className="p-2 rounded-lg border border-[#C9A45C]/30 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#493326] text-[#C9A45C] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side: Scholarly Transcription & Commentary Panel */}
        <div className="w-full lg:w-[440px] bg-[#171513] border-l border-[#C9A45C]/30 flex flex-col h-auto lg:h-full">
          {/* Tabs header */}
          <div className="flex items-center border-b border-[#C9A45C]/30 text-xs font-medium">
            <button
              onClick={() => setActiveTab('transcription')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                activeTab === 'transcription'
                  ? 'border-[#C9A45C] text-[#FFF4DB] font-bold bg-[#493326]/20'
                  : 'border-transparent text-[#F2E8D5]/60 hover:text-[#F2E8D5]'
              }`}
            >
              Phiên Âm & Dịch Nghĩa
            </button>
            <button
              onClick={() => setActiveTab('metadata')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                activeTab === 'metadata'
                  ? 'border-[#C9A45C] text-[#FFF4DB] font-bold bg-[#493326]/20'
                  : 'border-transparent text-[#F2E8D5]/60 hover:text-[#F2E8D5]'
              }`}
            >
              Hồ Sơ Bản Thảo
            </button>
            <button
              onClick={() => setActiveTab('iiif')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                activeTab === 'iiif'
                  ? 'border-[#C9A45C] text-[#FFF4DB] font-bold bg-[#493326]/20'
                  : 'border-transparent text-[#F2E8D5]/60 hover:text-[#F2E8D5]'
              }`}
            >
              IIIF Manifest
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
            {activeTab === 'transcription' && (
              <div className="space-y-5 animate-fadeIn">
                {/* Nguyên văn chữ Hán */}
                <div className="space-y-1.5">
                  <div className="text-xs font-mono uppercase text-[#C9A45C] flex items-center justify-between">
                    <span>1. Nguyên Văn Chữ Hán ({currentPage.label})</span>
                    <span className="text-[10px] text-[#F2E8D5]/50">Trực quan hóa</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#0D0B0A] border border-[#C9A45C]/30 text-base leading-relaxed text-[#FFF4DB] font-serif tracking-wide select-all">
                    {currentPage.hanNomText}
                  </div>
                </div>

                {/* Phiên âm Hán Việt */}
                <div className="space-y-1.5">
                  <div className="text-xs font-mono uppercase text-[#C9A45C]">
                    2. Phiên Âm Hán Việt
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/20 text-xs sm:text-sm leading-relaxed text-[#F2E8D5] italic font-sans">
                    {currentPage.transcriptionVi}
                  </div>
                </div>

                {/* Dịch nghĩa Quốc ngữ */}
                <div className="space-y-1.5">
                  <div className="text-xs font-mono uppercase text-[#C9A45C]">
                    3. Bản Dịch Nghĩa Học Thuật
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#781F25]/20 border border-[#C9A45C]/30 text-xs sm:text-sm leading-relaxed text-[#FFF4DB] font-sans">
                    {currentPage.translationVi}
                  </div>
                </div>

                {/* Chú giải ngữ âm & điển lệ */}
                {currentPage.notes && currentPage.notes.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#C9A45C]/20">
                    <div className="text-xs font-mono uppercase text-[#C9A45C] flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>Chú Giải Điển Chế Âm Nhạc</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#F2E8D5]/80 list-disc list-inside">
                      {currentPage.notes.map((note, i) => (
                        <li key={i} className="leading-relaxed">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'metadata' && (
              <div className="space-y-4 text-xs font-sans animate-fadeIn">
                <div className="p-3 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/30 space-y-2">
                  <div className="text-xs font-mono uppercase text-[#C9A45C] font-bold">
                    Thông Tin Thẩm Định Thư Tịch
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#F2E8D5]/50 block">Mã định danh:</span>
                      <span className="font-mono text-[#E5C07B]">{manuscript.code}</span>
                    </div>
                    <div>
                      <span className="text-[#F2E8D5]/50 block">Niên đại:</span>
                      <span>{manuscript.year}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#F2E8D5]/50 block">Biên soạn:</span>
                      <span>{manuscript.authorOrCompiler}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#F2E8D5]/50 block">Cơ quan bảo quản:</span>
                      <span>{manuscript.holdingRepository}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#F2E8D5]/50 block">Hình thái đóng tập:</span>
                      <span>{manuscript.bindingType}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#F2E8D5]/50 block">Bản quyền:</span>
                      <span className="text-green-400/90">{manuscript.rights}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#171513] border border-[#C9A45C]/20 text-[11px] text-[#F2E8D5]/70 leading-relaxed">
                  Bản scan được lập chỉ mục liên kết trực tiếp với dữ kiện học thuật <strong>{manuscript.citationFactId}</strong> trong Knowledge Fact-Store.
                </div>
              </div>
            )}

            {activeTab === 'iiif' && (
              <div className="space-y-4 animate-fadeIn font-mono text-xs">
                <div className="text-xs text-[#C9A45C] font-bold">
                  IIIF Presentation API 3.0 Manifest
                </div>
                <div className="p-3 rounded bg-black/60 border border-[#C9A45C]/25 text-[10px] text-[#C9A45C] break-all">
                  {manuscript.iiifManifestUri}
                </div>
                <pre className="p-3 rounded bg-black/80 border border-[#C9A45C]/20 text-[10px] text-emerald-400 overflow-x-auto max-h-72">
{`{
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "id": "${manuscript.iiifManifestUri}",
  "type": "Manifest",
  "label": { "vi": [ "${manuscript.title}" ] },
  "metadata": [
    { "label": { "vi": ["Niên đại"] }, "value": { "vi": ["${manuscript.year}"] } },
    { "label": { "vi": ["Đơn vị lưu giữ"] }, "value": { "vi": ["${manuscript.holdingRepository}"] } }
  ],
  "items": [
    ${manuscript.pages.map((p, i) => `{
      "id": "canvas-${i + 1}",
      "type": "Canvas",
      "height": ${p.height},
      "width": ${p.width},
      "label": { "vi": ["${p.label}"] }
    }`).join(',\n    ')}
  ]
}`}
                </pre>
                <div className="text-[11px] text-[#F2E8D5]/60">
                  Tương thích hoàn toàn với trình đọc quốc tế Mirador, Universal Viewer và Tify.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
