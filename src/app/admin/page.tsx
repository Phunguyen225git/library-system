"use client";

// import { useState } from "react";
import { useState } from "react";
import { TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";

// Import các mảnh ghép vừa tách rời
import { CardStats } from "@/src/components/admin/dashboard/card-stats";
import { ChartsOverview } from "@/src/components/admin/dashboard/charts-overview";
import { RecentActivities } from "@/src/components/admin/dashboard/recent-activities";

//
export default function AdminDashboard() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // Giả lập đóng gói dữ liệu từ state của Dashboard gửi qua API
      const reportData = {
        totalBooks: "1,420",
        activeUsers: "3,850",
        currentBorrows: "247",
        overdueCount: "14",
        recentActivities: [
          {
            user: "Nguyễn Văn Đạt",
            book: "Next.js Pro v2026",
            type: "MƯỢN",
            date: "5 phút trước",
          },
          {
            user: "Trần Thị Hồng",
            book: "Đắc Nhân Tâm",
            type: "ĐĂNG KÝ",
            date: "12 phút trước",
          },
        ],
      };

      const response = await fetch("/api/report/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) throw new Error("Export failed");

      // Biến dữ liệu nhận về thành Blob và ép trình duyệt mở hộp thoại Download file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Bao_Cao_Thue_Vien_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      alert("Đã xảy ra lỗi trong quá trình kết xuất file PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* TIÊU ĐỀ DASHBOARD */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Tổng Quan Hệ Thống
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Số liệu thống kê thời gian thực của thư viện điện tử tính đến hôm
            nay.
          </p>
        </div>
        {/* <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-4 h-11 flex items-center gap-2 shadow-lg shadow-indigo-600/20">
          <TrendingUp className="w-5 h-5" />
          Xuất báo cáo định kỳ
        </Button> */}
        <Button
          disabled={isExporting}
          onClick={handleExportPDF}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-4 h-11 flex items-center gap-2 shadow-lg"
        >
          {isExporting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <TrendingUp className="w-5 h-5" />
          )}
          {isExporting ? "Đang kết xuất..." : "Xuất báo cáo định kỳ"}
        </Button>
      </div>

      {/* 1. Các thẻ số liệu */}
      <CardStats />

      {/* 2. Khu vực biểu đồ đồ thị */}
      <ChartsOverview />

      {/* 3. Nhật ký hoạt động gần đây */}
      <RecentActivities />
    </div>
  );
}
// // src/app/admin/page.tsx
// "use client";

// import { useState } from "react";
// import { TrendingUp, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function AdminDashboard() {
//   const [isExporting, setIsExporting] = useState(false);

//   const handleExportPDF = async () => {
//     setIsExporting(true);
//     try {
//       // Giả lập đóng gói dữ liệu từ state của Dashboard gửi qua API
//       const reportData = {
//         totalBooks: "1,420",
//         activeUsers: "3,850",
//         currentBorrows: "247",
//         overdueCount: "14",
//         recentActivities: [
//           { user: "Nguyễn Văn Đạt", book: "Next.js Pro v2026", type: "MƯỢN", date: "5 phút trước" },
//           { user: "Trần Thị Hồng", book: "Đắc Nhân Tâm", type: "ĐĂNG KÝ", date: "12 phút trước" }
//         ]
//       };

//       const response = await fetch("/api/admin/report/pdf", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(reportData),
//       });

//       if (!response.ok) throw new Error("Export failed");

//       // Biến dữ liệu nhận về thành Blob và ép trình duyệt mở hộp thoại Download file
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Bao_Cao_Thue_Vien_${new Date().toISOString().slice(0,10)}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     } catch (error) {
//       alert("Đã xảy ra lỗi trong quá trình kết xuất file PDF.");
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   return (
//     <Button
//       disabled={isExporting}
//       onClick={handleExportPDF}
//       className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-4 h-11 flex items-center gap-2 shadow-lg"
//     >
//       {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
//       {isExporting ? "Đang kết xuất..." : "Xuất báo cáo định kỳ"}
//     </Button>
//   );
// }
