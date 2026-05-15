// src/lib/actions/auth.ts
"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function registerUser(values: z.infer<typeof registerSchema>) {
  try {
    // 1. Kiểm tra email đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({
      where: { email: values.email },
    });

    if (existingUser) {
      return { error: "Email này đã được sử dụng!" };
    }

    // 2. Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(values.password, 10);

    // 3. Lưu vào Database qua Prisma
    await prisma.user.create({
      data: {
        name: values.name,
        email: values.email,
        password: hashedPassword,
        role: "USER", // Mặc định là tài khoản người xem sách
      },
    });

    return { success: "Đăng ký thành công!" };
  } catch (error) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại." };
  }
}
