// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Đảm bảo đường dẫn này trỏ đúng về file chứa authOptions thực tế

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
