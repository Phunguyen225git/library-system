// src/app/admin/books/page.tsx
import { prisma } from "@/lib/prisma";
import { BookManager } from "@/src/components/admin/books/BookManager";

export default async function AdminBooksPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>; // Thêm query
}) {
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams.page) || 1;
  const query = resolvedSearchParams.query || ""; // Lấy từ khóa tìm kiếm
  const pageSize = 5;
  const skip = (currentPage - 1) * pageSize;

  // 1. Tạo bộ lọc tìm kiếm (Tìm theo Tên sách hoặc Tác giả)
  const whereClause = query
    ? {
        OR: [{ title: { contains: query } }, { author: { contains: query } }],
      }
    : {};

  // 2. Thêm whereClause vào truy vấn
  const [books, totalBooks] = await Promise.all([
    prisma.book.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: pageSize,
    }),
    prisma.book.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalBooks / pageSize);

  return (
    <BookManager
      initialBooks={books}
      totalPages={totalPages}
      currentPage={currentPage}
      searchQuery={query} // Truyền query xuống Client
    />
  );
}
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";
// import { BookTable } from "@/src/components/admin/books/BookTable";
// import { BookForm } from "@/src/components/admin/books/BookForm";
// import { Button } from "@/src/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/src/components/ui/dialog";
// import { createBook, updateBook } from "@/lib/actions/books";
// import { Plus } from "lucide-react";

// export default function AdminBooksPage() {
//   const [books, setBooks] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingBook, setEditingBook] = useState<any>(null);

//   // Lưu ý: Trong thực tế bạn nên fetch dữ liệu từ Server Component
//   // Ở đây tôi dùng tạm useEffect để bạn dễ hình dung luồng Client State
//   useEffect(() => {
//     fetch("/api/books")
//       .then((res) => res.json())
//       .then((data) => setBooks(data));
//   }, []);

//   const handleOpenAdd = () => {
//     setEditingBook(null);
//     setIsDialogOpen(true);
//   };

//   const handleOpenEdit = (book: any) => {
//     setEditingBook(book);
//     setIsDialogOpen(true);
//   };

//   const handleSubmit = async (values: any) => {
//     if (editingBook) {
//       await updateBook(editingBook.id, values);
//     } else {
//       await createBook(values);
//     }
//     setIsDialogOpen(false);
//     window.location.reload(); // Cách đơn giản để refresh dữ liệu
//   };

//   return (
//     <div className="p-8 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Quản lý Sách</h1>
//         <Button onClick={handleOpenAdd}>
//           <Plus className="mr-2 w-4 h-4" /> Thêm sách
//         </Button>
//       </div>

//       <BookTable books={books} onEdit={handleOpenEdit} />

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {editingBook ? "Chỉnh sửa sách" : "Thêm sách mới"}
//             </DialogTitle>
//           </DialogHeader>
//           <BookForm initialData={editingBook} onSubmit={handleSubmit} />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
