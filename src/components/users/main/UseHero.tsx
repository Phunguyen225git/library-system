// src/app/dashboard/components/UserHero.tsx
"use client";

import { Search, Sparkles, BookOpen, BookmarkCheck } from "lucide-react";

interface UserHeroProps {
  onSearch: (value: string) => void;
}

export default function UserHero({ onSearch }: UserHeroProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-slate-800">
      {/* Khối decor làm mờ hình nền lập trình tạo chiều sâu */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10 z-0">
        <BookOpen className="w-80 h-80" />
      </div>

      <div className="max-w-2xl relative z-10 space-y-4">
        {/* Badge tiêu đề nhỏ */}
        <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-400" /> Hệ thống Không gian số
          Thư viện 2026
        </span>

        {/* Dòng giật tít chính */}
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          Chào mừng bạn quay trở lại! <br />
          <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Hôm nay bạn muốn đọc gì?
          </span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
          Tìm kiếm nhanh trong kho hơn 10,000 đầu sách. Chỉ cần thêm những cuốn
          sách bạn cần vào giỏ hàng và gửi yêu cầu, thủ thư sẽ chuẩn bị sẵn sách
          tại quầy chờ bạn đến lấy.
        </p>

        {/* 🔍 Thanh tìm kiếm thời gian thực (Real-time Search Bar) */}
        <div className="mt-6 relative max-w-md group">
          <div className="absolute left-4 top-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Nhập tên sách, tác giả hoặc thể loại cần tìm..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/5 backdrop-blur-md border border-slate-700/60 rounded-2xl text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:text-slate-900 transition-all text-xs font-semibold shadow-inner"
          />

          {/* Badge gợi ý phím tắt nhỏ ở đuôi thanh tìm kiếm */}
          <div className="absolute right-3 top-3 hidden sm:flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700 text-[10px] text-slate-400 font-bold group-focus-within:hidden">
            <BookmarkCheck className="w-3 h-3 text-indigo-400" /> Sách thực tế
          </div>
        </div>
      </div>
    </div>
  );
}
