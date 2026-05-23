import { BookOpen, Users, FileClock, BadgeAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export function CardStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Thẻ: Tổng đầu sách */}
      <Card className="border border-slate-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold uppercase text-slate-500 tracking-wider">
            Tổng đầu sách
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <BookOpen className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black text-slate-900">1,420</div>
          <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>+12 cuốn mới</span>{" "}
            <span className="text-slate-400 font-normal">trong tuần này</span>
          </p>
        </CardContent>
      </Card>

      {/* Thẻ: Tổng độc giả */}
      <Card className="border border-slate-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold uppercase text-slate-500 tracking-wider">
            Độc giả kích hoạt
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600">
            <Users className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black text-slate-900">3,850</div>
          <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>+48 tài khoản</span>{" "}
            <span className="text-slate-400 font-normal">vừa đăng ký mới</span>
          </p>
        </CardContent>
      </Card>

      {/* Thẻ: Đang mượn ngoài */}
      <Card className="border border-slate-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold uppercase text-slate-500 tracking-wider">
            Sách đang mượn ngoài
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <FileClock className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black text-slate-900">247</div>
          <p className="text-xs font-semibold text-slate-400 mt-2">
            Có <span className="text-amber-600 font-bold">18 phiếu</span> đang
            chờ duyệt ra quầy lấy
          </p>
        </CardContent>
      </Card>

      {/* Thẻ: Vi phạm quá hạn */}
      <Card className="border border-slate-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold uppercase text-slate-500 tracking-wider">
            Vi phạm / Quá hạn
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
            <BadgeAlert className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black text-rose-600">14</div>
          <p className="text-xs font-semibold text-rose-500 mt-2">
            Cần gửi email nhắc nhở thu hồi sách ngay
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
