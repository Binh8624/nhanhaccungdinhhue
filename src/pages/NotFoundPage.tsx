import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, ArrowLeft, Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-[75vh] flex items-center justify-center px-4 py-16 font-sans">
      <div className="max-w-xl w-full text-center space-y-6 border border-[#C9A45C]/40 bg-[#493326]/15 rounded-xl p-8 sm:p-12 shadow-2xl relative">
        <div className="w-16 h-16 rounded-full bg-[#781F25]/40 border border-[#C9A45C] flex items-center justify-center mx-auto text-[#C9A45C]">
          <Landmark className="w-8 h-8" />
        </div>

        <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
          Thông Báo Điều Hướng · Mã 404
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#FFF4DB]">
          KHÔNG GIAN CHƯA KHAI MỞ
        </h1>

        <p className="text-sm text-[#F2E8D5]/80 leading-relaxed max-w-md mx-auto">
          Đường dẫn quý khách đang tìm kiếm không tồn tại hoặc đã được chuyển dời trong sơ đồ bảo tàng di sản số. Vui lòng quay lại sảnh chính để tiếp tục hành trình khám phá.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] rounded transition-all shadow"
          >
            <Home className="w-4 h-4 text-[#171513]" />
            <span>Về Trang Chủ</span>
          </Link>
          <Link
            to="/gioi-thieu"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F2E8D5] border border-[#C9A45C]/40 hover:bg-[#781F25]/30 rounded transition-all"
          >
            <Compass className="w-4 h-4 text-[#C9A45C]" />
            <span>Xem Giới Thiệu Di Sản</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
