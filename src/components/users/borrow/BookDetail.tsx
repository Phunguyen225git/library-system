"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookDetail({ book }: { book: any }) {
  const isAvailable = book.available > 0;
  return (
    <Card className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        📖 Thông tin sách đăng ký mượn
      </h3>

      <div className="flex flex-col sm:flex-row gap-5">
        {/* Ảnh bìa sách */}
        <div className="w-full sm:w-32 h-44 bg-gray-100 rounded-xl overflow-hidden shrink-0 border flex items-center justify-center text-gray-400 text-xs">
          {book.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full bg-slate-100 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-slate-300" />
            </div>
          )}
        </div>

        {/* Chi tiết text */}
        <CardContent className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {book.title}
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Tác giả:{" "}
              <span className="font-medium text-gray-700">{book.author}</span>
            </p>
            <p className="text-sm text-gray-600 line-clamp-3 bg-gray-50 p-3 rounded-xl border border-dashed">
              {book.description || "Chưa có mô tả chi tiết cho cuốn sách này."}
            </p>
          </div>

          {/* Trạng thái kho số lượng */}
          <div className="flex gap-4 mt-4 text-xs font-medium border-t pt-3">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-500">Sẵn có tại kho:</span>
              <span className="text-gray-900 font-bold">
                {book.available} cuốn
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span className="text-gray-500">Giá thuê:</span>
              <span className="text-indigo-600 font-bold">
                {book?.pricePerDay ? book.pricePerDay.toLocaleString() : "0"}
                đ/ngày
              </span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
