/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/chat/route.ts
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

// Khởi tạo Google provider với API Key từ biến môi trường của bạn
const googleProvider = createGoogleGenerativeAI({
  apiKey:
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    "AIzaSyBaCA3RbMru85_5gCAAqi_jmC8ySQSx5S4",
});

export async function POST(req: Request) {
  console.log("=========================================");
  console.log("🚀 [BƯỚC 1]: Nhận được yêu cầu Chat từ Giao diện!");

  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content;

    if (!lastUserMessage) {
      return new Response(JSON.stringify({ error: "Tin nhắn trống" }), {
        status: 400,
      });
    }

    console.log(`✉️ [BƯỚC 2]: Câu hỏi cần xử lý: "${lastUserMessage}"`);
    console.log(
      "🤖 [BƯỚC 3]: Đang thiết lập luồng Stream đến Google Gemini..."
    );

    // Khởi tạo luồng stream sử dụng Vercel AI SDK
    const result = await streamText({
      model: googleProvider("gemini-1.5-flash"), // Sử dụng tên model chuẩn để tránh lỗi 404 trên v1beta
      messages, // Truyền toàn bộ lịch sử để AI có ngữ cảnh
      system:
        "Bạn là một trợ lý lập trình chuyên nghiệp. Trả lời bằng tiếng Việt.",
      onFinish: (response) => {
        console.log("✅ [BƯỚC 4]: Luồng Stream đã hoàn tất!");
        console.log("📝 Nội dung phản hồi cuối cùng:", response.text);
      },
    });

    // Khuyến nghị: Sử dụng toDataStreamResponse() nếu bạn dùng useChat của Vercel AI SDK bản mới
    // Nếu thư viện cũ báo lỗi function không tồn tại, hãy giữ nguyên toTextStreamResponse()
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("❌ LỖI NGHIÊM TRỌNG TẠI API ROUTE:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Trợ lý AI đang gặp sự cố." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
