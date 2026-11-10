import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { Users2, HeartHandshake, AlertCircle, Quote, ExternalLink, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { COMMUNITY_SUBJECTS, CommunitySubject } from '../data/heritageData';
import { MASTER_ARTISANS_DATA, MasterArtisan } from '../data/artisanDossierData';
import { ArtisanDetailModal } from '../components/museum/ArtisanDetailModal';

export const CommunityPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<CommunitySubject>(COMMUNITY_SUBJECTS[0]);
  const [activeArtisan, setActiveArtisan] = useState<MasterArtisan | null>(null);

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Cộng đồng Chủ thể' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Chuyên trang Con người & Nghệ nhân Di sản · Cố đô Huế, Việt Nam
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#FFF4DB]">
            CỘNG ĐỒNG CHỦ THỂ DI SẢN
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Con người là linh hồn của di sản phi vật thể. Nhã nhạc sống được qua thăng trầm nghìn năm là nhờ sự tận hiến của những bậc nghệ nhân tiền bối và sự tiếp nối của thế hệ hôm nay <sup className="text-[#C9A45C] font-mono">[2],[10]</sup>.
          </p>
        </div>

        {/* HỒ SƠ BẬC THẦY NGHỆ NHÂN CỐ ĐÔ (PHẦN MỚI GIAI ĐOẠN 5 - ĐÃ KIỂM ĐỊNH) */}
        <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#C9A45C]/30">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Hồ sơ học thuật cá thể hóa · Đã kiểm chứng thư tịch & Báo chí chính thống</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#FFF4DB] mt-1">
                BẬC THẦY ĐẠI THỤ CỐ ĐÔ HUẾ
              </h2>
            </div>
            <p className="text-xs text-[#F2E8D5]/70 max-w-md font-sans">
              Tuyệt đối không gán ghép danh hiệu hư cấu; mọi quyết định phong tặng (NSƯT, NNƯT) đều có số quyết định và trích dẫn báo chí chính xác.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MASTER_ARTISANS_DATA.map((artisan) => (
              <div
                key={artisan.id}
                onClick={() => setActiveArtisan(artisan)}
                className="group relative rounded-xl border border-[#C9A45C]/30 bg-[#493326]/15 hover:border-[#C9A45C] hover:bg-[#781F25]/20 p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-[#C9A45C]/10"
              >
                <div>
                  <div className="relative h-44 rounded-lg overflow-hidden border border-[#C9A45C]/30 mb-3 bg-black/40">
                    <img
                      src={artisan.avatarUrl}
                      alt={artisan.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#E5C07B] bg-black/70 px-2 py-0.5 rounded border border-[#C9A45C]/30">
                        {artisan.birthYear} – {artisan.deathYear || 'Hiện tại'}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Đã xác minh</span>
                      </span>
                    </div>
                  </div>

                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#781F25] text-[#FFF4DB] border border-[#C9A45C]/40 mb-1.5">
                    {artisan.officialTitle}
                  </span>

                  <h3 className="text-lg font-display font-bold text-[#FFF4DB] group-hover:text-[#E5C07B] transition-colors">
                    {artisan.name}
                  </h3>

                  <p className="text-xs text-[#E5C07B] font-mono mt-0.5">
                    {artisan.primaryInstruments.join(' · ')}
                  </p>

                  <p className="text-xs text-[#F2E8D5]/80 font-sans mt-2 line-clamp-3 leading-relaxed">
                    {artisan.unescoContribution}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#493326]/40 flex items-center justify-between text-xs font-semibold text-[#C9A45C] group-hover:text-[#FFF4DB]">
                  <span>Xem hồ sơ học thuật</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Community Group Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMMUNITY_SUBJECTS.map((subj) => {
            const isSelected = selectedSubject.id === subj.id;
            return (
              <button
                key={subj.id}
                onClick={() => setSelectedSubject(subj)}
                className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#781F25]/40 border-[#C9A45C] shadow-lg shadow-[#781F25]/20 scale-102'
                    : 'bg-[#493326]/10 border-[#C9A45C]/20 hover:border-[#C9A45C]/50 hover:bg-[#493326]/20'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono text-[#C9A45C] uppercase tracking-wider mb-1">
                    Nhóm chủ thể
                  </div>
                  <div className="text-base font-display font-bold text-[#F2E8D5] leading-snug">
                    {subj.groupName}
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-[#493326]/40 text-xs text-[#E5C07B] font-medium flex items-center justify-between">
                  <span>Khám phá vai trò</span>
                  <span>{isSelected ? '●' : '→'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Curatorial Deep Story Layout */}
        <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg overflow-hidden shadow-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Authentic Master Artisan Portrait */}
            <div className="lg:col-span-5 relative rounded-lg overflow-hidden border border-[#C9A45C]/40 shadow-xl">
              <img
                src={selectedSubject.image}
                alt={selectedSubject.groupName}
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-xs font-serif italic text-[#E5C07B] bg-[#171513]/80 p-2 rounded border border-[#C9A45C]/30">
                Ảnh tư liệu minh họa chủ thể di sản xứ Huế. Dữ liệu nghệ nhân xác thực: Cố NNƯT Lữ Hữu Thi (mất 15/09/2016, thọ 106 tuổi) & Cố NSƯT Trần Kích (1921 - 2010).
              </div>
            </div>

            {/* Right: Narrative Details */}
            <div className="lg:col-span-7 space-y-5 font-sans">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
                  Hồ sơ chủ thể di sản
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#FFF4DB] mt-1">
                  {selectedSubject.groupName}
                </h3>
                <p className="text-sm text-[#E5C07B] font-medium mt-1">
                  {selectedSubject.role}
                </p>
              </div>

              {/* Real Figures List */}
              <div className="p-4 rounded border border-[#C9A45C]/20 bg-[#493326]/20">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-2 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-[#C9A45C]" />
                  <span>Đại diện tiêu biểu có căn cứ xác thực:</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#F2E8D5]/90">
                  {selectedSubject.representativeFigures.map((fig, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C9A45C] mt-0.5">•</span>
                      <span>{fig}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Story & Quote */}
              <div className="p-4 rounded border border-[#C9A45C]/30 bg-[#781F25]/20 relative">
                <Quote className="w-6 h-6 text-[#C9A45C]/30 absolute top-2 right-2 pointer-events-none" />
                <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                  Câu chuyện thực hành & Tấm lòng với di sản
                </div>
                <p className="text-xs sm:text-sm text-[#F2E8D5]/90 italic leading-relaxed">
                  {selectedSubject.story} <sup className="text-[#C9A45C] font-mono">[10]</sup>
                </p>
              </div>

              {/* Challenges */}
              <div className="p-4 rounded border border-amber-900/40 bg-amber-950/20">
                <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Khó khăn & Thách thức trong việc kế thừa:</span>
                </div>
                <p className="text-xs text-[#F2E8D5]/80 leading-relaxed">
                  {selectedSubject.challenges} <sup className="text-[#C9A45C] font-mono">[2]</sup>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SƠ ĐỒ CÂY PHẢ HỆ & TRAO TRUYỀN NGÓN NGHỀ DI SẢN (HERITAGE LINEAGE TREE) */}
        <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-1">
              Phả hệ truyền thừa 4 thế hệ · Thành phố Huế, Việt Nam
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#FFF4DB]">
              SƠ ĐỒ TRAO TRUYỀN NGÓN NGHỀ CỐ ĐÔ
            </h3>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-3" />
            <p className="mt-3 text-xs sm:text-sm text-[#F2E8D5]/80 font-sans">
              Phương thức trao truyền "hò xự xang" truyền khẩu và ngón đàn chân truyền đã nối dài sức sống của Nhã nhạc qua hơn hai thế kỷ biến thiên lịch sử.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {/* Generation 1 */}
            <div className="p-4 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/20 flex flex-col justify-between space-y-3">
              <div>
                <div className="px-2 py-0.5 rounded bg-[#781F25] text-[10px] font-mono text-[#FFF4DB] inline-block mb-2 font-bold">
                  THẾ HỆ I (1802 - 1945)
                </div>
                <h4 className="text-base font-display font-bold text-[#E5C07B]">
                  Thự Hòa Thanh & Ban Nhạc Cung Đình Triều Nguyễn
                </h4>
                <p className="text-xs text-[#F2E8D5]/80 font-sans mt-2 leading-relaxed">
                  Cơ quan chính thống quản lý hàng trăm nhạc sinh, ban hành điển chế Lễ Nhạc và phục vụ nghi lễ từ thời vua Gia Long, Minh Mạng đến vua Bảo Đại.
                </p>
              </div>
              <div className="pt-2 border-t border-[#493326]/40 text-[11px] font-mono text-[#C9A45C]">
                Căn cứ: Khâm Định Đại Nam Hội Điển
              </div>
            </div>

            {/* Generation 2 */}
            <div className="p-4 rounded-lg border border-[#C9A45C]/50 bg-[#781F25]/25 flex flex-col justify-between space-y-3 ring-1 ring-[#C9A45C]/40">
              <div>
                <div className="px-2 py-0.5 rounded bg-[#C9A45C] text-[10px] font-mono text-[#171513] inline-block mb-2 font-bold">
                  THẾ HỆ II (1945 - 2003)
                </div>
                <h4 className="text-base font-display font-bold text-[#FFF4DB]">
                  Bậc Thầy Tiền Bối: Cây Cao Bóng Cả
                </h4>
                <ul className="text-xs text-[#F2E8D5]/90 font-sans mt-2 space-y-1.5 leading-relaxed">
                  <li>
                    <strong className="text-[#E5C07B]">Cố NNƯT Lữ Hữu Thi</strong> (mất 15/09/2016, hưởng thọ 106 tuổi; đại thụ kèn bầu, đàn nguyệt) [Báo Pháp Luật TP.HCM 2016].
                  </li>
                  <li>
                    <strong className="text-[#E5C07B]">Cố NSƯT Trần Kích</strong> (1921 - 2010; danh hiệu NSƯT 2007, Huân chương Văn học Nghệ thuật Pháp 2008) [Báo Tuổi Trẻ 2010].
                  </li>
                </ul>
              </div>
              <div className="pt-2 border-t border-[#493326]/40 text-[11px] font-mono text-emerald-400">
                Lưu giữ bài bản qua phương thức truyền khẩu
              </div>
            </div>

            {/* Generation 3 */}
            <div className="p-4 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/20 flex flex-col justify-between space-y-3">
              <div>
                <div className="px-2 py-0.5 rounded bg-[#1E3A8A] text-[10px] font-mono text-[#FFF4DB] inline-block mb-2 font-bold">
                  THẾ HỆ III (2003 - NAY)
                </div>
                <h4 className="text-base font-display font-bold text-[#E5C07B]">
                  Nghệ Sĩ Kế Nghiệp & Nhà Hát Cung Đình Huế
                </h4>
                <p className="text-xs text-[#F2E8D5]/80 font-sans mt-2 leading-relaxed">
                  NSƯT Trần Thảo (con trai cố nghệ nhân Trần Kích) cùng tập thể nghệ sĩ Nhà hát Nghệ thuật Truyền thống Cung đình Huế phục dựng bài bản, diễn xướng định kỳ tại Duyệt Thị Đường.
                </p>
              </div>
              <div className="pt-2 border-t border-[#493326]/40 text-[11px] font-mono text-[#C9A45C]">
                Bảo tồn "sống" trong không gian di tích
              </div>
            </div>

            {/* Generation 4 */}
            <div className="p-4 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/20 flex flex-col justify-between space-y-3">
              <div>
                <div className="px-2 py-0.5 rounded bg-emerald-800 text-[10px] font-mono text-[#FFF4DB] inline-block mb-2 font-bold">
                  THẾ HỆ IV (THỜI ĐẠI SỐ)
                </div>
                <h4 className="text-base font-display font-bold text-[#E5C07B]">
                  Giảng Viên, Sinh Viên & Kế Cận Trẻ
                </h4>
                <p className="text-xs text-[#F2E8D5]/80 font-sans mt-2 leading-relaxed">
                  Khoa Âm nhạc Di sản (Học viện Âm nhạc Huế) đào tạo cử nhân chuyên nghiệp, kết hợp ký âm hiện đại, số hóa tư liệu đa phương tiện và ứng dụng bảo tàng số di sản.
                </p>
              </div>
              <div className="pt-2 border-t border-[#493326]/40 text-[11px] font-mono text-[#C9A45C]">
                Số hóa & Đào tạo học thuật chính quy
              </div>
            </div>
          </div>
        </div>

        {/* References Footer Box */}
        <div className="bg-[#12100e] border border-[#C9A45C]/30 p-6 rounded-lg text-xs font-sans">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Tư liệu tham khảo cho chuyên trang Cộng đồng chủ thể:
          </div>
          <p className="text-[#F2E8D5]/70 mb-3">
            Hồ sơ nghệ nhân và chính sách bảo vệ nghệ nhân căn cứ theo dự án bảo vệ Nhã nhạc của UNESCO <sup className="text-[#C9A45C] font-mono">[2]</sup>, Cục Di sản Văn hóa <sup className="text-[#C9A45C] font-mono">[3]</sup>, và ghi chép điền dã của Cố GS.TS Trần Văn Khê <sup className="text-[#C9A45C] font-mono">[10]</sup>.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#493326]/40">
            <Link to="/nguon-tham-khao" className="text-[#C9A45C] hover:text-[#E5C07B] flex items-center gap-1 font-semibold">
              <span>Xem danh mục 10 nguồn tài liệu đầy đủ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link to="/trai-nghiem" className="text-[#E5C07B] hover:underline flex items-center gap-1">
              <span>Tiếp theo: Không gian Trải nghiệm Số</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Artisan Detail Modal (Giai đoạn 5) */}
        <ArtisanDetailModal
          artisan={activeArtisan}
          isOpen={!!activeArtisan}
          onClose={() => setActiveArtisan(null)}
        />
      </main>
    </div>
  );
};
