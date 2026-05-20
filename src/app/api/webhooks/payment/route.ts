/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Log ra terminal để xem cấu trúc dữ liệu chuyển khoản gửi về
    console.log("💰 NHẬN ĐƯỢC TÍN HIỆU BIẾN ĐỘNG SỐ DƯ TỪ WEBHOOK:", body);

    // Lấy nội dung chuyển khoản (Tùy bên cung cấp webhook, thường là body.description hoặc body.content)
    const content = body.description || body.content || "";

    // Dùng Regex tìm mã phiếu mượn dạng "THUVIEN LPxxxxxx" trong nội dung chuyển khoản
    const match = content.match(/THUVIEN\s+(LP\d+)/i);

    if (match) {
      const loanId = match[1]; // Lấy được chính xác mã phiếu mượn ví dụ: LP123456
      console.log(
        `✅ Xác nhận thanh toán thành công cho phiếu mượn: ${loanId}`
      );

      // [XỬ LÝ DATABASE TẠI ĐÂY]:
      // Cập nhật status của phiếu mượn này từ PENDING_PAYMENT thành BORROWING trong DB của bạn.
      // await db.loanRecord.update({ where: { id: loanId }, data: { status: "BORROWING" } });

      // Gợi ý: Tại đây bạn có thể dùng Socket.io hoặc cơ chế Server-Sent Events (SSE)
      // để lập tức bắn một tín hiệu "Thành công" xuống màn hình của người dùng.

      return NextResponse.json({
        success: true,
        message: "Đã xử lý phiếu mượn",
      });
    }

    return NextResponse.json({
      success: false,
      message: "Nội dung chuyển khoản không hợp lệ",
    });
  } catch (error: any) {
    console.error("❌ Lỗi Webhook:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
