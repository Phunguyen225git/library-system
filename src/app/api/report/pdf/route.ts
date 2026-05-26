/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    // 1. Nhận dữ liệu thực tế từ Dashboard gửi lên (hoặc tự query trực tiếp từ MariaDB)
    const body = await req.json();
    const {
      totalBooks,
      activeUsers,
      currentBorrows,
      overdueCount,
      recentActivities,
    } = body;

    // 2. Khởi chạy trình duyệt Puppeteer ngầm
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // 3. Định nghĩa chuỗi HTML Template có nhúng dữ liệu thật và CSS cao cấp
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Báo cáo hoạt động thư viện</title>
        <style>
          @page {
            size: A4;
            margin: 20mm 15mm;
            @bottom-right {
              content: "Trang " counter(page);
              font-size: 9pt;
              font-family: 'Arial', sans-serif;
              color: #64748b;
            }
          }
          body {
            font-family: 'Arial', sans-serif;
            color: #1e293b;
            margin: 0;
            padding: 0;
            line-height: 1.5;
            font-size: 11pt;
          }
          .header {
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 12px;
            margin-bottom: 20px;
          }
          .title {
            font-size: 20pt;
            font-weight: 900;
            color: #0f172a;
            margin: 5px 0;
          }
          /* Grid số liệu tổng quan */
          .grid-stats {
            display: table;
            width: 100%;
            margin-bottom: 25px;
          }
          .stat-card {
            display: table-cell;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 12px;
            border-radius: 8px;
            width: 25%;
            text-align: center;
          }
          .stat-val { font-size: 16pt; font-weight: bold; color: #4f46e5; }
          
          /* Định dạng Bảng dữ liệu nhật ký */
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th { background: #0f172a; color: #fff; padding: 10px; font-size: 10pt; text-align: left; }
          td { padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 10pt; }
          tr:nth-child(even) { background: #f8fafc; }
          
          /* Tránh phân mảnh linh kiện khi nhảy trang */
          .no-break { page-break-inside: avoid; }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="font-size: 10pt; font-weight: bold; color: #4f46e5;">HỆ THỐNG THƯ VIỆN ĐIỆN TỬ</div>
          <div class="title">Báo Cáo Hoạt Động Định Kỳ</div>
          <div style="font-size: 9pt; color: #64748b;">Xuất ngày: ${new Date().toLocaleString(
            "vi-VN"
          )}</div>
        </div>

        <h3>I. Chỉ số tổng quan hệ thống</h3>
        <div class="grid-stats">
          <div class="stat-card"><div>Tổng sách</div><div class="stat-val">${totalBooks}</div></div>
          <div class="stat-card"><div>Độc giả</div><div class="stat-val">${activeUsers}</div></div>
          <div class="stat-card"><div>Đang mượn</div><div class="stat-val">${currentBorrows}</div></div>
          <div class="stat-card"><div>Quá hạn</div><div class="stat-val" style="color:#ef4444;">${overdueCount}</div></div>
        </div>

        <h3>II. Nhật ký hoạt động mới nhất</h3>
        <table>
          <thead>
            <tr>
              <th>Độc giả</th>
              <th>Cuốn sách</th>
              <th>Loại</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            ${recentActivities
              .map(
                (act: any) => `
              <tr>
                <td style="font-weight:bold;">${act.user}</td>
                <td>${act.book}</td>
                <td>${act.type}</td>
                <td>${act.date}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div class="no-break" style="margin-top: 40px; display: table; width: 100%;">
          <div style="display: table-cell; text-align: center; width: 50%;">
            <p><strong>Người lập báo cáo</strong></p>
            <div style="height: 60px;"></div>
            <p>Admin Hệ thống</p>
          </div>
          <div style="display: table-cell; text-align: center; width: 50%;">
            <p><strong>Xác nhận của thủ thư</strong></p>
            <div style="height: 60px;"></div>
            <p>Thủ thư trưởng</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Đổ nội dung HTML vào trang của Puppeteer và tiến hành cấu hình lệnh in PDF
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true, // Giữ lại màu nền của Card và Header
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    });

    await browser.close();

    // 5. Trả luồng dữ liệu nhị phân về cho phía Client tải xuống trực tiếp
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Bao_Cao_Thu_Vien_2026.pdf",
      },
    });
  } catch (error) {
    console.error("Lỗi xuất PDF:", error);
    return NextResponse.json(
      { error: "Không thể xuất file PDF" },
      { status: 500 }
    );
  }
}
