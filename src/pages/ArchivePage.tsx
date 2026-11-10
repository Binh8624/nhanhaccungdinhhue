import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  FileText,
  Search,
  Filter,
  ShieldCheck,
  X,
  Calendar,
  MapPin,
  ExternalLink,
  ArrowRight,
  BookOpen,
  Sparkles,
  Music,
  Video,
  GitCompare,
  Upload,
  Layers,
  FileEdit
} from 'lucide-react';
import { ARCHIVE_ITEMS, ArchiveItem } from '../data/archiveData';
import {
  DIGITAL_MANUSCRIPTS,
  HIGH_RES_ARTIFACTS,
  AUDIO_ARCHIVE_ITEMS,
  VIDEO_ARCHIVE_ITEMS,
  DigitalManuscript,
  HighResArtifactImage,
  AudioRecord,
  VideoRecord
} from '../data/digitalArchiveData.ts';

// 6 Phân hệ Trung tâm Tư liệu số Chuyên sâu
import { ManuscriptViewerModal } from '../components/archive/ManuscriptViewerModal';
import { HighResImageViewerModal } from '../components/archive/HighResImageViewerModal';
import { AudioArchiveStudioModal } from '../components/archive/AudioArchiveStudioModal';
import { VideoArchivePlayerModal } from '../components/archive/VideoArchivePlayerModal';
import { TranscriptionWorkspaceModal } from '../components/archive/TranscriptionWorkspaceModal';
import { SourceComparisonModal } from '../components/archive/SourceComparisonModal';
import { ArchiveAdminUploadModal } from '../components/archive/ArchiveAdminUploadModal';
import { VirtualExhibitionShowcase } from '../components/museum/VirtualExhibitionShowcase';

