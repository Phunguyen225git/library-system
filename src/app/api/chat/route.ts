/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("=========================================");
  console.log("🚀 [BƯỚC 1]: Nhận được yêu cầu Chat từ Giao diện!");

  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content;

    if (!lastUserMessage) {
      return NextResponse.json({ error: "Tin nhắn trống" }, { status: 400 });
    }

    console.log(`✉️ [BƯỚC 2]: Câu hỏi cần xử lý: "${lastUserMessage}"`);

    // 🌟 THỬ NGHIỆM DÁN CỨNG API KEY ĐỂ SỬA TRIỆT ĐỂ LỖI 404:
    // Bạn hãy thay chuỗi "AIzaSy..." dưới đây bằng mã API Key thật bạn vừa copy ở Google AI Studio vào nhé.
    const HARDCODED_KEY = "AIzaSyClNlXjPu0DD8X4CfAxt-LF5O0yzTFWvi0";

    if (HARDCODED_KEY.includes("Dán_Key_Thật")) {
      console.log(
        "❌ LỖI: Bạn chưa thay API Key thật của bạn vào đoạn code HARDCODED_KEY!"
      );
    }

    // Khởi tạo SDK trực tiếp bằng Key cứng để xem Next.js có bị lỗi không đọc được file .env hay không
    const ai = new GoogleGenerativeAI(HARDCODED_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log(
      "🤖 [BƯỚC 3]: Đang kết nối trực tiếp đến Google Gemini bằng Key thử nghiệm..."
    );

    const result = await model.generateContent(lastUserMessage);
    const responseText = result.response.text();

    console.log("✅ [BƯỚC 4]: Google Gemini đã phản hồi thành công!");
    console.log("📝 Nội dung nhận được từ AI:", responseText);

    return NextResponse.json({ content: responseText });
  } catch (error: any) {
    console.error("❌ LỖI NGHIÊM TRỌNG TẠI API ROUTE:", error);
    return NextResponse.json(
      { error: error.message || "Trợ lý AI đang gặp sự cố đường truyền." },
      { status: 500 }
    );
  }
}
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // src/app/api/chat/route.ts
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   console.log("=========================================");
//   console.log("🚀 [BƯỚC 1]: Nhận được yêu cầu Chat từ Giao diện!");

//   try {
//     const { messages } = await req.json();
//     const lastUserMessage = messages[messages.length - 1]?.content;

//     if (!lastUserMessage) {
//       console.log("❌ LỖI: Người dùng gửi tin nhắn rỗng.");
//       return NextResponse.json({ error: "Tin nhắn trống" }, { status: 400 });
//     }

//     console.log(`✉️ [BƯỚC 2]: Câu hỏi cần xử lý: "${lastUserMessage}"`);

//     // Khởi tạo mô hình
//     const llm = new ChatGoogleGenerativeAI({
//       model: "gemini-1.5-flash-002",
//       temperature: 0.7,
//     });

//     console.log(
//       "🤖 [BƯỚC 3]: Đang phát tín hiệu gọi API Google Gemini... (Đoạn này dễ kẹt nhất)"
//     );

//     // ĐƠN GIẢN HÓA: Truyền thẳng chuỗi chữ thuần túy thay vì mảng dữ liệu phức tạp
//     const response = await llm.invoke(lastUserMessage);

//     console.log("✅ [BƯỚC 4]: Google Gemini đã phản hồi thành công!");
//     console.log("📝 Nội dung nhận được từ AI:", response.content);

//     return NextResponse.json({ content: response.content });
//   } catch (error: any) {
//     console.error("❌ LỖI NGHIÊM TRỌNG TẠI API ROUTE:", error);
//     return NextResponse.json(
//       { error: error.message || "Trợ lý AI đang gặp sự cố đường truyền." },
//       { status: 500 }
//     );
//   }
// }
