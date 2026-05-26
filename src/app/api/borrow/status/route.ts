// src/app/api/borrow/status/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Lấy cái ID phiếu mượn gửi lên từ trình duyệt

    if (!id) {
      return NextResponse.json(
        { error: "Thiếu ID đơn hàng!" },
        { status: 400 }
      );
    }

    // Tìm kiếm trong MariaDB xem đơn này trạng thái là gì
    const record = await prisma.borrowRecord.findUnique({
      where: { id },
    });

    if (!record) {
      return NextResponse.json(
        { error: "Không tìm thấy đơn hàng!" },
        { status: 404 }
      );
    }

    // Trả về toàn bộ bản ghi (trong đó có chứa trường status)
    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi hệ thống Server" }, { status: 500 });
  }
}
// // src/app/api/borrow/status/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json(
//         { error: "Thiếu ID đơn hàng!" },
//         { status: 400 }
//       );
//     }

//     const record = await prisma.borrowRecord.findUnique({
//       where: { id },
//       include: { book: true, user: true }, // Kèm thông tin sách và user
//     });

//     if (!record) {
//       return NextResponse.json(
//         { error: "Không tìm thấy đơn hàng!" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(record);
//   } catch (error) {
//     return NextResponse.json({ error: "Lỗi hệ thống" }, { status: 500 });
//   }
// }
