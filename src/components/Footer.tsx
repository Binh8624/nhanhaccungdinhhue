import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Award, BookCheck, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#12100e] text-[#F2E8D5] border-t border-[#C9A45C]/30 pt-16 pb-12 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#493326]/60">
          {/* Col 1: Identity & Location */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#C9A45C]/60 flex items-center justify-center bg-[#781F25]/60">
                <Landmark className="w-5 h-5 text-[#C9A45C]" />
              </div>
              <span className="font-royal text-lg font-bold tracking-wider text-[#C9A45C]">
                NHÃ NHẠC CUNG ĐÌNH HUẾ
              </span>
            </Link>
            <p className="text-sm font-display italic text-[#E5C07B]">
              “Âm vang nghìn năm – Hồn thiêng cố đô”
            </p>
            <p className="text-xs text-[#F2E8D5]/70 leading-relaxed">
              Bảo tàng số di sản văn hóa phi vật thể đại diện của nhân loại. Tôn vinh vẻ đẹp của nền âm nhạc bác học cổ truyền triều Nguyễn và lan tỏa tình yêu di sản dân tộc đến thế hệ trẻ.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C9A45C] font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Thành phố Huế, tỉnh Thừa Thiên Huế · Bắc Trung Bộ, Việt Nam</span>
            </div>
          </div>

          {/* Col 2: Author Information (MANDATORY per brief) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C9A45C]" />
              <span>Thông tin Tác giả & Đề tài Dự án</span>
            </div>
            <div className="p-4 rounded-lg border border-[#C9A45C]/30 bg-[#171513] space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#493326]/40">
                <span className="text-[#F2E8D5]/60">Họ và tên:</span>
                <span className="font-bold text-[#FFF4DB]">Trần Thanh Bình</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#493326]/40">
                <span className="text-[#F2E8D5]/60">Mã sinh viên (MSSV):</span>
                <span className="font-mono text-[#E5C07B] font-bold">PH61165</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#493326]/40">
                <span className="text-[#F2E8D5]/60">Lớp / Mã ý tưởng:</span>
                <span className="font-mono text-[#E5C07B] font-bold">D02</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#493326]/40">
                <span className="text-[#F2E8D5]/60">Khu vực nghiên cứu:</span>
                <span className="text-[#FFF4DB]">Bắc Trung Bộ</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#F2E8D5]/60">Địa bàn trọng tâm:</span>
                <span className="text-[#FFF4DB]">Thành phố Huế, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Col 3: Multi-Page Quick Navigation Links */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] font-semibold flex items-center gap-2">
              <BookCheck className="w-4 h-4 text-[#C9A45C]" />
              <span>Hệ thống 14 Không gian Bảo tàng Số</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#F2E8D5]/70">
              <Link to="/" className="hover:text-[#C9A45C] transition-colors">1. Trang chủ</Link>
              <Link to="/gioi-thieu" className="hover:text-[#C9A45C] transition-colors">2. Giới thiệu di sản</Link>
              <Link to="/lich-su" className="hover:text-[#C9A45C] transition-colors">3. Lịch sử</Link>
              <Link to="/nhac-cu" className="hover:text-[#C9A45C] transition-colors">4. Nhạc cụ</Link>
              <Link to="/bieu-dien" className="hover:text-[#C9A45C] transition-colors">5. Loại hình biểu diễn</Link>
              <Link to="/dia-ban" className="hover:text-[#C9A45C] transition-colors">6. Địa bàn di sản</Link>
              <Link to="/chu-the" className="hover:text-[#C9A45C] transition-colors">7. Cộng đồng chủ thể</Link>
              <Link to="/trai-nghiem" className="hover:text-[#C9A45C] transition-colors">8. Trải nghiệm số</Link>
              <Link to="/bao-ton" className="hover:text-[#C9A45C] transition-colors">9. Bảo tồn di sản</Link>
              <Link to="/kham-pha" className="hover:text-[#C9A45C] transition-colors">10. Góc khám phá (4 Game)</Link>
              <Link to="/hanh-trinh-nhap-vai" className="hover:text-[#C9A45C] transition-colors text-[#E5C07B]">12. Hành trình nhập vai</Link>
              <Link to="/kho-luu-tru" className="hover:text-[#C9A45C] transition-colors">13. Kho lưu trữ di sản</Link>
              <Link to="/huong-dan-vien-ai" className="hover:text-[#C9A45C] transition-colors">14. AI Hướng dẫn viên</Link>
              <Link to="/nguon-tham-khao" className="col-span-2 text-[#E5C07B] hover:underline font-semibold mt-1">
                11. Tư liệu & Nguồn tham khảo (10 nguồn) →
              </Link>
            </div>
          </div>
        </div>

        {/* BẢNG PHÂN LOẠI & MINH BẠCH HỆ THỐNG DI SẢN SỐ */}
        <div className="my-8 p-4 rounded-lg border border-[#C9A45C]/25 bg-[#171513]/80 space-y-2 text-xs font-sans">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#E5C07B] font-semibold pb-1.5 border-b border-[#493326]/50 flex items-center justify-between">
            <span>BẢNG PHÂN LOẠI & MINH BẠCH HỆ THỐNG (SYSTEM TRANSPARENCY)</span>
            <span className="text-[#C9A45C]">Thành phố Huế, Việt Nam</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px] text-[#F2E8D5]/80 pt-1">
            <div className="p-2.5 rounded bg-[#493326]/20 border border-[#C9A45C]/15">
              <span className="font-semibold text-emerald-400 block mb-0.5">● Dữ liệu lịch sử đã xác thực:</span>
              Khâm Định triều Nguyễn, UNESCO (2003, 2008), Cục Di sản Văn hóa, Báo Pháp Luật TP.HCM (2016), Báo Tuổi Trẻ (2010).
            </div>
            <div className="p-2.5 rounded bg-[#493326]/20 border border-[#C9A45C]/15">
              <span className="font-semibold text-[#E5C07B] block mb-0.5">● Dữ liệu nội bộ bảo tàng:</span>
              Khung cấu trúc triển lãm và hồ sơ số hóa do tác giả Trần Thanh Bình (PH61165 - Lớp D02) biên soạn cho đồ án.
            </div>
            <div className="p-2.5 rounded bg-[#493326]/20 border border-[#C9A45C]/15">
              <span className="font-semibold text-amber-300 block mb-0.5">● Mô phỏng tương tác:</span>
              Phòng hòa tấu đa bè và phím ngũ cung chạy thuật toán tổng hợp sóng âm Web Audio API, không phải bản thu đĩa than gốc.
            </div>
            <div className="p-2.5 rounded bg-[#493326]/20 border border-[#C9A45C]/15">
              <span className="font-semibold text-cyan-300 block mb-0.5">● Tính năng mở rộng backend:</span>
              Đóng góp tư liệu điền dã và bình luận tương tác được chuẩn bị kiến trúc để tích hợp cơ sở dữ liệu khi mở rộng.
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F2E8D5]/50 gap-4">
          <div>
            © {new Date().getFullYear()} Nhã nhạc Cung đình Huế · Bảo tàng Di sản Số. Tác giả: Trần Thanh Bình (PH61165 - Lớp D02).
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Kiệt tác UNESCO 2003</span>
            <span>·</span>
            <span>Di sản Đại diện 2008</span>
            <span>·</span>
            <span>Thành phố Huế, Việt Nam</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
