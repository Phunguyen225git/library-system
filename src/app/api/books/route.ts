// app/api/books/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // 1. Kiểm tra xác thực và phân quyền (Security First)
    const session = await getServerSession(authOptions);

    // Nếu chưa đăng nhập hoặc không phải ADMIN, trả về lỗi 403 Forbidden
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Bạn không có quyền truy cập dữ liệu này." },
        { status: 403 }
      );
    }

    // 2. Truy vấn Database lấy danh sách sách
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc", // Sắp xếp sách mới tạo lên đầu
      },
    });

    // 3. Trả về dữ liệu dạng JSON
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách sách (API):", error);
    return NextResponse.json({ error: "Lỗi máy chủ cục bộ." }, { status: 500 });
  }
}
