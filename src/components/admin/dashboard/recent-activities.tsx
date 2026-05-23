import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const recentActivities = [
  {
    id: "1",
    user: "Nguyễn Văn Đạt",
    book: "Next.js Pro v2026",
    type: "MƯỢN",
    date: "5 phút trước",
    status: "BORROWED",
  },
  {
    id: "2",
    user: "Trần Thị Hồng",
    book: "Đắc Nhân Tâm",
    type: "ĐĂNG KÝ",
    date: "12 phút trước",
    status: "PENDING_PAYMENT",
  },
  {
    id: "3",
    user: "Phạm Minh Hoàng",
    book: "Giải thuật chuyên sâu",
    type: "TRẢ",
    date: "1 giờ trước",
    status: "RETURNED",
  },
  {
    id: "4",
    user: "Lê Thu Thảo",
    book: "Clean Code",
    type: "QUÁ HẠN",
    date: "2 ngày trước",
    status: "OVERDUE",
  },
];

export function RecentActivities() {
  return (
    <Card className="border border-slate-100 rounded-2xl bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-slate-900">
            Nhật Ký Hoạt Động Gần Đây
          </CardTitle>
          <CardDescription className="text-slate-400 font-medium text-xs">
            Các giao dịch mượn trả vừa được thực hiện trên hệ thống.
          </CardDescription>
        </div>
        <Link href="/admin/borrows">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl text-xs font-bold text-indigo-600 border-indigo-100 hover:bg-indigo-50 flex items-center gap-1 h-9"
          >
            Xem tất cả phiếu <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-xs uppercase font-bold text-muted-foreground tracking-wider">
                {" "}
                <th className="pb-3 pl-2">Độc giả</th>
                <th className="pb-3">Cuốn sách</th>
                <th className="pb-3">Loại giao dịch</th>
                <th className="pb-3">Thời gian</th>
                <th className="pb-3 text-right pr-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm font-medium text-foreground">
              {recentActivities.map((activity) => (
                <tr
                  key={activity.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <td className="py-3.5 pl-2 font-bold text-slate-900">
                    {activity.user}
                  </td>
                  <td className="py-3.5 max-w-xs truncate text-slate-600">
                    {activity.book}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
                        activity.type === "MƯỢN"
                          ? "bg-indigo-50 text-indigo-600"
                          : activity.type === "TRẢ"
                          ? "bg-emerald-50 text-emerald-600"
                          : activity.type === "QUÁ HẠN"
                          ? "bg-rose-50 text-rose-600"
                          : "bg-cyan-50 text-cyan-600"
                      }`}
                    >
                      {activity.type}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400 font-normal text-xs">
                    {activity.date}
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <Badge
                      className={`rounded-lg font-bold text-xs ${
                        activity.status === "BORROWED"
                          ? "bg-blue-500/10 text-blue-600 border-none"
                          : activity.status === "RETURNED"
                          ? "bg-emerald-500/10 text-emerald-600 border-none"
                          : activity.status === "OVERDUE"
                          ? "bg-rose-500/10 text-rose-600 border-none"
                          : "bg-amber-500/10 text-amber-600 border-none"
                      }`}
                    >
                      {activity.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
