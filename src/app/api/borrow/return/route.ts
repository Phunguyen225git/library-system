// src/app/api/borrow/return/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { calculateOverdue } from "@/lib/utils";
import { prisma } from "@/lib/prisma"; // 🌟 SỬA: Import thực thể prisma chuẩn của bạn

export async function POST(req: Request) {
  try {
    const { loanId, dueDate } = await req.json();

    if (!loanId || !dueDate) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin loanId hoặc dueDate" },
        { status: 400 }
      );
    }

    // 1. Tính toán phạt quá hạn
    const overdueCheck = calculateOverdue(dueDate, 5000);
    const returnDate = new Date();
    let responseMessage = "Trả sách thành công đúng hạn. Cảm ơn độc giả!";
    let statusSauKhiTra = "RETURNED";

    if (overdueCheck.isOverdue) {
      statusSauKhiTra = "OVERDUE_PENDING_FINE";
      responseMessage = `Sách trả quá hạn ${
        overdueCheck.overdueDays
      } ngày! Phí phạt: ${overdueCheck.fineAmount.toLocaleString("vi-VN")} đ.`;
    }

    // 2. 🌟 THỰC THI CẬP NHẬT DATABASE THẬT VÀO MARIADB
    await prisma.borrowRecord.update({
      where: { id: loanId },
      data: {
        status: statusSauKhiTra,
        // Giả định model của bạn có trường lưu ngày trả thực tế và tiền phạt
        // returnDate: returnDate,
        // fineAmount: overdueCheck.fineAmount
      },
    });

    return NextResponse.json({
      success: true,
      message: responseMessage,
      data: {
        loanId,
        isOverdue: overdueCheck.isOverdue,
        overdueDays: overdueCheck.overdueDays,
        fineAmount: overdueCheck.fineAmount,
        returnDate: returnDate.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("❌ LỖI API TRẢ SÁCH:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi hệ thống khi xử lý trả sách thực tế." },
      { status: 500 }
    );
  }
}
