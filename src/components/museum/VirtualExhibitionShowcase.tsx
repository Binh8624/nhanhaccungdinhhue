/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TRIỂN LÃM CHUYÊN ĐỀ SỐ HÓA BẢO TÀNG (VIRTUAL EXHIBITION SHOWCASE - GĐ5)
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Music, ShieldCheck, ArrowRight, ExternalLink, Eye, Play, Volume2 } from 'lucide-react';
import { courtAudioEngine } from '../../utils/audioEngine';

interface ExhibitionArtifact {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  mediaUrl: string;
  sourceType: string;
  rightsLicense: string;
  linkToRoute: string;
}

export const VirtualExhibitionShowcase: React.FC = () => {
  const [selectedExhibitionIndex, setSelectedExhibitionIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const exhibitionItems: ExhibitionArtifact[] = [
    {
      id: 'ex-01',
      title: 'Khâm Định Đại Nam Hội Điển Sự Lệ – Quyển 96: Điển Chế Lễ Nhạc',
      category: 'Mộc bản Triều Nguyễn (Di sản Tư liệu Thế giới)',
      date: 'Năm Tân Hợi 1851 (Triều vua Tự Đức)',
      description: 'Văn bản điển chế gốc quy định toàn diện biên chế nhạc công, dàn Đại nhạc, Tiểu nhạc, y phục tế tự và các bài bản ca chương cho từng nghi thức tại Đàn Nam Giao, Thế Miếu, Điện Thái Hòa.',
      mediaUrl: '/src/assets/images/kham_dinh_manuscript_scan_1793952627993.jpg',
      sourceType: 'Bản scan thư tịch Hán Nôm gốc · Chuẩn IIIF Presentation 3.0',
      rightsLicense: 'Trung tâm Lưu trữ Quốc gia I & Bảo tàng Cổ vật Cung đình Huế · CC-BY-NC-ND 4.0',
      linkToRoute: '/kho-luu-tru'
    },
    {
      id: 'ex-02',
      title: 'Kèn Bầu Hoàng Triều thời vua Thiệu Trị',
      category: 'Cổ vật Nhạc khí Quý hiếm',
      date: 'Năm 1845 (Triều vua Thiệu Trị)',
      description: 'Hiện vật gốc được chế tác bằng gỗ mun sừng già đẽo tiện hình búp chuối, bát loa bằng đồng thau chạm rồng mây tinh xảo. Đây là nhạc cụ lĩnh xướng hàng đầu của dàn Đại nhạc cung đình.',
      mediaUrl: '/src/assets/images/ken_bau_artifact_close_up_1793952631557.jpg',
      sourceType: 'Ảnh hiện vật siêu phân giải Deep Zoom & Chú thích Hotspots',
      rightsLicense: 'Bảo tàng Cổ vật Cung đình Huế (Điện Long An) · Bản quyền bảo tồn',
      linkToRoute: '/nhac-cu'
    },
    {
      id: 'ex-03',
      title: 'Bản Ký âm Điền dã Mười Bản Ngự (Thập Thủ Liên Hoàn)',
      category: 'Bản thảo Ký âm Nhạc học',
      date: 'Năm 1995 (Cố Nghệ nhân NSƯT Trần Kích)',
      description: 'Bản chép tay bằng chữ nhạc truyền thống (Hò, Xự, Xang, Xê, Cống) kết hợp phiên dịch ngũ dòng kẻ phương Tây, là cơ sở khoa học then chốt được đệ trình trong hồ sơ UNESCO 2003.',
      mediaUrl: '/src/assets/images/tran_kich_score_manuscript_1793952635105.jpg',
      sourceType: 'Bản ký âm điền dã nguyên gốc của nghệ nhân',
      rightsLicense: 'Viện Âm nhạc Việt Nam & Di cảo gia tộc cố nghệ nhân Trần Kích',
      linkToRoute: '/kho-luu-tru'
    }
  ];

  const activeItem = exhibitionItems[selectedExhibitionIndex];

  const handlePlaySample = () => {
    setIsPlayingAudio(true);
    courtAudioEngine.playTrack('track-exhibition', [349.23, 392.00, 466.16, 523.25, 587.33]);
    setTimeout(() => setIsPlayingAudio(false), 2400);
  };

  return (
    <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#C9A45C]/20 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C9A45C]">
            <Sparkles className="w-4 h-4 text-[#C9A45C]" />
            <span>TRIỂN LÃM CHUYÊN ĐỀ SỐ HÓA BẢO TÀNG (GIAI ĐOẠN 5)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#FFF4DB] mt-1">
            Âm Vang Cố Đô: Từ Điển Chế Hoàng Triều Đến Di Sản Nhân Loại
          </h2>
          <p className="text-xs text-[#F2E8D5]/70 font-sans mt-0.5">
            Không gian trưng bày xâu chuỗi đa phương tiện: Mộc bản Hán Nôm, cổ vật nhạc khí, bản thu điền dã và tổng phổ bài bản.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {exhibitionItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedExhibitionIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedExhibitionIndex === idx
                  ? 'bg-[#781F25] text-[#FFF4DB] border border-[#E5C07B]'
                  : 'bg-[#493326]/20 text-[#F2E8D5]/60 hover:text-[#FFF4DB]'
              }`}
            >
              Tiêu bản 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Exhibition Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Media Preview Slot */}
        <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-[#C9A45C]/40 bg-black shadow-xl group">
          <img
            src={activeItem.mediaUrl}
            alt={activeItem.title}
            className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-[11px] font-sans text-[#E5C07B] bg-[#171513]/85 p-2.5 rounded border border-[#C9A45C]/30 flex items-center justify-between">
            <span className="truncate">{activeItem.sourceType}</span>
            <span className="font-mono text-[10px] text-emerald-400 shrink-0">Bảo tồn số</span>
          </div>
        </div>

        {/* Narrative & Details */}
        <div className="lg:col-span-7 space-y-4 font-sans text-xs">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C9A45C]">
              {activeItem.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#FFF4DB] mt-1">
              {activeItem.title}
            </h3>
            <div className="text-xs text-[#E5C07B] font-mono mt-1">
              Niên đại: {activeItem.date}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#F2E8D5]/90 leading-relaxed font-sans">
            {activeItem.description}
          </p>

          <div className="p-3.5 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/20 space-y-1">
            <div className="flex items-center gap-2 text-[#C9A45C] font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Quy chế Bản quyền & Cơ quan Lưu trữ:</span>
            </div>
            <p className="text-[11px] text-[#F2E8D5]/70">
              {activeItem.rightsLicense}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handlePlaySample}
              className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-500 text-[#171513]'
                  : 'bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] hover:brightness-110'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingAudio ? 'Đang tấu mẫu...' : 'Thính âm trích đoạn bài bản'}</span>
            </button>

            <Link
              to={activeItem.linkToRoute}
              className="px-4 py-2 rounded-lg bg-[#781F25] hover:bg-[#A32A32] text-[#FFF4DB] font-bold text-xs flex items-center gap-1.5 border border-[#C9A45C]/40 transition-colors"
            >
              <span>Xem chi tiết trong Phân hệ Tư liệu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
