// src/app/api/borrows/stats/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Chạy song song cả 3 lệnh đếm để tối ưu hiệu năng Database
    const [totalBorrows, newBorrowsThisWeek, totalOverdue] = await Promise.all([
      // Thẻ 3: Đếm những sách THỰC SỰ đang ở bên ngoài (Chưa được trả)
      prisma.borrowRecord.count({
        where: { status: "BORROWED" },
      }),

      // Thẻ 3 (Phần text nhỏ): Đếm số lượt mượn mới phát sinh trong vòng 7 ngày qua
      prisma.borrowRecord.count({
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      }),

      // Thẻ 4: Đếm số lượng đơn đang bị gắn cờ quá hạn vi phạm
      prisma.borrowRecord.count({
        where: { status: "OVERDUE_PENDING_FINE" }, // Hãy đảm bảo chữ này khớp với Enum Status trong schema.prisma của bạn
      }),
    ]);

    // Trả về đầy đủ 3 trường dữ liệu cho Frontend nhận
    return NextResponse.json({
      success: true,
      totalBorrows,
      newBorrowsThisWeek,
      totalOverdue, // 🌟 Đã bổ sung trường bị thiếu
    });
  } catch (error) {
    console.error("❌ Lỗi API thống kê borrows:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi tính toán dữ liệu hệ thống" },
      { status: 500 }
    );
  }
}
