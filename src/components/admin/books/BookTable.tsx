/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Button } from "@/src/components/ui/button";
import { deleteBook } from "@/lib/actions/books";
import { Edit2, Trash2, BookOpen } from "lucide-react";

export function BookTable({
  books,
  onEdit,
}: {
  books: any[];
  onEdit: (book: any) => void;
}) {
  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa cuốn sách này?")) {
      await deleteBook(id);
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25 text-center">Hình ảnh</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Tác giả</TableHead>
            <TableHead>Sẵn có</TableHead>
            <TableHead>Giá thuê</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="flex justify-center">
                {book.coverImage ? (
                  <div className="w-12 h-16 rounded-md overflow-hidden border shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-16 rounded-md bg-slate-100 border flex items-center justify-center text-slate-400 shadow-sm">
                    <BookOpen className="w-6 h-6" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>
                {book.available} / {book.totalCopies}
              </TableCell>
              <TableCell>{book.pricePerDay}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(book)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(book.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
