// src/lib/actions/books.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. CREATE (Thêm sách)
export async function createBook(data: {
  title: string;
  author: string;
  description: string;
  totalCopies: number;
}) {
  await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      description: data.description,
      coverImage: data.image,
      totalCopies: data.totalCopies,
      available: data.totalCopies, // Sách mới thêm vào thì Số lượng sẵn có = Tổng số lượng
    },
  });
  revalidatePath("/admin/books"); // Yêu cầu Next.js tải lại data cho trang này
  revalidatePath("/"); // Tải lại cả trang chủ
}

// 2. UPDATE (Sửa sách)
export async function updateBook(
  id: string,
  data: {
    title: string;
    author: string;
    description: string;
    totalCopies: number;
  }
) {
  await prisma.book.update({
    where: { id },
    data: {
      title: data.title,
      author: data.author,
      description: data.description,
      coverImage: data.image,
      totalCopies: data.totalCopies,
      // Trong thực tế cần tính toán lại `available` nếu `totalCopies` thay đổi,
      // tạm thời ta cập nhật thông tin cơ bản trước.
    },
  });
  revalidatePath("/admin/books");
  revalidatePath("/");
}

// 3. DELETE (Xóa sách)
export async function deleteBook(id: string) {
  await prisma.book.delete({
    where: { id },
  });
  revalidatePath("/admin/books");
  revalidatePath("/");
}
// // lib/actions/books.ts
// "use server";

// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";

// export async function createBook(data: {
//   title: string;
//   author: string;
//   description: string;
//   totalCopies: number;
// }) {
//   await prisma.book.create({
//     data: {
//       ...data,
//       available: data.totalCopies, // Khi tạo mới, số lượng sẵn có = tổng số
//     },
//   });
//   revalidatePath("/admin/books");
//   revalidatePath("/"); // Cập nhật cả trang chủ của user
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function updateBook(id: string, data: any) {
//   await prisma.book.update({
//     where: { id },
//     data,
//   });
//   revalidatePath("/admin/books");
//   revalidatePath("/");
// }

// export async function deleteBook(id: string) {
//   await prisma.book.delete({ where: { id } });
//   revalidatePath("/admin/books");
//   revalidatePath("/");
// }
