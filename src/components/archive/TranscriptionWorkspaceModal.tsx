/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TRANSCRIPTION WORKSPACE (HÁN NÔM SIDE-BY-SIDE TRANSLATION & CRITICAL APPARATUS)
 * Phân hệ 5 - Trung tâm Tư liệu số Chuyên sâu
 */

import React, { useState } from 'react';
import {
  X,
  Save,
  CheckCircle2,
  FileEdit,
  History,
  BookOpen,
  Send,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { DigitalManuscript, TranscriptionRecord, TRANSCRIPTION_RECORDS } from '../../data/digitalArchiveData.ts';

interface TranscriptionWorkspaceModalProps {
  manuscript: DigitalManuscript;
  initialPageNumber?: number;
  onClose: () => void;
  onSaveTranscription?: (record: TranscriptionRecord) => void;
}

export const TranscriptionWorkspaceModal: React.FC<TranscriptionWorkspaceModalProps> = ({
  manuscript,
  initialPageNumber = 1,
  onClose,
  onSaveTranscription
}) => {
  const [selectedPageNum, setSelectedPageNum] = useState(initialPageNumber);
  const activePage = manuscript.pages.find((p) => p.pageNumber === selectedPageNum) || manuscript.pages[0];

  const existingRecord = TRANSCRIPTION_RECORDS.find(
    (t) => t.manuscriptId === manuscript.id && t.pageNumber === selectedPageNum
  );

  const [hanNomInput, setHanNomInput] = useState(
    existingRecord ? existingRecord.originalHanNomLines.join('\n') : activePage.hanNomText
  );
  const [transcriptionInput, setTranscriptionInput] = useState(
    existingRecord ? existingRecord.sinoVietnameseLines.join('\n') : activePage.transcriptionVi
  );
  const [translationInput, setTranslationInput] = useState(
    existingRecord ? existingRecord.modernVietnameseTranslation.join('\n') : activePage.translationVi
  );
  const [contributorName, setContributorName] = useState('Trần Thanh Bình (Nghiên cứu sinh di sản)');
  const [justification, setJustification] = useState('Đối chiếu ngữ nghĩa theo Khâm Định Đại Nam Hội Điển Sự Lệ');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    const updatedRecord: TranscriptionRecord = {
      id: existingRecord ? existingRecord.id : `TRN-${Date.now()}`,
      manuscriptId: manuscript.id,
      pageNumber: selectedPageNum,
      originalHanNomLines: hanNomInput.split('\n'),
      sinoVietnameseLines: transcriptionInput.split('\n'),
      modernVietnameseTranslation: translationInput.split('\n'),
      criticalApparatus: existingRecord ? existingRecord.criticalApparatus : [],
      lastEditedBy: contributorName,
      lastEditedAt: new Date().toISOString().split('T')[0],
      reviewStatus: 'Đã thẩm định'
    };

    if (onSaveTranscription) {
      onSaveTranscription(updatedRecord);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col text-[#F2E8D5] animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#C9A45C]/30 bg-[#171513]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#781F25] border border-[#C9A45C]/50 flex items-center justify-center">
            <FileEdit className="w-4 h-4 text-[#C9A45C]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#493326]/60 text-[#E5C07B] border border-[#C9A45C]/30">
                Workspace
              </span>
              <span className="text-xs font-mono text-[#C9A45C]">Không Gian Phiên Âm & Chú Giải Học Thuật</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[#FFF4DB] font-display line-clamp-1">
              {manuscript.title} – {activePage.label}
            </h2>
          </div>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã lưu & ghi vết audit!</span>
            </span>
          )}

          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 rounded bg-[#781F25] hover:bg-[#A32A32] text-xs font-medium text-[#FFF4DB] border border-[#C9A45C]/40 transition-colors flex items-center gap-1.5 cursor-pointer shadow"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Lưu Phiên Âm</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#493326]/40 hover:bg-[#781F25] text-[#F2E8D5]/80 hover:text-white border border-[#C9A45C]/30 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Split Body: Left Leaf Scan, Right Multi-Tier Text Editor */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Original Scanned Leaf with Page Switcher */}
        <div className="flex-1 bg-[#0D0B0A] border-r border-[#C9A45C]/30 flex flex-col justify-between overflow-hidden p-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#C9A45C]/20 text-xs font-mono text-[#C9A45C]">
            <span>Bản Scan Gốc: {activePage.label}</span>
            <div className="flex items-center gap-1.5">
              <span>Trang:</span>
              {manuscript.pages.map((p) => (
                <button
                  key={p.pageNumber}
                  onClick={() => setSelectedPageNum(p.pageNumber)}
                  className={`px-2 py-0.5 rounded border text-xs cursor-pointer ${
                    selectedPageNum === p.pageNumber
                      ? 'bg-[#C9A45C] text-[#171513] font-bold border-[#C9A45C]'
                      : 'bg-[#493326]/30 text-[#F2E8D5]/80 border-[#C9A45C]/20 hover:bg-[#493326]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <img
              src={activePage.imageUrl}
              alt={activePage.label}
              className="max-h-[70vh] w-auto object-contain rounded border border-[#C9A45C]/30 shadow-2xl"
            />
          </div>

          <div className="text-[11px] font-mono text-[#F2E8D5]/60 text-center pt-2 border-t border-[#C9A45C]/20">
            Lưu giữ tại: {manuscript.holdingRepository} · Mã liên kết Fact: {manuscript.citationFactId}
          </div>
        </div>

        {/* Right Side: Multi-Tier Scholarly Transcription Workspace */}
        <div className="w-full lg:w-[500px] bg-[#171513] flex flex-col p-5 overflow-y-auto space-y-4">
          <div className="p-3 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/30 text-xs text-[#F2E8D5]/80 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
            <span>
              Mọi bản phiên âm và chú giải học thuật khi lưu đều được ghi nhận vào nhật ký kiểm toán hệ thống (Audit Trail) để đảm bảo tính minh bạch học thuật.
            </span>
          </div>

          {/* Tier 1: Chữ Hán nguyên bản */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-[#C9A45C] font-bold block">
              1. Nguyên Văn Chữ Hán (Nhập hoặc chỉnh lý)
            </label>
            <textarea
              rows={3}
              value={hanNomInput}
              onChange={(e) => setHanNomInput(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0D0B0A] border border-[#C9A45C]/40 text-base font-serif text-[#FFF4DB] focus:outline-none focus:border-[#C9A45C]"
            />
          </div>

          {/* Tier 2: Phiên âm Hán Việt */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-[#C9A45C] font-bold block">
              2. Phiên Âm Hán Việt
            </label>
            <textarea
              rows={3}
              value={transcriptionInput}
              onChange={(e) => setTranscriptionInput(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0D0B0A] border border-[#C9A45C]/40 text-xs sm:text-sm font-sans italic text-[#E5C07B] focus:outline-none focus:border-[#C9A45C]"
            />
          </div>

          {/* Tier 3: Dịch nghĩa Quốc ngữ */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-[#C9A45C] font-bold block">
              3. Bản Dịch Nghĩa Học Thuật
            </label>
            <textarea
              rows={4}
              value={translationInput}
              onChange={(e) => setTranslationInput(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0D0B0A] border border-[#C9A45C]/40 text-xs sm:text-sm font-sans text-[#FFF4DB] focus:outline-none focus:border-[#C9A45C]"
            />
          </div>

          {/* Metadata Contributor & Justification */}
          <div className="p-3.5 rounded-lg bg-[#493326]/25 border border-[#C9A45C]/30 space-y-3 text-xs">
            <div>
              <label className="text-[#C9A45C] font-mono block mb-1">Người đóng góp / Hiệu đính:</label>
              <input
                type="text"
                value={contributorName}
                onChange={(e) => setContributorName(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-[#171513] border border-[#C9A45C]/30 text-xs text-[#FFF4DB] focus:outline-none focus:border-[#C9A45C]"
              />
            </div>
            <div>
              <label className="text-[#C9A45C] font-mono block mb-1">Căn cứ học thuật / Thư tịch tham chiếu:</label>
              <input
                type="text"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-[#171513] border border-[#C9A45C]/30 text-xs text-[#FFF4DB] focus:outline-none focus:border-[#C9A45C]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
