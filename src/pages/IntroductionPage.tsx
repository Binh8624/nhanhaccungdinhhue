import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { BookOpen, Award, ArrowRight, ShieldCheck, Compass, BookmarkCheck, ExternalLink } from 'lucide-react';

export const IntroductionPage: React.FC = () => {
  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Giới thiệu Di sản' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Editorial Magazine Style Header */}
        <div className="border-b border-[#C9A45C]/30 pb-12 text-center max-w-4xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-3">
            Chuyên trang Nghiên cứu Văn hóa Cung đình
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#FFF4DB] leading-tight">
            TINH HOA ÂM NHẠC BÁC HỌC TRIỀU NGUYỄN
          </h1>
          <p className="mt-4 text-base sm:text-lg font-serif italic text-[#E5C07B]">
            “Biểu tượng đỉnh cao của nền quân chủ, trật tự vũ trụ và bản sắc Đại Việt”
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-[#F2E8D5]/60">
            <span>Dẫn luận nghiên cứu</span>
            <span>·</span>
            <span>Trần Thanh Bình (PH61165)</span>
            <span>·</span>
            <span>Hồ sơ UNESCO 2003 & 2008</span>
          </div>
        </div>

        {/* 1. KHÁI NIỆM & NGUỒN GỐC (BỐ CỤC TẠP CHÍ) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base font-sans leading-relaxed">
            <div className="p-6 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/15">
              <h2 className="text-2xl font-display font-bold text-[#E5C07B] mb-3">
                1. Nhã nhạc cung đình Huế là gì?
              </h2>
              <p className="text-[#F2E8D5]/90 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#C9A45C]">
                “Nhã nhạc” mang ý nghĩa là thứ âm nhạc tao nhã, thanh tao, chuẩn mực và đoan chính, đối lập hoàn toàn với “tục nhạc” (âm nhạc dân gian thường nhật) <sup className="text-[#C9A45C] font-mono">[1]</sup>. Đây là thể loại âm nhạc cung đình chính thống được các triều đại phong kiến Việt Nam sử dụng trong các đại lễ tế tự quốc gia, triều hội và yến tiệc hoàng gia.
              </p>
              <p className="mt-3 text-[#F2E8D5]/80">
                Nhã nhạc không chỉ đơn thuần là giai điệu giải trí, mà là một thành tố cốt lõi của điển chế vương triều, phản ánh trật tự kỷ cương phong kiến và sự hòa hợp giữa Thiên – Địa – Nhân (Trời – Đất – Người) theo quan niệm triết học phương Đông <sup className="text-[#C9A45C] font-mono">[9]</sup>.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold text-[#F2E8D5] mb-2">
                2. Nguồn gốc & Quá trình hình thành
              </h3>
              <p className="text-[#F2E8D5]/85">
                Nhã nhạc Việt Nam có mầm mống từ thời Lý (thế kỷ XI), định hình quy chế Đường thượng chi nhạc và Đình hạ chi nhạc dưới triều Hậu Lê (thế kỷ XV với công lao của đại thần Lương Đăng), tiếp tục được các chúa Nguyễn bồi đắp tại xứ Đàng Trong và đạt đến đỉnh cao tuyệt đối dưới triều Nguyễn (1802 – 1945) tại Cố đô Huế <sup className="text-[#C9A45C] font-mono">[3]</sup>.
              </p>
            </div>
          </div>

          {/* Right: Featured Photo & Curatorial Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-lg overflow-hidden border border-[#C9A45C]/40 shadow-2xl">
              <img
                src="/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg"
                alt="Nhà hát Duyệt Thị Đường Đại Nội Huế"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-xs font-serif italic text-[#E5C07B]">
                Ảnh: Không gian diễn xướng Nhã nhạc bên trong Nhà hát hoàng gia Duyệt Thị Đường.
              </div>
            </div>

            {/* UNESCO Box */}
            <div className="p-6 rounded-lg bg-gradient-to-br from-[#781F25]/40 to-[#493326]/40 border border-[#C9A45C]/50 text-center">
              <Award className="w-8 h-8 text-[#C9A45C] mx-auto mb-2" />
              <div className="text-xs uppercase tracking-widest font-mono text-[#C9A45C]">
                Dấu ấn UNESCO
              </div>
              <h4 className="text-lg font-display font-bold text-[#FFF4DB] mt-1">
                KIỆT TÁC DI SẢN PHI VẬT THỂ THẾ GIỚI
              </h4>
              <p className="text-xs text-[#F2E8D5]/85 mt-2 leading-relaxed">
                Được UNESCO vinh danh năm <strong>2003</strong> và ghi danh vào Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại năm <strong>2008</strong> <sup className="text-[#C9A45C] font-mono">[1]</sup>.
              </p>
            </div>
          </div>
        </div>

        {/* 2. ĐẶC ĐIỂM NGHỆ THUẬT & THANG ÂM */}
        <div className="border-t border-[#493326]/50 pt-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#E5C07B] mb-6">
            3. Đặc điểm Nghệ thuật Bác học
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs sm:text-sm">
            <div className="p-5 rounded border border-[#C9A45C]/30 bg-[#171513] space-y-2">
              <h4 className="font-bold text-[#FFF4DB] text-base font-display">
                Thang âm Ngũ cung
              </h4>
              <p className="text-[#F2E8D5]/80 leading-relaxed">
                Xây dựng trên 5 bậc âm cơ bản: <strong>Hò – Xự – Xang – Xê – Cống</strong> <sup className="text-[#C9A45C] font-mono">[10]</sup>. <em>Lưu ý học thuật:</em> Đây là hệ thống quan hệ bậc âm tương đối trong âm luật truyền thống, không đồng nhất tuyệt đối với hệ thống bình quân luật phương Tây (Do, Re, Fa, Sol, La). Tùy theo hai điệu thức nòng cốt là <strong>Điệu Khách (Bắc)</strong> trang trọng hay <strong>Điệu Nam</strong> sâu lắng, nghệ nhân sử dụng kỹ thuật nhấn nhá, rung, vuốt để tạo nên các vi âm (microtones) độc đáo mang đậm phong vị xứ Cố đô.
              </p>
            </div>

            <div className="p-5 rounded border border-[#C9A45C]/30 bg-[#171513] space-y-2">
              <h4 className="font-bold text-[#FFF4DB] text-base font-display">
                Tính Quy phạm Triều đình
              </h4>
              <p className="text-[#F2E8D5]/80 leading-relaxed">
                Được quy định nghiêm ngặt trong <em>Khâm Định Đại Nam Hội Điển Sự Lệ</em> <sup className="text-[#C9A45C] font-mono">[9]</sup>. Từng nghi thức tế tự (Giao, Miếu, Triều) đều có quy định chi tiết về số lượng nhạc công, trang phục và danh mục bài bản riêng biệt.
              </p>
            </div>

            <div className="p-5 rounded border border-[#C9A45C]/30 bg-[#171513] space-y-2">
              <h4 className="font-bold text-[#FFF4DB] text-base font-display">
                Nghệ thuật Phối khí Đỉnh cao
              </h4>
              <p className="text-[#F2E8D5]/80 leading-relaxed">
                Sự hòa hợp điêu luyện giữa nhạc khí gõ (trống chiến, trống bản, tam âm la, bạt), nhạc khí hơi (kèn bầu, sáo trúc) và nhạc khí dây (tỳ bà, nguyệt, tranh, nhị), tạo nên dải âm lượng phong phú.
              </p>
            </div>
          </div>
        </div>

        {/* 3. VAI TRÒ TRONG ĐIỂN LỄ & VỊ TRÍ VĂN HÓA */}
        <div className="border-t border-[#493326]/50 pt-12 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#E5C07B]">
            4. Vai trò trong Nghi lễ Cung đình & Vị trí Văn hóa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded border border-[#C9A45C]/30 bg-[#493326]/20 space-y-3">
              <div className="flex items-center gap-2 text-[#C9A45C]">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-display font-bold text-lg text-[#F2E8D5]">Giá trị Lịch sử</span>
              </div>
              <p className="text-xs sm:text-sm text-[#F2E8D5]/80 leading-relaxed font-sans">
                Là bằng chứng sống động minh chứng cho nền văn hiến rực rỡ và chủ quyền quốc gia của vương triều độc lập. Phản ánh quan niệm chính trị và đạo trị quốc thông qua âm nhạc <sup className="text-[#C9A45C] font-mono">[1]</sup>.
              </p>
            </div>

            <div className="p-6 rounded border border-[#C9A45C]/30 bg-[#493326]/20 space-y-3">
              <div className="flex items-center gap-2 text-[#C9A45C]">
                <Compass className="w-5 h-5" />
                <span className="font-display font-bold text-lg text-[#F2E8D5]">Giá trị Nghệ thuật</span>
              </div>
              <p className="text-xs sm:text-sm text-[#F2E8D5]/80 leading-relaxed font-sans">
                Thể loại âm nhạc duy nhất của Việt Nam đạt tầm bác học cung đình với hệ thống mười bản ngự liên hoàn mẫu mực và kỹ thuật diễn tấu tinh hoa của các nhạc sư hoàng triều <sup className="text-[#C9A45C] font-mono">[10]</sup>.
              </p>
            </div>

            <div className="p-6 rounded border border-[#C9A45C]/30 bg-[#493326]/20 space-y-3">
              <div className="flex items-center gap-2 text-[#C9A45C]">
                <BookmarkCheck className="w-5 h-5" />
                <span className="font-display font-bold text-lg text-[#F2E8D5]">Vị trí trong Văn hóa Việt</span>
              </div>
              <p className="text-xs sm:text-sm text-[#F2E8D5]/80 leading-relaxed font-sans">
                Cầu nối linh thiêng giữa âm nhạc hàn lâm hoàng gia và âm nhạc dân gian xứ Huế (ca Huế, nhạc thính phòng, nhạc lễ Phật giáo), góp phần định vị bản sắc dân tộc trên bản đồ thế giới <sup className="text-[#C9A45C] font-mono">[7]</sup>.
              </p>
            </div>
          </div>
        </div>

        {/* 4. MỤC TÀI LIỆU THAM KHẢO LIÊN QUAN TRANG NÀY & LIÊN KẾT */}
        <div className="border-t border-[#C9A45C]/30 pt-8 mt-12 bg-[#12100e] p-6 rounded-lg">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-3">
            Tài liệu tham khảo trích dẫn cho trang này:
          </div>
          <ul className="text-xs text-[#F2E8D5]/70 space-y-1 font-sans">
            <li><strong>[1]</strong> UNESCO – Nha Nhac, Vietnamese Court Music (2008 / 2003).</li>
            <li><strong>[3]</strong> Cục Di sản Văn hóa – Hồ sơ di sản văn hóa phi vật thể Nhã nhạc cung đình Huế.</li>
            <li><strong>[7]</strong> Cục Du lịch Quốc gia Việt Nam – Nhã nhạc cung đình Huế, đỉnh cao âm nhạc truyền thống.</li>
            <li><strong>[9]</strong> Quốc Sử Quán Triều Nguyễn – Khâm Định Đại Nam Hội Điển Sự Lệ.</li>
            <li><strong>[10]</strong> Cố GS.TS Trần Văn Khê – Công trình nghiên cứu âm nhạc truyền thống Việt Nam.</li>
          </ul>
          <div className="mt-4 pt-3 border-t border-[#493326]/40 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/nguon-tham-khao"
              className="text-xs font-semibold text-[#C9A45C] hover:text-[#E5C07B] flex items-center gap-1"
            >
              <span>Xem đầy đủ danh mục nguồn tham khảo & liên kết gốc</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <div className="flex gap-4">
              <Link to="/lich-su" className="text-xs text-[#E5C07B] hover:underline">
                Tiếp theo: Xem Dòng chảy Lịch sử →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
