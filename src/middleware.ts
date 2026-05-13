// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    // Nếu đang vào trang login mà đã đăng nhập rồi -> đẩy về trang chủ
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return null;
    }

    // Nếu vào trang Admin mà chưa đăng nhập, hoặc role không phải ADMIN -> cấm/chuyển hướng
    if (isAdminPage) {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url)); // Có thể trỏ ra trang báo lỗi 403
      }
    }
  },
  {
    callbacks: {
      // Trả về true để middleware hàm bên trên luôn được chạy
      authorized: () => true,
    },
  }
);

// Áp dụng middleware cho các đường dẫn này
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
