// src/app/api/admin/report/excel/route.ts
import { NextResponse } from "next/server";
import { getDashboardExcelData } from "./services/data.service";
import { generateDashboardWorkbook } from "./services/excel.service";

export async function GET() {
  try {
    // Bước 1: Gọi mảnh kéo data từ Database lên
    const data = await getDashboardExcelData();

    // Bước 2: Ném data đó vào mảnh vẽ file Excel
    const workbook = await generateDashboardWorkbook(data);

    // Bước 3: Đóng gói buffer và gửi trả về client tải xuống
    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          "attachment; filename=bao_cao_thong_ke_thu_vien.xlsx",
      },
    });
  } catch (error) {
    console.error("❌ Lỗi Endpoint API Excel:", error);
    return NextResponse.json(
      { error: "Lỗi kết xuất Excel tổng hợp!" },
      { status: 500 }
    );
  }
}
