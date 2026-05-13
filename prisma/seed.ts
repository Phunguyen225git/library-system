// prisma/seed.ts
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Bắt đầu seed dữ liệu...");

  // 1. Tạo mật khẩu mặc định (hash bằng bcrypt)
  const defaultPassword = await bcrypt.hash("123456", 10);

  // 2. Tạo tài khoản Admin (dùng upsert để nếu chạy lại file seed cũng không bị lỗi trùng email)
  const admin = await prisma.user.upsert({
    where: { email: "admin@library.com" },
    update: {}, // Nếu có rồi thì không làm gì
    create: {
      email: "admin@library.com",
      name: "Super Admin",
      password: defaultPassword,
      role: "ADMIN",
    },
  });
  console.log(`✅ Đã tạo Admin: ${admin.email} / Pass: 123456`);

  // 3. Tạo tài khoản User thường
  const user = await prisma.user.upsert({
    where: { email: "user@library.com" },
    update: {},
    create: {
      email: "user@library.com",
      name: "Khách hàng",
      password: defaultPassword,
      role: "USER",
    },
  });
  console.log(`✅ Đã tạo User: ${user.email} / Pass: 123456`);

  // 4. Tạo một vài cuốn sách mẫu
  const book1 = await prisma.book.upsert({
    where: { id: "book-1" }, // Cố định ID để test cho dễ
    update: {},
    create: {
      id: "book-1",
      title: "Clean Code",
      author: "Robert C. Martin",
      description: "Sách gối đầu giường cho lập trình viên.",
      totalCopies: 5,
      available: 5,
    },
  });

  const book2 = await prisma.book.upsert({
    where: { id: "book-2" },
    update: {},
    create: {
      id: "book-2",
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      description: "Sách kỹ năng mềm bán chạy nhất mọi thời đại.",
      totalCopies: 3,
      available: 3,
    },
  });
  console.log(`✅ Đã tạo 2 cuốn sách mẫu.`);

  console.log("🎉 Seed dữ liệu hoàn tất!");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed dữ liệu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
