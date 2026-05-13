/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/books/book-manager.tsx
"use client";

import { useState } from "react";
import { BookTable } from "./BookTable";
import { BookForm } from "./BookForm";
import { Button } from "@/src/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Plus } from "lucide-react";
import { createBook, updateBook } from "@/lib/actions/books";
// IMPORT THÊM CÁC COMPONENT PHÂN TRANG
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";

export function BookManager({
  initialBooks,
  totalPages,
  currentPage,
  searchQuery, // Nhận thêm prop này
}: {
  initialBooks: any[];
  totalPages: number;
  currentPage: number;
  searchQuery: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  // Hàm xử lý tìm kiếm
  const handleSearch = (term: string) => {
    const params = new URLSearchParams();
    if (term) {
      params.set("query", term);
    }
    // Khi tìm kiếm mới, luôn reset về trang 1
    params.set("page", "1");

    // Cập nhật URL (replace để không lưu quá nhiều lịch sử rác vào trình duyệt)
    router.replace(`${pathname}?${params.toString()}`);
  };
  const handleOpenAdd = () => {
    /* Giữ nguyên logic cũ */
    setEditingBook(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (book: any) => {
    /* Giữ nguyên logic cũ */
    setEditingBook(book);
    setIsDialogOpen(true);
  };

  const handleSubmitForm = async (values: any) => {
    /* Giữ nguyên logic cũ */
    if (editingBook) await updateBook(editingBook.id, values);
    else await createBook(values);
    setIsDialogOpen(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Quản lý Sách</h1>

        {/* THANH TÌM KIẾM & NÚT THÊM NẰM CÙNG 1 HÀNG */}
        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Tìm tên sách, tác giả..."
              className="pl-9"
              defaultValue={searchQuery}
              onChange={(e) => {
                // Trong thực tế có thể dùng debounce để delay việc gọi hàm
                // Ở đây ta gọi trực tiếp để thấy kết quả ngay
                handleSearch(e.target.value);
              }}
            />
          </div>

          <Button onClick={handleOpenAdd}>
            <Plus className="mr-2 w-4 h-4" /> Thêm sách
          </Button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <BookTable books={initialBooks} onEdit={handleOpenEdit} />

      {/* GIAO DIỆN PHÂN TRANG */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/admin/books?page=${currentPage - 1}`}
                  // Vô hiệu hóa nút Previous nếu đang ở trang 1
                  className={
                    currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <span className="px-4 text-sm font-medium text-slate-600">
                  Trang {currentPage} / {totalPages}
                </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href={`/admin/books?page=${currentPage + 1}`}
                  // Vô hiệu hóa nút Next nếu đang ở trang cuối
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Modal Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBook ? "Chỉnh sửa thông tin" : "Thêm sách mới"}
            </DialogTitle>
          </DialogHeader>
          <BookForm
            initialData={editingBook}
            onSubmitSuccess={handleSubmitForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
