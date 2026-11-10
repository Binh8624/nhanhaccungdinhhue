import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { FileText, ExternalLink, BookmarkCheck, ShieldCheck, Globe, BookOpen, Layers } from 'lucide-react';
import { REFERENCES_DATA, ReferenceSource } from '../data/heritageData';

export const ReferencesPage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredReferences = REFERENCES_DATA.filter((ref) => {
    if (filterCategory === 'all') return true;
    return ref.category === filterCategory;
  });

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Tư liệu & Nguồn tham khảo' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Hồ sơ Khoa học & Cơ sở Dữ liệu Xác thực
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#FFF4DB]">
            TƯ LIỆU & NGUỒN THAM KHẢO
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Hệ thống 12 nguồn tài liệu khoa học, văn bản điển chế gốc, hồ sơ di sản UNESCO và các bài viết báo chí chính thống được sử dụng và đối chiếu nghiêm ngặt để xây dựng bảo tàng số.
          </p>
        </div>

        {/* Citation Index Guide */}
        <div className="bg-[#493326]/20 border border-[#C9A45C]/30 rounded-lg p-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            <BookmarkCheck className="w-4 h-4 text-[#C9A45C]" />
            <span>Quy ước Ký hiệu Trích dẫn Khoa học trong Website</span>
          </div>
          <p className="text-xs sm:text-sm text-[#F2E8D5]/85 font-sans leading-relaxed">
            Tất cả các sự kiện lịch sử, niên đại, thang âm, danh xưng và thông số trong 10 trang nội dung đều được đánh số dẫn chiếu dạng <code className="text-[#C9A45C] font-mono font-bold">[n]</code> ứng với số thứ tự danh mục tài liệu dưới đây.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-[#493326]/30 border border-[#C9A45C]/30 rounded-lg max-w-2xl mx-auto">
          {[
            { id: 'all', label: 'Tất cả nguồn tài liệu' },
            { id: 'Lịch sử', label: 'Lịch sử & Điển chế' },
            { id: 'Nghiên cứu', label: 'Nghiên cứu Âm nhạc' },
            { id: 'Bảo tồn', label: 'Bảo tồn & UNESCO' },
            { id: 'Địa bàn', label: 'Địa bàn Cố đô' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                filterCategory === tab.id
                  ? 'bg-[#C9A45C] text-[#171513] font-semibold shadow-sm'
                  : 'text-[#F2E8D5]/70 hover:text-[#F2E8D5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List of 10 Verified Sources */}
        <div className="space-y-6">
          {filteredReferences.map((ref) => (
            <div
              key={ref.id}
              className="p-6 sm:p-8 rounded-lg border border-[#C9A45C]/30 bg-[#171513] hover:border-[#C9A45C] transition-all space-y-4 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#493326]/40 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#781F25] text-[#FFF4DB] font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-[#C9A45C]/40">
                    [{ref.citationIndex}]
                  </span>
                  <div>
                    <span className="text-[11px] font-mono text-[#E5C07B] uppercase tracking-wider">
                      {ref.category} {ref.year ? `· ${ref.year}` : ''}
                    </span>
                    <h3 className="text-lg font-display font-bold text-[#FFF4DB]">
                      {ref.organization}
                    </h3>
                  </div>
                </div>

                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C9A45C] hover:text-[#E5C07B] px-3 py-1.5 rounded border border-[#C9A45C]/30 hover:bg-[#781F25]/20 transition-all self-start sm:self-auto shrink-0"
                >
                  <span>Truy cập trang gốc</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-2 font-sans text-xs sm:text-sm">
                <div>
                  <span className="text-[#C9A45C] font-semibold">Tên tài liệu / Văn bản: </span>
                  <span className="text-[#F2E8D5] font-serif italic">{ref.title}</span>
                  {ref.author && (
                    <span className="text-[#F2E8D5]/70"> — Tác giả: {ref.author}</span>
                  )}
                </div>

                <div>
                  <span className="text-[#C9A45C] font-semibold">Đường dẫn liên kết: </span>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E5C07B] hover:underline font-mono text-xs break-all"
                  >
                    {ref.url}
                  </a>
                </div>

                <div className="p-3 rounded border border-[#C9A45C]/20 bg-[#493326]/20 mt-2">
                  <span className="text-[#C9A45C] font-semibold block mb-1">
                    Nội dung website đã sử dụng từ nguồn này:
                  </span>
                  <p className="text-[#F2E8D5]/85 leading-relaxed text-xs">
                    {ref.usedContent}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Distinguishing Content Sources vs Copyright Notice */}
        <div className="border-t border-[#493326]/50 pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans">
          <div className="p-6 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/15 space-y-2">
            <h4 className="font-bold text-[#FFF4DB] text-sm font-display flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
              <span>Chính sách Bản quyền & Văn hóa Phi vật thể</span>
            </h4>
            <p className="text-[#F2E8D5]/80 leading-relaxed">
              Các hình ảnh tư liệu, trích đoạn diễn xướng và tổng phổ bài bản thuộc sở hữu di sản văn hóa phi vật thể của dân tộc Việt Nam, được bảo tồn bởi Trung tâm Bảo tồn Di tích Cố đô Huế và Nhà hát Nghệ thuật Truyền thống Cung đình Huế. Trang web này phục vụ mục đích nghiên cứu học tập, giáo dục phi thương mại.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/15 space-y-2">
            <h4 className="font-bold text-[#FFF4DB] text-sm font-display flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#C9A45C]" />
              <span>Cam kết Tính Xác thực Dữ liệu</span>
            </h4>
            <p className="text-[#F2E8D5]/80 leading-relaxed">
              Tác giả dự án cam kết tuyệt đối không tự bịa đặt niên đại, tên gọi nhạc cụ, danh xưng nghệ nhân hay thông số di tích. Mọi dữ liệu đều được đối chiếu chéo giữa các nguồn tài liệu của UNESCO, Cục Di sản Văn hóa và các công trình khoa học chuyên ngành.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
