/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { calculateOverdue } from "@/lib/utils";
// import { db } from "@/lib/db"; // Mở ra nếu bạn kết nối Prisma/Database thật

export async function POST(req: Request) {
  console.log("=========================================");
  console.log("📥 [API TRẢ SÁCH]: Nhận được yêu cầu xử lý trả sách!");

  try {
    // Nhận dữ liệu truyền lên từ Frontend (Mã phiếu mượn và Ngày hẹn trả gốc)
    const { loanId, dueDate } = await req.json();

    if (!loanId || !dueDate) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin loanId hoặc dueDate" },
        { status: 400 }
      );
    }

    console.log(
      `📋 Đang kiểm tra Phiếu mượn: ${loanId} | Hạn trả gốc: ${dueDate}`
    );

    // 1. Gọi hàm helper tự động tính toán quá hạn và tiền phạt
    // Mặc định phạt 5.000đ / ngày quá hạn
    const overdueCheck = calculateOverdue(dueDate, 5000);

    // 2. Chuẩn bị dữ liệu cập nhật trạng thái trả sách
    const returnDate = new Date(); // Ngày trả thực tế chính là hôm nay

    let responseMessage = "Trả sách thành công đúng hạn. Cảm ơn độc giả!";
    let statusSauKhiTra = "RETURNED"; // Trạng thái hoàn thành

    // Nếu phát hiện quá hạn, xử lý logic tài chính
    if (overdueCheck.isOverdue) {
      statusSauKhiTra = "OVERDUE_PENDING_FINE"; // Trạng thái giả định: Đã trả sách nhưng chưa nộp phạt
      responseMessage = `Sách trả quá hạn ${
        overdueCheck.overdueDays
      } ngày! Độc giả cần nộp phạt số tiền: ${overdueCheck.fineAmount.toLocaleString(
        "vi-VN"
      )} đ.`;

      console.log(
        `⚠️ PHÁT HIỆN QUÁ HẠN: ${overdueCheck.overdueDays} ngày. Tiền phạt: ${overdueCheck.fineAmount}đ`
      );
    } else {
      console.log("✅ Phiếu mượn hợp lệ, trả sách đúng hạn.");
    }

    /* =================================================================
    [XỬ LÝ DATABASE THẬT TẠI ĐÂY]
    Nếu bạn dùng Prisma, đoạn code cập nhật Database sẽ trông như thế này:
    
    await db.loanRecord.update({
      where: { id: loanId },
      data: {
        returnDate: returnDate,
        fineAmount: overdueCheck.fineAmount,
        status: statusSauKhiTra
      }
    });
    =================================================================
    */

    // 3. Trả kết quả tính toán chi tiết về cho Frontend hiển thị
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
      {
        success: false,
        error: error.message || "Lỗi hệ thống khi xử lý trả sách.",
      },
      { status: 500 }
    );
  }
}
