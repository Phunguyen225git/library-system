// lib/prisma.ts
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";

// Đảm bảo ép Next.js hiểu đây là môi trường dev nếu không có định nghĩa rõ ràng
const isDev =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_ENV === "development";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST as string,
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    // 🌟 SỬA TẠI ĐÂY: Nâng lên 20 kết nối để phục vụ các câu lệnh Promise.all song song
    connectionLimit: 20,
    allowPublicKeyRetrieval: true,
    ssl: false,
  });

  return new PrismaClient({
    adapter,
    // Hiện log lỗi chi tiết ra terminal khi dev để dễ bắt bệnh
    log: isDev ? ["error", "warn"] : ["error"],
  });
};

// Áp dụng cơ chế kiểm tra Singleton nghiêm ngặt
export const prisma = globalForPrisma.prisma || createPrismaClient();

if (isDev) {
  globalForPrisma.prisma = prisma;
}
// import "dotenv/config";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";
// import { PrismaClient } from "../app/generated/prisma/client";

// const adapter = new PrismaMariaDb({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   connectionLimit: 5,
// });
// const prisma = new PrismaClient({ adapter });

// export { prisma };
