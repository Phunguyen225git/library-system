// src/lib/actions/users.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Hàm cập nhật vai trò (Role) của User
export async function updateUserRole(
  userId: string,
  newRole: "USER" | "ADMIN"
) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    // Ép Next.js làm tươi (refresh) lại dữ liệu trang quản lý độc giả ngay lập tức
    revalidatePath("/admin/users");

    return { success: "Cập nhật vai trò thành công!" };
  } catch (error) {
    return { error: "Không thể cập nhật vai trò, vui lòng thử lại." };
  }
}

// 2. Hàm xóa tài khoản độc giả
export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    // Ép Next.js làm tươi lại dữ liệu sau khi xóa thành công
    revalidatePath("/admin/users");

    return { success: "Xóa tài khoản độc giả thành công!" };
  } catch (error) {
    return { error: "Không thể xóa độc giả này (có thể họ đang mượn sách)." };
  }
}
// "use client";
// import { revalidatePath } from "next/cache";
// import { prisma } from "../prisma";
// //Create User
// export async function createUser(data: {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   password: any;
//   name: string;
//   email: string;
// }) {
//   await prisma.user.create({
//     data: {
//       name: data.name,
//       email: data.email,
//       password: data.password,
//     },
//   });
//   revalidatePath("/admin");
//   revalidatePath("/");
// }
// //Update User
// export async function updateUser(
//   id: string,
//   data: {
//     name: string;
//     email: string;
//     password: string;
//   }
// ) {
//   await prisma.user.update({
//     where: { id },
//     data: {
//       name: data.name,
//       email: data.email,
//       password: data.password,
//     },
//   });
//   revalidatePath("/admin");
//   revalidatePath("/");
// }
// //Delete User
// export async function deleteUser(id: string) {
//   await prisma.user.delete({
//     where: { id },
//   });
//   revalidatePath("/admin");
//   revalidatePath("/");
// }