export const ArchivePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<ArchiveItem | null>(null);

  // States quản lý 6 Phân hệ Trung tâm Tư liệu số Chuyên sâu
  const [activeManuscript, setActiveManuscript] = useState<DigitalManuscript | null>(null);
  const [activeArtifactImage, setActiveArtifactImage] = useState<HighResArtifactImage | null>(null);
  const [activeAudioRecord, setActiveAudioRecord] = useState<AudioRecord | null>(null);
  const [activeVideoRecord, setActiveVideoRecord] = useState<VideoRecord | null>(null);
  const [activeTranscriptionManuscript, setActiveTranscriptionManuscript] = useState<DigitalManuscript | null>(null);
  const [transcriptionPageNum, setTranscriptionPageNum] = useState<number>(1);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isAdminUploadOpen, setIsAdminUploadOpen] = useState(false);

  const filteredItems = ARCHIVE_ITEMS.filter((item) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesEra = selectedEra === 'all' || item.era === selectedEra;

    return matchesSearch && matchesCategory && matchesEra;
  });

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Kho Lưu trữ Di sản Số' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Thư khố Học thuật & Cơ sở Dữ liệu Đa phương tiện
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#FFF4DB]">
            KHO LƯU TRỮ DI SẢN SỐ
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Tra cứu văn bản Hán Nôm, bản ghi âm thanh mẫu mực, tư liệu phục dựng đại lễ và các công trình nghiên cứu khoa học của UNESCO và Cố GS.TS Trần Văn Khê.
          </p>
        </div>

        {/* TRIỂN LÃM SỐ CHUYÊN ĐỀ HỌC THUẬT (GIAI ĐOẠN 5) */}
        <VirtualExhibitionShowcase />

        {/* 6 PHÂN HỆ TƯ LIỆU SỐ CHUYÊN SÂU - GIAI ĐOẠN 3 INTERACTIVE WORKSPACES */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#C9A45C]/30">
            <div>
              <span className="text-[11px] font-mono text-[#C9A45C] uppercase tracking-wider block font-bold">
                CÔNG CỤ HỌC THUẬT & TRẢI NGHIỆM CHUYÊN SÂU (GIAI ĐOẠN 3)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#FFF4DB]">
                6 Phân Hệ Nghiên Cứu Tư Liệu Số
              </h2>
            </div>
            <button
              onClick={() => setIsAdminUploadOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#781F25] hover:bg-[#A32A32] text-xs font-bold text-[#FFF4DB] border border-[#C9A45C]/50 transition-all flex items-center gap-2 cursor-pointer shadow-lg self-start sm:self-auto"
            >
              <Upload className="w-4 h-4 text-[#C9A45C]" />
              <span>Tiếp Nhận Tư Liệu Mới (CMS)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Phân hệ 1: Manuscript Viewer */}
            <div
              onClick={() => setActiveManuscript(DIGITAL_MANUSCRIPTS[0])}
              className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 hover:border-[#C9A45C] transition-all cursor-pointer group shadow-lg hover:shadow-[#C9A45C]/10 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-[#781F25]/40 border border-[#C9A45C]/50 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#781F25] transition-colors">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#493326]/40 text-[#E5C07B] border border-[#C9A45C]/20">
                    IIIF 3.0
                  </span>
                </div>
                <h3 className="text-sm font-bold font-display text-[#FFF4DB] group-hover:text-[#E5C07B]">
                  1. Digital Manuscript Viewer
                </h3>
                <p className="text-xs text-[#F2E8D5]/70 font-sans line-clamp-2 leading-relaxed">
                  Đọc văn bản Hán Nôm cổ scan từng trang (Khâm Định 1851, ký âm 1995), zoom pan theo chuẩn IIIF Presentation 3.0.
                </p>
              </div>
              <span className="mt-3 text-xs text-[#C9A45C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Mở bản thảo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Phân hệ 2: High-res Image Viewer */}
            <div
              onClick={() => setActiveArtifactImage(HIGH_RES_ARTIFACTS[0])}
              className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 hover:border-[#C9A45C] transition-all cursor-pointer group shadow-lg hover:shadow-[#C9A45C]/10 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-[#781F25]/40 border border-[#C9A45C]/50 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#781F25] transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#493326]/40 text-[#E5C07B] border border-[#C9A45C]/20">
                    Deep Zoom
                  </span>
                </div>
                <h3 className="text-sm font-bold font-display text-[#FFF4DB] group-hover:text-[#E5C07B]">
                  2. High-Res Image Viewer
                </h3>
                <p className="text-xs text-[#F2E8D5]/70 font-sans line-clamp-2 leading-relaxed">
                  Soi chi tiết cổ vật thế kỷ XIX (Kèn Bầu, Đàn Tỳ Bà khảm ốc) với các điểm chú thích cấu trúc âm học tương tác.
                </p>
              </div>
              <span className="mt-3 text-xs text-[#C9A45C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Soi chi tiết cổ vật</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Phân hệ 3: Audio Archive Studio */}
            <div
              onClick={() => setActiveAudioRecord(AUDIO_ARCHIVE_ITEMS[0])}
              className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 hover:border-[#C9A45C] transition-all cursor-pointer group shadow-lg hover:shadow-[#C9A45C]/10 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-[#781F25]/40 border border-[#C9A45C]/50 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#781F25] transition-colors">
                    <Music className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                    Waveform
                  </span>
                </div>
                <h3 className="text-sm font-bold font-display text-[#FFF4DB] group-hover:text-[#E5C07B]">
                  3. Audio Archive Studio
                </h3>
                <p className="text-xs text-[#F2E8D5]/70 font-sans line-clamp-2 leading-relaxed">
                  Kho bản thu âm thanh mẫu mực tại Duyệt Thị Đường & băng điền dã năm 1995 của cụ Thi, cụ Kích với dạng sóng waveform.
                </p>
              </div>
              <span className="mt-3 text-xs text-[#C9A45C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Nghe bản thu mẫu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Phân hệ 4: Video Archive Player */}
            <div
              onClick={() => setActiveVideoRecord(VIDEO_ARCHIVE_ITEMS[0])}
              className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 hover:border-[#C9A45C] transition-all cursor-pointer group shadow-lg hover:shadow-[#C9A45C]/10 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-[#781F25]/40 border border-[#C9A45C]/50 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#781F25] transition-colors">
                    <Video className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#493326]/40 text-[#E5C07B] border border-[#C9A45C]/20">
                    Bookmarks
                  </span>
                </div>
                <h3 className="text-sm font-bold font-display text-[#FFF4DB] group-hover:text-[#E5C07B]">
                  4. Video Archive Player
                </h3>
                <p className="text-xs text-[#F2E8D5]/70 font-sans line-clamp-2 leading-relaxed">
                  Lưu trữ video phục dựng đại lễ tế Nam Giao, vũ khúc Lục Cúng Hoa Đăng với các mốc thời gian nghi thức quan trọng.
                </p>
              </div>
              <span className="mt-3 text-xs text-[#C9A45C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Xem video nghi lễ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Phân hệ 5: Transcription Workspace */}
            <div
              onClick={() => {
                setActiveTranscriptionManuscript(DIGITAL_MANUSCRIPTS[0]);
                setTranscriptionPageNum(1);
              }}
              className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 hover:border-[#C9A45C] transition-all cursor-pointer group shadow-lg hover:shadow-[#C9A45C]/10 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-[#781F25]/40 border border-[#C9A45C]/50 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#781F25] transition-colors">
                    <FileEdit className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#493326]/40 text-[#E5C07B] border border-[#C9A45C]/20">
                    Workspace
                  </span>
                </div>
                <h3 className="text-sm font-bold font-display text-[#FFF4DB] group-hover:text-[#E5C07B]">
                  5. Transcription Workspace
                </h3>
                <p className="text-xs text-[#F2E8D5]/70 font-sans line-clamp-2 leading-relaxed">
                  Không gian làm việc song song bản scan và 3 tầng văn bản: Chữ Hán → Phiên âm Hán Việt → Dịch nghĩa &amp; Chú giải.
                </p>
              </div>
              <span className="mt-3 text-xs text-[#C9A45C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Vào không gian dịch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Phân hệ 6: Source Comparison */}
            <div
              onClick={() => setIsComparisonOpen(true)}
              className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 hover:border-[#C9A45C] transition-all cursor-pointer group shadow-lg hover:shadow-[#C9A45C]/10 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-[#781F25]/40 border border-[#C9A45C]/50 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#781F25] transition-colors">
                    <GitCompare className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#493326]/40 text-[#E5C07B] border border-[#C9A45C]/20">
                    Dual Compare
                  </span>
                </div>
                <h3 className="text-sm font-bold font-display text-[#FFF4DB] group-hover:text-[#E5C07B]">
                  6. Source Comparison
                </h3>
                <p className="text-xs text-[#F2E8D5]/70 font-sans line-clamp-2 leading-relaxed">
                  So sánh song song các dị bản (Khâm Định 1851 vs bản chép tay 1995 của cụ Trần Kích) với đánh giá trung lập.
                </p>
              </div>
              <span className="mt-3 text-xs text-[#C9A45C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Đối chiếu dị bản</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-xl p-5 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#C9A45C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm tư liệu, tên văn bản, từ khóa..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/30 text-xs sm:text-sm text-[#FFF4DB] placeholder-[#F2E8D5]/40 focus:outline-none focus:border-[#C9A45C]"
              />
            </div>

            {/* Category dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/30 text-xs sm:text-sm text-[#F2E8D5] focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả thể loại tư liệu</option>
              <option value="Văn bản & Thư tịch cổ">Văn bản & Thư tịch cổ</option>
              <option value="Hình ảnh tư liệu">Hình ảnh tư liệu</option>
              <option value="Bản thu âm thanh">Bản thu âm thanh</option>
              <option value="Video diễn xướng">Video diễn xướng</option>
              <option value="Nghiên cứu khoa học">Nghiên cứu khoa học</option>
            </select>

            {/* Era dropdown */}
            <select
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/30 text-xs sm:text-sm text-[#F2E8D5] focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả thời kỳ</option>
              <option value="Triều Nguyễn (1802-1945)">Triều Nguyễn (1802-1945)</option>
              <option value="Thời kỳ phục hồi (1990-2003)">Thời kỳ phục hồi (1990-2003)</option>
              <option value="Đương đại (Sau UNESCO)">Đương đại (Sau UNESCO)</option>
            </select>
          </div>

          <div className="flex items-center justify-between text-xs text-[#F2E8D5]/60 font-sans">
            <span>Hiển thị <strong>{filteredItems.length}</strong> tư liệu lưu trữ</span>
            <span className="text-[#C9A45C] font-mono">Trạng thái: Đã xác thực & số hóa</span>
          </div>
        </div>

        {/* Archive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative rounded-lg border border-[#C9A45C]/25 bg-[#171513]/90 hover:border-[#C9A45C] transition-all p-5 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-[#C9A45C]/10"
            >
              <div>
                <div className="relative h-44 rounded overflow-hidden mb-4 border border-[#C9A45C]/20 bg-[#493326]/20">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#171513]/85 text-[10px] font-mono text-[#E5C07B] border border-[#C9A45C]/30">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#C9A45C]">
                    <Calendar className="w-3 h-3" />
                    <span>{item.year} · {item.era}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#493326]/40 text-[#E5C07B] border border-[#C9A45C]/30">
                    {item.archiveCode}
                  </span>
                </div>

                <h3 className="text-base font-display font-bold text-[#FFF4DB] group-hover:text-[#E5C07B] line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#F2E8D5]/70 font-sans line-clamp-2 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#493326]/40 flex items-center justify-between text-xs">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  item.academicClassification === 'Dữ liệu lịch sử đã kiểm chứng'
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                    : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                }`}>
                  {item.academicClassification}
                </span>
                <span className="text-[#C9A45C] font-semibold group-hover:text-[#E5C07B]">
                  Thẩm định →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail View - Artifact & Archival Inspector */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-[#171513] border border-[#C9A45C]/60 rounded-xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto font-sans space-y-5">
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#F2E8D5]/70 hover:text-[#FFF4DB] hover:bg-[#781F25]/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-56 rounded-lg overflow-hidden border border-[#C9A45C]/30">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#171513]/85 text-[10px] font-mono text-[#E5C07B] border border-[#C9A45C]/40">
                  {activeModalItem.imageProvenance}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#C9A45C] mb-1">
                  <span>Mã lưu trữ: <strong>{activeModalItem.archiveCode}</strong></span>
                  <span>·</span>
                  <span>{activeModalItem.category}</span>
                  <span>·</span>
                  <span>{activeModalItem.era}</span>
                </div>
                <h2 className="text-2xl font-display font-bold text-[#E5C07B]">
                  {activeModalItem.title}
                </h2>
                <div className="text-xs text-[#F2E8D5]/70 mt-1 flex items-center gap-3">
                  <span>Niên đại: {activeModalItem.year}</span>
                  <span>·</span>
                  <span>Địa bàn: {activeModalItem.location}</span>
                </div>
              </div>

              {/* Archival Dossier Inspection Box */}
              <div className="p-4 rounded-lg bg-[#493326]/25 border border-[#C9A45C]/30 space-y-2.5 text-xs">
                <div className="text-[11px] font-mono text-[#E5C07B] uppercase tracking-wider font-semibold pb-1 border-b border-[#C9A45C]/20 flex items-center justify-between">
                  <span>HỒ SƠ THẨM ĐỊNH LƯU TRỮ</span>
                  <span className="text-emerald-400 font-bold">{activeModalItem.academicClassification}</span>
                </div>
                <div>
                  <strong className="text-[#C9A45C]">Nguồn gốc & Tác giả lưu trữ:</strong> {activeModalItem.authorOrSource}
                </div>
                <div>
                  <strong className="text-[#C9A45C]">Trích lục thư tịch gốc:</strong> {activeModalItem.primarySourceCitation}
                </div>
                <div>
                  <strong className="text-[#C9A45C]">Tình trạng bảo quản hiện nay:</strong> {activeModalItem.preservationStatus}
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-[#C9A45C] text-xs block mb-1">
                    Nội dung tư liệu:
                  </span>
                  <p className="text-[#F2E8D5]/85 leading-relaxed">{activeModalItem.description}</p>
                </div>

                <div>
                  <span className="font-semibold uppercase tracking-wider text-[#C9A45C] text-xs block mb-1">
                    Giá trị lịch sử & bảo tồn di sản:
                  </span>
                  <p className="text-[#F2E8D5]/85 leading-relaxed">{activeModalItem.historicalValue}</p>
                </div>

                {/* Actionable Deep Viewer Launcher from Inspector */}
                <div className="pt-3 border-t border-[#C9A45C]/30 flex flex-wrap gap-2">
                  {activeModalItem.category === 'Văn bản & Thư tịch cổ' && (
                    <button
                      onClick={() => {
                        const mss = DIGITAL_MANUSCRIPTS.find(m => m.code.includes('1851')) || DIGITAL_MANUSCRIPTS[0];
                        setActiveManuscript(mss);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#781F25] hover:bg-[#A32A32] text-xs font-bold text-[#FFF4DB] border border-[#C9A45C]/50 flex items-center gap-2 cursor-pointer shadow"
                    >
                      <BookOpen className="w-4 h-4 text-[#C9A45C]" />
                      <span>Mở Trình Đọc IIIF Presentation 3.0</span>
                    </button>
                  )}

                  {activeModalItem.category === 'Bản thu âm thanh' && (
                    <button
                      onClick={() => {
                        setActiveAudioRecord(AUDIO_ARCHIVE_ITEMS[0]);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#781F25] hover:bg-[#A32A32] text-xs font-bold text-[#FFF4DB] border border-[#C9A45C]/50 flex items-center gap-2 cursor-pointer shadow"
                    >
                      <Music className="w-4 h-4 text-[#C9A45C]" />
                      <span>Mở Studio Nghe Phân Tích Waveform</span>
                    </button>
                  )}

                  {activeModalItem.category === 'Video diễn xướng' && (
                    <button
                      onClick={() => {
                        setActiveVideoRecord(VIDEO_ARCHIVE_ITEMS[0]);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#781F25] hover:bg-[#A32A32] text-xs font-bold text-[#FFF4DB] border border-[#C9A45C]/50 flex items-center gap-2 cursor-pointer shadow"
                    >
                      <Video className="w-4 h-4 text-[#C9A45C]" />
                      <span>Mở Trình Phát Video Nghi Lễ Có Bookmark</span>
                    </button>
                  )}

                  {activeModalItem.category === 'Hình ảnh tư liệu' && (
                    <button
                      onClick={() => {
                        setActiveArtifactImage(HIGH_RES_ARTIFACTS[0]);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#781F25] hover:bg-[#A32A32] text-xs font-bold text-[#FFF4DB] border border-[#C9A45C]/50 flex items-center gap-2 cursor-pointer shadow"
                    >
                      <Sparkles className="w-4 h-4 text-[#C9A45C]" />
                      <span>Mở Trình Soi Cổ Vật Deep Zoom & Hotspot</span>
                    </button>
                  )}
                </div>

                <div className="pt-2 border-t border-[#493326]/40 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-emerald-400">
                    Quyền truy cập: {activeModalItem.accessStatus}
                  </span>
                  <div className="flex gap-1.5">
                    {activeModalItem.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#781F25]/30 border border-[#C9A45C]/30 text-[#E5C07B]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6 PHÂN HỆ MODALS TƯ LIỆU SỐ CHUYÊN SÂU */}
        {activeManuscript && (
          <ManuscriptViewerModal
            manuscript={activeManuscript}
            onClose={() => setActiveManuscript(null)}
            onOpenTranscription={(mss, pageNum) => {
              setActiveTranscriptionManuscript(mss);
              setTranscriptionPageNum(pageNum);
            }}
          />
        )}

        {activeArtifactImage && (
          <HighResImageViewerModal
            artifactImage={activeArtifactImage}
            onClose={() => setActiveArtifactImage(null)}
          />
        )}

        {activeAudioRecord && (
          <AudioArchiveStudioModal
            audioItem={activeAudioRecord}
            onClose={() => setActiveAudioRecord(null)}
          />
        )}

        {activeVideoRecord && (
          <VideoArchivePlayerModal
            videoItem={activeVideoRecord}
            onClose={() => setActiveVideoRecord(null)}
          />
        )}

        {activeTranscriptionManuscript && (
          <TranscriptionWorkspaceModal
            manuscript={activeTranscriptionManuscript}
            initialPageNumber={transcriptionPageNum}
            onClose={() => setActiveTranscriptionManuscript(null)}
            onSaveTranscription={(record) => {
              console.log('[Transcription Saved]:', record);
            }}
          />
        )}

        {isComparisonOpen && (
          <SourceComparisonModal
            onClose={() => setIsComparisonOpen(false)}
          />
        )}

        {isAdminUploadOpen && (
          <ArchiveAdminUploadModal
            onClose={() => setIsAdminUploadOpen(false)}
            onSuccess={() => {
              console.log('[Digital Asset Ingested Successfully]');
            }}
          />
        )}

        {/* Footer Link */}
        <div className="bg-[#12100e] border border-[#C9A45C]/30 p-6 rounded-lg flex flex-wrap items-center justify-between text-xs font-sans gap-4">
          <span className="text-[#F2E8D5]/70">
            Kho tư liệu được kiểm kê và cập nhật dựa trên nguồn của Trung tâm Bảo tồn Di tích Cố đô Huế và Hồ sơ UNESCO.
          </span>
          <Link to="/nguon-tham-khao" className="text-[#C9A45C] hover:text-[#E5C07B] font-semibold flex items-center gap-1">
            <span>Xem hệ thống 12 nguồn tài liệu đầy đủ</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>
    </div>
  );
};
