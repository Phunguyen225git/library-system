// lib/prisma.ts
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/app/generated/prisma/client";

// Khởi tạo Singleton để tránh lỗi Too many connections khi dev trong Next.js
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  // Trả lại nguyên bản cách khởi tạo adapter của bạn
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST as string,
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    connectionLimit: 5,
  });

  return new PrismaClient({ adapter });
};

// Nếu đã có sẵn instance thì dùng lại, nếu chưa thì tạo mới
export const prisma = globalForPrisma.prisma || createPrismaClient();

// Trong môi trường dev, lưu instance vào biến global
if (process.env.NODE_ENV !== "production") {
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
