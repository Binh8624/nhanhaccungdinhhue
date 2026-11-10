import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { Shield, Laptop, GraduationCap, Users, Sparkles, Target, ExternalLink, ArrowRight, AlertTriangle } from 'lucide-react';

export const ConservationPage: React.FC = () => {
  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Bảo tồn Di sản' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Chuyên trang Trách nhiệm Thế hệ & Phát huy Giá trị
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#FFF4DB]">
            BẢO TỒN & PHÁT HUY DI SẢN
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Giữ gìn Nhã nhạc không phải là đóng băng quá khứ mà là thắp sáng ngọn lửa di sản trong dòng chảy đương đại, để âm vang Cố đô sống mãi cùng non sông đất nước <sup className="text-[#C9A45C] font-mono">[2],[8]</sup>.
          </p>
        </div>

        {/* 1. TẦM QUAN TRỌNG & THÁCH THỨC HIỆN NAY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Importance */}
          <div className="p-6 sm:p-8 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/15 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#C9A45C]">
                <Shield className="w-5 h-5" />
                <h2 className="text-xl font-display font-bold text-[#FFF4DB]">
                  Tầm quan trọng sống còn của việc bảo tồn
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#F2E8D5]/85 leading-relaxed font-sans">
                Nhã nhạc là thể loại âm nhạc cung đình duy nhất của Việt Nam đạt tầm bác học, là tấm gương phản chiếu bản sắc văn hiến và chủ quyền quốc gia qua nhiều thế kỷ. Mất đi Nhã nhạc là mất đi một phần linh hồn của lịch sử dân tộc <sup className="text-[#C9A45C] font-mono">[1]</sup>.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#493326]/40 text-xs font-mono text-[#E5C07B]">
              Công ước UNESCO 2003 về bảo vệ di sản phi vật thể
            </div>
          </div>

          {/* Challenges */}
          <div className="p-6 sm:p-8 rounded-lg border border-amber-900/40 bg-amber-950/20 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-5 h-5" />
                <h2 className="text-xl font-display font-bold text-amber-300">
                  Những thách thức và nguy cơ mai một
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#F2E8D5]/85 leading-relaxed font-sans">
                Các nghệ nhân thế hệ vàng đã lần lượt qua đời; ký âm cổ chữ Hán Nôm đòi hỏi chuyên môn uyên thâm; đời sống kinh tế thị trường tạo áp lực lớn lên thu nhập của nhạc công trẻ; nguy cơ biểu diễn bị sân khấu hóa, thương mại hóa làm mất đi tính chuẩn mực cổ truyền <sup className="text-[#C9A45C] font-mono">[2],[3]</sup>.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-900/40 text-xs font-mono text-amber-400">
              Cảnh báo nguy cơ đứt gãy truyền thừa
            </div>
          </div>
        </div>

        {/* 2. 4 TRỤ CỘT CHIẾN LƯỢC BẢO TỒN */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-display font-bold text-[#E5C07B]">
              4 TRỤ CỘT BẢO TỒN TOÀN DIỆN
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg border border-[#C9A45C]/30 bg-[#171513] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#781F25]/30 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C]">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-[#FFF4DB]">
                1. Số Hóa Đa Phương Tiện
              </h4>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed font-sans">
                Thu âm, ghi hình chuẩn 4K các buổi diễn xướng; xây dựng bảo tàng số 3D, số hóa tổng phổ Hán Nôm và chuyển soạn ký âm quốc tế <sup className="text-[#C9A45C] font-mono">[2]</sup>.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#C9A45C]/30 bg-[#171513] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#781F25]/30 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-[#FFF4DB]">
                2. Đào Tạo & Kế Thừa
              </h4>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed font-sans">
                Kết hợp lối dạy truyền ngón trực tiếp của nghệ nhân với chương trình đào tạo cử nhân chính quy tại Học viện Âm nhạc Huế <sup className="text-[#C9A45C] font-mono">[3]</sup>.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#C9A45C]/30 bg-[#171513] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#781F25]/30 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C]">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-[#FFF4DB]">
                3. Gắn Liền Đời Sống
              </h4>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed font-sans">
                Đưa Nhã nhạc vào các kỳ Festival Huế định kỳ, kết hợp du lịch trải nghiệm di sản bền vững tại Duyệt Thị Đường và Hoàng thành Huế <sup className="text-[#C9A45C] font-mono">[4]</sup>.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#C9A45C]/30 bg-[#171513] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#781F25]/30 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-[#FFF4DB]">
                4. Quảng Bá Quốc Tế
              </h4>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed font-sans">
                Lưu diễn tại các liên hoan âm nhạc truyền thống thế giới (Pháp, Nhật Bản, Hàn Quốc...), khẳng định vị thế đỉnh cao của âm nhạc Việt Nam <sup className="text-[#C9A45C] font-mono">[7]</sup>.
              </p>
            </div>
          </div>
        </div>

        {/* 3. ĐỀ XUẤT SÁNG KIẾN CHO GIỚI TRẺ */}
        <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-3">
            <Target className="w-4 h-4 text-[#C9A45C]" />
            <span>Sáng kiến Hành động cho Giới trẻ</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#FFF4DB] mb-6">
            ĐỀ XUẤT HOẠT ĐỘNG CHO HỌC SINH, SINH VIÊN
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="p-5 rounded border border-[#C9A45C]/20 bg-[#493326]/20 space-y-2">
              <div className="font-bold text-[#E5C07B] text-base">
                1. Câu lạc bộ Di sản Học đường
              </div>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed">
                Thành lập CLB "Thanh âm Cố đô" trong các trường THPT và Đại học để tổ chức tọa đàm, lắng nghe nghệ nhân chia sẻ chuyện đời chuyện nghề.
              </p>
            </div>

            <div className="p-5 rounded border border-[#C9A45C]/20 bg-[#493326]/20 space-y-2">
              <div className="font-bold text-[#E5C07B] text-base">
                2. Workshop Trải nghiệm Nhạc khí
              </div>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed">
                Tổ chức các lớp học thử đánh trống bản, gõ phách tiền, bấm phím đàn tỳ bà để thế hệ trẻ tự mình cảm nhận độ rung cảm tinh tế của nhạc cụ cổ truyền.
              </p>
            </div>

            <div className="p-5 rounded border border-[#C9A45C]/20 bg-[#493326]/20 space-y-2">
              <div className="font-bold text-[#E5C07B] text-base">
                3. Sáng tạo Nội dung Số Di sản
              </div>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed">
                Sản xuất podcast ngắn, video tư liệu trải nghiệm, website bảo tàng số tương tác để kể câu chuyện Nhã nhạc bằng ngôn ngữ công nghệ hiện đại.
              </p>
            </div>
          </div>
        </div>

        {/* References Footer Box */}
        <div className="bg-[#12100e] border border-[#C9A45C]/30 p-6 rounded-lg text-xs font-sans">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Tư liệu tham khảo cho chuyên trang Bảo tồn di sản:
          </div>
          <p className="text-[#F2E8D5]/70 mb-3">
            Kế hoạch bảo vệ dựa trên <em>Dự án Bảo vệ Nhã nhạc</em> của UNESCO <sup className="text-[#C9A45C] font-mono">[2]</sup> và chính sách kiểm kê bảo tồn của Cục Di sản Văn hóa <sup className="text-[#C9A45C] font-mono">[3]</sup>.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#493326]/40">
            <Link to="/nguon-tham-khao" className="text-[#C9A45C] hover:text-[#E5C07B] flex items-center gap-1 font-semibold">
              <span>Xem danh mục 10 nguồn tài liệu đầy đủ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link to="/kham-pha" className="text-[#E5C07B] hover:underline flex items-center gap-1">
              <span>Tiếp theo: Tham gia Góc Khám phá & Trắc nghiệm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
