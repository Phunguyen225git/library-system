import { prisma } from "@/lib/prisma";

export async function getDashboardExcelData() {
  // 1. Lấy toàn bộ sách trong kho
  const allBooks = await prisma.book.findMany({
    orderBy: { title: "asc" },
  });

  // 2. Lấy top 5 sách mượn nhiều nhất
  const topBorrowed = await prisma.borrowRecord.groupBy({
    by: ["bookId"],
    _count: { bookId: true },
    _sum: { amount: true },
    orderBy: { _count: { bookId: "desc" } },
    take: 5,
  });

  const booksReport = await Promise.all(
    topBorrowed.map(async (item) => {
      const book = await prisma.book.findUnique({ where: { id: item.bookId } });
      return {
        id: book?.id || item.bookId,
        title: book?.title || "Không rõ",
        category: book?.category || "Chưa phân loại",
        pricePerDay: book?.pricePerDay || 0,
        count: item._count.bookId,
        revenue: item._sum.amount || 0,
      };
    })
  );

  // 3. Lấy 5 phiếu mượn gần nhất
  const recentRecords = await prisma.borrowRecord.findMany({
    orderBy: { borrowDate: "desc" },
    take: 5,
    include: { user: true },
  });

  return { allBooks, booksReport, recentRecords };
}
