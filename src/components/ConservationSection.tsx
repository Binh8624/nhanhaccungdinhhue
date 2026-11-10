import React from 'react';
import { Shield, Sparkles, BookOpen, Laptop, Users, GraduationCap, Target } from 'lucide-react';

export const ConservationSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#171513] text-[#F2E8D5] border-b border-[#C9A45C]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C] mb-3">
            <Shield className="w-4 h-4 text-[#C9A45C]" />
            <span>Chuyên mục VIII · Trách Nhiệm Thế Hệ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#F2E8D5] tracking-tight">
            BẢO TỒN & PHÁT HUY GIÁ TRỊ DI SẢN
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Giữ gìn Nhã nhạc không phải là đóng băng quá khứ mà là thắp sáng ngọn lửa di sản trong hơi thở của thời đại số, để âm vang cố đô mãi trường tồn cùng non sông.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/15 hover:border-[#C9A45C] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#781F25]/30 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] mb-4">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-[#E5C07B] mb-2">
                1. Số Hóa Di Sản
              </h3>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed font-sans">
                Thu âm, ghi hình chuẩn 4K các buổi diễn xướng; xây dựng cơ sở dữ liệu số hóa tổng phổ bản nhạc cổ chữ Hán Nôm và chuyển soạn ký âm hiện đại.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-[#493326]/40 text-[11px] text-[#C9A45C] font-mono">
              Lưu trữ vĩnh cửu đa phương tiện
            </div>
          </div>

          <div className="p-6 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/15 hover:border-[#C9A45C] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#781F25]/30 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-[#E5C07B] mb-2">
                2. Đào Tạo & Truyền Nghề
              </h3>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed font-sans">
                Kết hợp phương thức truyền ngón "hò xự xang" trực tiếp của nghệ nhân với chương trình đào tạo đại học chính quy tại Học viện Âm nhạc Huế.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-[#493326]/40 text-[11px] text-[#C9A45C] font-mono">
              Bồi đắp lớp nhạc công kế cận
            </div>
          </div>

          <div className="p-6 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/15 hover:border-[#C9A45C] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#781F25]/30 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-[#E5C07B] mb-2">
                3. Gắn Với Đời Sống
              </h3>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed font-sans">
                Tổ chức biểu diễn phục vụ công chúng tại các kỳ Festival Huế định kỳ; đưa Nhã nhạc vào các chương trình ngoại khóa và du lịch trải nghiệm di sản.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-[#493326]/40 text-[11px] text-[#C9A45C] font-mono">
              Sức sống trong lòng cộng đồng
            </div>
          </div>

          <div className="p-6 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/15 hover:border-[#C9A45C] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#781F25]/30 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-[#E5C07B] mb-2">
                4. Quảng Bá Quốc Tế
              </h3>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed font-sans">
                Đưa đoàn Nhã nhạc lưu diễn tại Pháp, Nhật Bản, Hàn Quốc, Mỹ... khẳng định vị thế đỉnh cao của âm nhạc cung đình Việt Nam trên vũ đài thế giới.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-[#493326]/40 text-[11px] text-[#C9A45C] font-mono">
              Hội nhập & Khẳng định bản sắc
            </div>
          </div>
        </div>

        {/* Proposals for Youth Engagement */}
        <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-3">
            <Target className="w-4 h-4 text-[#C9A45C]" />
            <span>Đề xuất Sáng kiến Hành động</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#FFF4DB] mb-6">
            GỢI Ý HOẠT ĐỘNG DÀNH CHO HỌC SINH, SINH VIÊN & GIỚI TRẺ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="p-5 rounded border border-[#C9A45C]/20 bg-[#493326]/20 space-y-2">
              <div className="font-bold text-[#E5C07B] text-base">
                1. Câu lạc bộ Di sản Giới trẻ
              </div>
              <p className="text-xs text-[#F2E8D5]/80 leading-relaxed">
                Thành lập CLB "Thanh âm Cố đô" trong các trường THPT và Đại học để tổ chức các buổi tọa đàm, lắng nghe nghệ nhân chia sẻ chuyện đời chuyện nghề.
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
                Sản xuất podcast ngắn, video tư liệu trải nghiệm, infographic kể chuyện lịch sử Nhã nhạc để tiếp cận người trẻ một cách gần gũi, văn minh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
