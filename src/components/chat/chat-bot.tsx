// src/components/chat/chat-bot.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Xin chào! Tôi là Trợ lý Thủ thư AI. Bạn cần tôi tìm sách, gợi ý tài liệu hay kiểm tra tình trạng mượn sách hôm nay?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống dưới cùng khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    // 1. Đẩy tin nhắn của User lên màn hình trước
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Gọi API Route chúng ta vừa tạo ở Bước 2
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }), // Gửi toàn bộ lịch sử chat lên để AI hiểu ngữ cảnh
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      // 3. Nhận câu trả lời THẬT từ AI và hiển thị lên màn hình
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      alert("Không thể kết nối với máy chủ AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* 1. NÚT BẤM MỞ CHAT (BONG BÓNG CHAT) */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}

      {/* 2. CỬA SỔ HỘP THOẠI CHAT */}
      {isOpen && (
        <Card className="w-[380px] h-[500px] flex flex-col shadow-2xl border-slate-200 transition-all duration-300 animate-in slide-in-from-bottom-5">
          {/* HEADER CỦA CHAT */}
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold flex items-center gap-1">
                  Thủ thư AI SmartLib
                </CardTitle>
                <p className="text-[11px] text-blue-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Sẵn sàng hỗ trợ
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 p-1 h-auto rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          {/* NỘI DUNG TIN NHẮN (MESSAGES BODY) */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* ICON ĐẠI DIỆN */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border text-blue-600"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* BONG BÓNG TIN NHẮN */}
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* HIỆU ỨNG CHẤM BA CHẤM ĐANG SUY NGHĨ */}
            {isLoading && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto">
                <div className="w-7 h-7 rounded-full bg-white border flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white text-slate-500 border border-slate-100 p-3 rounded-2xl rounded-tl-none text-sm flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* FOOTER NHẬP TIN NHẮN (INPUT FORM) */}
          <CardFooter className="p-3 border-t bg-white rounded-b-lg">
            <form
              onSubmit={handleSendMessage}
              className="flex w-full items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi về sách, tác giả, đồ án..."
                className="flex-1 focus-visible:ring-blue-500 bg-slate-50 border-slate-200"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 shadow-md"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
