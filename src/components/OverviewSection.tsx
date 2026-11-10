import React from 'react';
import { Award, Compass, Scroll, ShieldCheck, BookmarkCheck } from 'lucide-react';

export const OverviewSection: React.FC = () => {
  return (
    <section id="gioi-thieu" className="py-20 bg-[#171513] text-[#F2E8D5] border-b border-[#C9A45C]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C] mb-3">
            <Scroll className="w-4 h-4 text-[#C9A45C]" />
            <span>Chuyên mục I · Khái quát Di sản</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#F2E8D5] tracking-tight">
            TINH HOA ÂM NHẠC BÁC HỌC TRIỀU NGUYỄN
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Nhã nhạc cung đình Huế không chỉ là một hình thức nghệ thuật biểu diễn mà còn là biểu tượng tối thượng của quyền lực vương triều, của trật tự vũ trụ và vẻ đẹp tâm hồn Đại Việt.
          </p>
        </div>

        {/* 2-Column Curatorial Narrative Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left: Deep Curatorial Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-[#C9A45C]/30 bg-[#493326]/20 p-6 sm:p-8 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#781F25]/20 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-2xl font-display font-semibold text-[#E5C07B] mb-3">
                1. Khái niệm “Nhã Nhạc”
              </h3>
              <p className="text-sm sm:text-base text-[#F2E8D5]/90 leading-relaxed font-sans first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#C9A45C]">
                “Nhã nhạc” mang ý nghĩa là thứ âm nhạc tao nhã, thanh tao, chuẩn mực và đoan chính, đối lập hoàn toàn với “tục nhạc” (âm nhạc dân gian thường nhật). Đây là thể loại âm nhạc cung đình chính thống được các triều đại phong kiến Việt Nam sử dụng trong các đại lễ tế tự quốc gia, triều hội và yến ẩm hoàng triều.
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/85 leading-relaxed">
                Được kế thừa từ thời Lý, Trần, Lê và đạt đến đỉnh cao tuyệt đối dưới triều Nguyễn (1802 – 1945), Nhã nhạc cung đình Huế là dòng âm nhạc duy nhất của Việt Nam đạt đến tầm vóc bác học cung đình chuẩn mực về biên chế, tổng phổ và hình thức diễn xướng.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded border border-[#C9A45C]/20 bg-[#171513] hover:border-[#C9A45C]/50 transition-colors">
                <div className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-1">
                  Hệ thống Thang âm
                </div>
                <h4 className="text-base font-display font-bold text-[#F2E8D5] mb-1">
                  Ngũ Cung Phương Đông
                </h4>
                <p className="text-xs text-[#F2E8D5]/75 leading-relaxed">
                  Gồm 5 âm chính: Hò, Xự, Xang, Xê, Cống. Phân lập thành Điệu Khách (Bắc) trang trọng, hào sảng và Điệu Nam uyển chuyển, sâu lắng.
                </p>
              </div>

              <div className="p-5 rounded border border-[#C9A45C]/20 bg-[#171513] hover:border-[#C9A45C]/50 transition-colors">
                <div className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-1">
                  Tính Quy phạm Triều đình
                </div>
                <h4 className="text-base font-display font-bold text-[#F2E8D5] mb-1">
                  Chuẩn mực Điển chế
                </h4>
                <p className="text-xs text-[#F2E8D5]/75 leading-relaxed">
                  Quy định chặt chẽ trong Khâm Định Đại Nam Hội Điển Sự Lệ: từng loại nghi lễ có khúc nhạc riêng, nhạc phục và số lượng nhạc công riêng biệt.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Curatorial UNESCO Plaque & Image */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-lg overflow-hidden border border-[#C9A45C]/40 shadow-2xl">
              <img
                src="/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg"
                alt="Không gian diễn xướng Nhã nhạc tại Duyệt Thị Đường"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-xs font-serif italic text-[#E5C07B]">
                Hình 1. Dàn nhạc biểu diễn bên trong Duyệt Thị Đường – Nhà hát cổ nhất Việt Nam.
              </div>
            </div>

            {/* UNESCO Certification Plaque */}
            <div className="p-6 rounded-lg bg-gradient-to-br from-[#781F25]/40 to-[#493326]/40 border border-[#C9A45C]/50 text-center">
              <div className="inline-flex p-3 rounded-full bg-[#C9A45C]/20 text-[#E5C07B] mb-3">
                <Award className="w-8 h-8 text-[#C9A45C]" />
              </div>
              <div className="text-xs uppercase tracking-widest font-mono text-[#C9A45C] mb-1">
                Dấu mốc Quốc tế Lịch sử
              </div>
              <h4 className="text-xl font-display font-bold text-[#FFF4DB]">
                UNESCO VINH DANH DI SẢN THẾ GIỚI
              </h4>
              <p className="text-xs sm:text-sm text-[#F2E8D5]/90 mt-2 leading-relaxed">
                <strong className="text-[#E5C07B]">7/11/2003:</strong> UNESCO công nhận Nhã nhạc cung đình Huế là <em>Kiệt tác Di sản Truyền khẩu và Phi vật thể của Nhân loại</em>.
              </p>
              <p className="text-xs sm:text-sm text-[#F2E8D5]/80 mt-1 leading-relaxed">
                <strong className="text-[#E5C07B]">Năm 2008:</strong> Chính thức ghi danh vào <em>Danh sách Di sản Văn hóa Phi vật thể Đại diện của Nhân loại</em>.
              </p>
              <div className="mt-4 pt-3 border-t border-[#C9A45C]/30 text-[11px] text-[#F2E8D5]/60 italic">
                “Trong các thể loại âm nhạc cổ truyền ở Việt Nam, chỉ có Nhã nhạc đạt tới tầm vóc quốc gia và được truyền tải qua nhiều thế kỷ với tính chuẩn mực tuyệt đối.” – UNESCO
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Court Life Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded border border-[#C9A45C]/30 bg-[#171513] space-y-3">
            <div className="flex items-center gap-2 text-[#C9A45C]">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-display font-bold text-lg text-[#F2E8D5]">Giá trị Lịch sử</span>
            </div>
            <p className="text-sm text-[#F2E8D5]/80 leading-relaxed font-sans">
              Là bằng chứng sống động minh chứng cho nền văn hiến rực rỡ và nền quân chủ hưng thịnh của dân tộc. Phản ánh quan niệm chính trị, tư tưởng Nho giáo và đạo trị quốc thông qua âm nhạc của các bậc quân vương.
            </p>
          </div>

          <div className="p-6 rounded border border-[#C9A45C]/30 bg-[#171513] space-y-3">
            <div className="flex items-center gap-2 text-[#C9A45C]">
              <Compass className="w-5 h-5" />
              <span className="font-display font-bold text-lg text-[#F2E8D5]">Giá trị Nghệ thuật</span>
            </div>
            <p className="text-sm text-[#F2E8D5]/80 leading-relaxed font-sans">
              Trình độ phối khí điêu luyện giữa bộ gõ kim loại - da trâu, bộ hơi và bộ dây. Cấu trúc phức điệu ngũ cung phong phú và kỹ thuật diễn tấu đạt đỉnh cao tinh hoa của các nhạc sư hoàng triều.
            </p>
          </div>

          <div className="p-6 rounded border border-[#C9A45C]/30 bg-[#171513] space-y-3">
            <div className="flex items-center gap-2 text-[#C9A45C]">
              <BookmarkCheck className="w-5 h-5" />
              <span className="font-display font-bold text-lg text-[#F2E8D5]">Giá trị Văn hóa & Tâm linh</span>
            </div>
            <p className="text-sm text-[#F2E8D5]/80 leading-relaxed font-sans">
              Chiếc cầu nối linh thiêng giữa con người với trời đất (trong lễ Tế Giao) và đạo hiếu nhớ ơn tiên tổ (trong lễ Tế Miếu). Gìn giữ hồn cốt cố đô Huế qua từng làn điệu bất tử.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
