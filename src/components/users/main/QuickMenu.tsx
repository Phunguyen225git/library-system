// src/app/dashboard/components/QuickMenu.tsx
import {
  QrCode,
  BookOpenCheck,
  Bookmark,
  Headset,
  History,
} from "lucide-react";
import Link from "next/link";

export default function QuickMenu() {
  const menus = [
    {
      title: "Thẻ thư viện QR",
      desc: "Xuất trình khi nhận sách",
      icon: QrCode,
      href: "/user/membership",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Lịch sử mượn trả",
      desc: "Kiểm tra hạn trả sách",
      icon: History,
      href: "/user/history",
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Gia hạn sách",
      desc: "Xin thêm thời gian đọc",
      icon: BookOpenCheck,
      href: "/user/extend",
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      title: "Sách đã lưu",
      desc: "Danh sách yêu thích",
      icon: Bookmark,
      href: "/user/favorites",
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-black text-gray-800 tracking-tight mb-4">
        ⚡ Lối tắt tính năng
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {menus.map((menu, idx) => (
          <Link
            href={menu.href}
            key={idx}
            className={`p-4 rounded-2xl border ${menu.color} hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex gap-4 items-center shadow-sm`}
          >
            <div className="p-3 bg-white rounded-xl shadow-sm shrink-0">
              <menu.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-950">{menu.title}</h4>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {menu.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
