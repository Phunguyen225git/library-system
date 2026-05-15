/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextAuthOptions } from "next-auth";

// Import provider đăng nhập bằng email/password
import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";

// Cấu hình chính cho NextAuth
export const authOptions: NextAuthOptions = {
  // Adapter dùng để lưu session/user vào database
  // Đang comment vì có thể khác version gây lỗi type
  // adapter: PrismaAdapter(prisma) as any,

  // Danh sách các phương thức đăng nhập
  providers: [
    CredentialsProvider({
      // Tên provider hiển thị
      name: "Credentials",

      // Khai báo các field trong form login
      credentials: {
        email: {
          label: "Email", // Label hiển thị
          type: "email", // Kiểu input
          placeholder: "admin@example.com", // Placeholder
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      // Hàm xử lý đăng nhập
      async authorize(credentials) {
        // Kiểm tra nếu thiếu email hoặc password
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Vui lòng nhập email và mật khẩu");
        }

        // Tìm user trong database theo email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Nếu không tìm thấy user hoặc chưa có password
        if (!user || !user.password) {
          throw new Error("Tài khoản không tồn tại");
        }

        // So sánh mật khẩu người dùng nhập với mật khẩu đã hash trong DB
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // Nếu mật khẩu sai
        if (!isPasswordValid) {
          throw new Error("Mật khẩu không chính xác");
        }

        // Trả về thông tin user nếu đăng nhập thành công
        return {
          id: user.id,
          email: user.email,
          name: user.name,

          // Gắn role để phân quyền
          role: user.role, // ADMIN | USER
        };
      },
    }),
  ],

  // Cấu hình session
  session: {
    // Sử dụng JWT thay vì lưu session trong DB
    strategy: "jwt",
  },

  // Callbacks để chỉnh sửa JWT và Session
  callbacks: {
    // Chạy khi tạo/cập nhật JWT token
    async jwt({ token, user }) {
      // Nếu user vừa đăng nhập thành công
      if (user) {
        // Lưu role vào token
        token.role = (user as any).role;

        // Lưu id vào token
        token.id = user.id;
      }

      // Trả token đã chỉnh sửa
      return token;
    },

    // Chạy khi tạo session trả về client
    async session({ session, token }) {
      // Nếu tồn tại user trong session
      if (session.user) {
        // Gắn role từ token sang session
        (session.user as any).role = token.role;

        // Gắn id từ token sang session
        (session.user as any).id = token.id;
      }

      // Trả session đã chỉnh sửa
      return session;
    },
  },

  // Tuỳ chỉnh đường dẫn các trang auth
  pages: {
    // Trang đăng nhập custom
    signIn: "/auth/login",
  },
};
