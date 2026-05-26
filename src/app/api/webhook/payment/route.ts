// src/app/api/webhook/payment/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🌟 Lấy danh sách giao dịch từ bên trung gian gửi sang (Ví dụ cấu trúc của Casso)
    const transactions = body.data || [];

    for (const tx of transactions) {
      const content = tx.description || tx.memo || "";
      const amountPaid = tx.amount || 0;

      // Tìm kiếm xem nội dung chuyển khoản có chứa mã đơn hàng của mình không (ví dụ: LIB24...)
      const match = content.match(/LIB24\d+/);
      if (!match) continue;

      const paymentCode = match[0];

      // Tìm đơn hàng tương ứng trong MariaDB
      const borrowRecord = await prisma.borrowRecord.findFirst({
        where: { paymentCode: paymentCode, status: "PENDING_PAYMENT" },
      });

      if (borrowRecord && amountPaid >= borrowRecord.amount) {
        // 🌟 Chạy Transaction: Cập nhật đơn hàng và trừ kho sách
        await prisma.$transaction([
          // 1. Chuyển trạng thái sang đã thanh toán/đang mượn (để sau làm report)
          prisma.borrowRecord.update({
            where: { id: borrowRecord.id },
            data: { status: "BORROWED" }, // Hoặc "PAID_AWAITING_PICKUP" tùy quy trình của bạn
          }),
          // 2. Trừ bớt 1 cuốn sách trong kho vì thanh toán online thành công
          prisma.book.update({
            where: { id: borrowRecord.bookId },
            data: { available: { decrement: 1 } },
          }),
        ]);
        console.log(`✅ Đã duyệt tự động cho đơn hàng: ${paymentCode}`);
      }
    }

    return NextResponse.json(
      { success: true, message: "Webhook processed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Lỗi xử lý Webhook:", error);
    return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
  }
}
