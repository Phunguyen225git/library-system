import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    //
    const newUsersThisWeek = await prisma.user.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });
    return NextResponse.json({
      success: true,
      totalUsers,
      newUsersThisWeek,
    });
  } catch (error) {
    console.error("❌ Lỗi đếm số lượng độc giả:", error);
    return NextResponse.json(
      { error: "Không thể lấy số liệu thống kê độc giả!" },
      { status: 500 }
    );
  }
}
