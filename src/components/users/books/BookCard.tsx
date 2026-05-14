// src/components/books/book-card.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { BookOpen } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BookCard({ book }: { book: any }) {
  const isAvailable = book.available > 0;

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="h-64 relative w-full overflow-hidden rounded-t-lg border-b">
          {book.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="h-full bg-slate-100 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-slate-300" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3
            className="font-bold text-lg text-slate-800 line-clamp-2"
            title={book.title}
          >
            {book.title}
          </h3>
          <Badge
            variant={isAvailable ? "default" : "destructive"}
            className="shrink-0"
          >
            {isAvailable ? `Còn ${book.available}` : "Hết sách"}
          </Badge>
        </div>

        <p className="text-sm text-slate-500 font-medium mb-3">
          Tác giả: {book.author}
        </p>

        <p className="text-sm text-slate-600 line-clamp-3 mt-auto">
          {book.description || "Chưa có mô tả cho cuốn sách này."}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" disabled={!isAvailable}>
          {isAvailable ? "Đăng ký mượn" : "Đang chờ trả"}
        </Button>
      </CardFooter>
    </Card>
  );
}
