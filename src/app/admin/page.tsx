"use client";

import { useState } from "react";
import { TrendingUp, FileSpreadsheet, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";

// Import các cấu phần hiển thị số liệu
import { CardStats } from "@/src/components/admin/dashboard/card-stats";
import { ChartsOverview } from "@/src/components/admin/dashboard/charts-overview";
import { RecentActivities } from "@/src/components/admin/dashboard/recent-activities";

export default function AdminDashboard() {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  // 🔴 1. Hàm Xử Lý Xuất Báo Cáo PDF (Giữ nguyên logic Puppeteer của bạn)
  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
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

      if (!response.ok) throw new Error("Export PDF failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Bao_Cao_Thu_Vien_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Đã xảy ra lỗi trong quá trình kết xuất file PDF.");
    } finally {
      setIsExportingPDF(false);
    }
  };

  // 🟢 2. Hàm Xử Lý Xuất Thống Kê Excel (Gọi API ExcelJS mới)
  const handleExportExcel = async () => {
    setIsExportingExcel(true);
    try {
      const response = await fetch("/api/report/excel");
      if (!response.ok) throw new Error("Export Excel failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Thong_Ke_Thu_Vien_${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Đã xảy ra lỗi trong quá trình trích xuất file Excel.");
    } finally {
      setIsExportingExcel(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* TIÊU ĐỀ DASHBOARD VÀ CỤM NÚT ACTION */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Tổng Quan Hệ Thống
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Số liệu thống kê thời gian thực của thư viện điện tử tính đến hôm
            nay.
          </p>
        </div>

        {/* KHU VỰC CÁC NÚT BẤM XUẤT FILE */}
        <div className="flex flex-wrap items-center gap-3">
          {/* NÚT 1: XUẤT FILE EXCEL */}
          <Button
            disabled={isExportingExcel || isExportingPDF}
            onClick={handleExportExcel}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-4 h-11 flex items-center gap-2 shadow-md shadow-emerald-600/10 active:scale-95 disabled:opacity-50 transition-all"
          >
            {isExportingExcel ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <FileSpreadsheet className="w-5 h-5" />
            )}
            {isExportingExcel
              ? "Đang trích xuất Excel..."
              : "Xuất Thống Kê Excel"}
          </Button>

          {/* NÚT 2: XUẤT FILE PDF */}
          <Button
            disabled={isExportingPDF || isExportingExcel}
            onClick={handleExportPDF}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-4 h-11 flex items-center gap-2 shadow-md shadow-indigo-600/10 active:scale-95 disabled:opacity-50 transition-all"
          >
            {isExportingPDF ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <TrendingUp className="w-5 h-5" />
            )}
            {isExportingPDF ? "Đang kết xuất PDF..." : "Xuất Báo Cáo PDF"}
          </Button>
        </div>
      </div>

      {/* 1. Khối 4 thẻ số liệu tổng quan (Sách, Độc giả...) */}
      <CardStats />

      {/* 2. Khu vực hiển thị đồ thị và biểu đồ tăng trưởng */}
      <ChartsOverview />

      {/* 3. Nhật ký các hoạt động mượn/trả gần đây nhất */}
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
