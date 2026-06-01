// src/app/dashboard/components/LibraryAnnouncements.tsx
import { Megaphone, Calendar, ChevronRight } from "lucide-react";

export default function LibraryAnnouncements() {
  const notices = [
    {
      id: 1,
      tag: "Sự kiện",
      title: "Ngày hội đổi sách cũ lấy cây xanh diễn ra vào Chủ Nhật tuần này",
      date: "28/05/2026",
      hot: true,
    },
    {
      id: 2,
      tag: "Thông báo",
      title: "Bảo trì hệ thống máy chủ MariaDB và Core API từ 23h đến 2h sáng",
      date: "26/05/2026",
      hot: false,
    },
    {
      id: 3,
      tag: "Nội quy",
      title:
        "Cập nhật mức phạt trả quá hạn mới áp dụng từ tháng sau (5,000đ/ngày)",
      date: "20/05/2026",
      hot: false,
    },
  ];

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-4 border-b pb-3">
        <div className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-indigo-600" />
          <h3 className="font-black text-gray-800 tracking-tight">
            📢 Bảng tin thư viện
          </h3>
        </div>
        <button className="text-xs font-bold text-indigo-600 hover:underline flex items-center">
          Tất cả thông báo <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all gap-2 border border-dashed border-gray-100"
          >
            <div className="flex items-start sm:items-center gap-3">
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  notice.tag === "Sự kiện"
                    ? "bg-purple-100 text-purple-700"
                    : notice.tag === "Nội quy"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {notice.tag}
              </span>
              <p className="text-sm font-semibold text-gray-700 line-clamp-1 hover:text-indigo-600 cursor-pointer">
                {notice.title}{" "}
                {notice.hot && (
                  <span className="text-rose-500 animate-pulse text-xs font-bold">
                    🔥 Mới
                  </span>
                )}
              </p>
            </div>
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1 shrink-0">
              <Calendar className="w-3.5 h-3.5" /> {notice.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
