// src/app/admin/books/actions.ts (hoặc file action tương đương của bạn)
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface BookInputData {
  title: string;
  author: string;
  description: string;
  totalCopies: number;
  pricePerDay: number; // Đã chuẩn hóa thành number của TypeScript
  image?: string;
}

export async function createBook(data: BookInputData) {
  await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      description: data.description,
      coverImage: data.image || null,
      totalCopies: Number(data.totalCopies),
      available: Number(data.totalCopies),
      pricePerDay: Number(data.pricePerDay),
    },
  });
  revalidatePath("/admin/books");
  revalidatePath("/");
}

export async function updateBook(id: string, data: BookInputData) {
  const currentBook = await prisma.book.findUnique({ where: { id } });
  if (!currentBook) throw new Error("Không tìm thấy sách");

  const copiesDifference = Number(data.totalCopies) - currentBook.totalCopies;
  const newAvailable = currentBook.available + copiesDifference;

  await prisma.book.update({
    where: { id },
    data: {
      title: data.title,
      author: data.author,
      description: data.description,
      coverImage: data.image || currentBook.coverImage,
      totalCopies: Number(data.totalCopies),
      available: newAvailable < 0 ? 0 : newAvailable,
      pricePerDay: Number(data.pricePerDay),
    },
  });
  revalidatePath("/admin/books");
  revalidatePath("/borrow");
  revalidatePath("/");
}

export async function deleteBook(id: string) {
  await prisma.book.delete({ where: { id } });
  revalidatePath("/admin/books");
  revalidatePath("/");
}
