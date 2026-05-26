// src/app/api/admin/stats/books/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Đếm tổng số lượng tất cả đầu sách đang có trong Database
    const totalBooks = await prisma.book.count();

    // 2. Tính mốc thời gian cách đây 7 ngày
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // 3. Đếm số sách được tạo mới tính từ 7 ngày trước đến nay
    // (Đảm bảo model Book trong schema.prisma của bạn có trường kiểu DateTime như createdAt nhé)
    const newBooksThisWeek = await prisma.book.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    // 4. Trả kết quả về cho Frontend
    return NextResponse.json({
      success: true,
      totalBooks,
      newBooksThisWeek,
    });
  } catch (error) {
    console.error("❌ Lỗi đếm số lượng sách:", error);
    return NextResponse.json(
      { error: "Không thể lấy số liệu thống kê sách!" },
      { status: 500 }
    );
  }
}
