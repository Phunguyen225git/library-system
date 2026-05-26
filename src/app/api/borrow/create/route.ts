// src/app/api/borrow/create/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, bookId, rentDays, paymentMethod } = await req.json();

    // 1. Kiểm tra dữ liệu đầu vào bắt buộc từ Client gửi lên
    if (!userId || !bookId || !rentDays || !paymentMethod) {
      return NextResponse.json(
        { error: "Thiếu thông tin đăng ký bắt buộc!" },
        { status: 400 }
      );
    }

    // 2. Kiểm tra tính hợp lệ của sách trong Database
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      return NextResponse.json(
        { error: "Không tìm thấy sách này!" },
        { status: 404 }
      );
    }
    if (book.available <= 0) {
      return NextResponse.json(
        { error: "Sách này hiện tại đã hết!" },
        { status: 400 }
      );
    }

    // 3. Tính toán tài chính & Ngày hạn trả sách
    const totalAmount = book.pricePerDay * parseInt(rentDays);
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + parseInt(rentDays));

    // Xác định trạng thái ban đầu của phiếu mượn
    const statusBanDau =
      paymentMethod === "CASH" ? "AWAITING_PICKUP" : "PENDING_PAYMENT";

    // 4. CHẠY TRANSACTION LƯU VÀO DATABASE MARIADB
    const newRecord = await prisma.$transaction(async (tx) => {
      // Tạo bản ghi mượn sách trước để lấy ID tự sinh
      const record = await tx.borrowRecord.create({
        data: {
          userId,
          bookId,
          borrowDate,
          dueDate,
          paymentMethod,
          amount: totalAmount,
          status: statusBanDau,
        },
        include: {
          book: true,
          user: true, // 🌟 Đưa thông tin User mượn sách vào cụm dữ liệu trả về luôn
        },
      });

      // Tạo mã thanh toán duy nhất từ ID phiếu mượn (Ví dụ: LIB24cuid...)
      const paymentCode = `LIB24${record.id.slice(-6).toUpperCase()}`;

      // Cập nhật ngược lại mã thanh toán vào phiếu mượn vừa tạo
      const updatedRecord = await tx.borrowRecord.update({
        where: { id: record.id },
        data: {
          paymentCode: paymentMethod === "BANK_TRANSFER" ? paymentCode : null,
        },
        include: { book: true, user: true },
      });

      // Nếu khách hàng chọn trả TIỀN MẶT tại quầy -> Trừ kho sách lập tức
      if (paymentMethod === "CASH") {
        await tx.book.update({
          where: { id: bookId },
          data: { available: { decrement: 1 } },
        });
      }

      return updatedRecord;
    });

    // 5. PHẢN HỒI KẾT QUẢ VỀ GIAO DIỆN KHÁCH HÀNG
    if (paymentMethod === "CASH") {
      return NextResponse.json({
        success: true,
        message: "Đăng ký thành công! Đã thêm vào danh sách hàng chờ duyệt.",
        data: newRecord,
      });
    }

    // Cấu hình Ngân hàng của bạn để sinh mã QR động
    const BANK_ID = "MB";
    const ACCOUNT_NO = "0796632951";
    const ACCOUNT_NAME = "NGUYEN TRONG PHU";
    const description = newRecord.paymentCode || `LIB24${newRecord.id}`;

    const qrCodeUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-qr_only.png?amount=${totalAmount}&addInfo=${encodeURIComponent(
      description
    )}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

    return NextResponse.json({
      success: true,
      message: "Vui lòng quét mã QR để kích hoạt phiếu mượn tự động",
      data: {
        ...newRecord,
        qrCodeUrl,
        description,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ LỖI API:", error);
    return NextResponse.json(
      { error: "Lỗi kết nối cơ sở dữ liệu MariaDB!" },
      { status: 500 }
    );
  }
}
