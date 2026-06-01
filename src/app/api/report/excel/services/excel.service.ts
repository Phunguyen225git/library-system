import ExcelJS from "exceljs";

// Khai báo kiểu dữ liệu đầu vào cho hàm build
interface BuildExcelProps {
  allBooks: any[];
  booksReport: any[];
  recentRecords: any[];
}

export async function generateDashboardWorkbook({
  allBooks,
  booksReport,
  recentRecords,
}: BuildExcelProps) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Thống Kê Tổng Quan");
  worksheet.views = [{ showGridLines: true }];

  // Mã màu định danh hệ thống
  const NAVY_DARK = "1F497D";
  const WHITE = "FFFFFF";
  const ZEBRA_FILL = "F2F5F8";

  // --- TIÊU ĐỀ ---
  worksheet.getCell("A1").value = "BÁO CÁO THỐNG KÊ HỆ THỐNG THƯ VIỆN ĐIỆN TỬ";
  worksheet.getCell("A1").font = {
    name: "Arial",
    size: 16,
    bold: true,
    color: { argb: NAVY_DARK },
  };
  worksheet.getCell(
    "A2"
  ).value = `Dữ liệu tổng hợp tự động từ hệ thống | Ngày xuất: ${new Date().toLocaleDateString(
    "vi-VN"
  )}`;
  worksheet.getCell("A2").font = {
    name: "Arial",
    size: 10,
    italic: true,
    color: { argb: "595959" },
  };

  // =========================================================================
  // --- KHỐI I: TỔNG SỐ LƯỢNG SÁCH CÓ TRONG KHO ---
  // =========================================================================
  worksheet.getCell("A4").value = "I. TỔNG SỐ LƯỢNG SÁCH CÓ TRONG KHO HỆ THỐNG";
  worksheet.getCell("A4").font = {
    name: "Arial",
    size: 12,
    bold: true,
    color: { argb: NAVY_DARK },
  };

  const headerRowBooks1 = worksheet.getRow(5);
  headerRowBooks1.values = [
    "Mã Sách",
    "Tên Cuốn Sách",
    "Tác Giả",
    "Giá Thuê / Ngày",
    "Số Lượng Hiện Có",
  ];
  headerRowBooks1.height = 25;
  headerRowBooks1.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: NAVY_DARK },
    };
    cell.font = { name: "Arial", size: 10, bold: true, color: { argb: WHITE } };
    cell.alignment = { horizontal: "center", vertical: "middle" };
  });

  const startRowBooks1 = 6;
  allBooks.forEach((book, idx) => {
    const row = worksheet.getRow(startRowBooks1 + idx);
    row.values = [
      book.id,
      book.title,
      book.author,
      book.pricePerDay,
      book.available ?? 0,
    ];
    row.height = 20;

    row.eachCell((cell, colNum) => {
      cell.font = { name: "Arial", size: 10 };
      cell.border = {
        top: { style: "thin", color: { argb: "D9D9D9" } },
        bottom: { style: "thin", color: { argb: "D9D9D9" } },
        left: { style: "thin", color: { argb: "D9D9D9" } },
        right: { style: "thin", color: { argb: "D9D9D9" } },
      };
      if (idx % 2 === 1)
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: ZEBRA_FILL },
        };
      if (colNum === 4) {
        cell.numberFormat = '#,##0"đ"';
        cell.alignment = { horizontal: "right", vertical: "middle" };
      } else if (colNum === 5 || colNum === 1) {
        cell.alignment = { horizontal: "center", vertical: "middle" };
        if (colNum === 5) cell.numberFormat = "#,##0";
      } else {
        cell.alignment = { horizontal: "left", vertical: "middle" };
      }
    });
  });

  const totalRowBooksNum1 = worksheet.lastRow!.number + 1;
  const totalRowBooks1 = worksheet.getRow(totalRowBooksNum1);
  totalRowBooks1.values = ["Tổng số lượng đầu sách", "", "", "", ""];
  totalRowBooks1.getCell(5).value = {
    formula: `=SUM(E${startRowBooks1}:E${totalRowBooksNum1 - 1})`,
  };
  totalRowBooks1.eachCell((cell, colNum) => {
    cell.font = { name: "Arial", size: 10, bold: true };
    cell.border = {
      top: { style: "thin", color: { argb: NAVY_DARK } },
      bottom: { style: "double", color: { argb: NAVY_DARK } },
    };
    if (colNum === 5) {
      cell.numberFormat = "#,##0";
      cell.alignment = { horizontal: "center", vertical: "middle" };
    }
  });

  // =========================================================================
  // --- KHỐI II: DANH SÁCH SÁCH MƯỢN NHIỀU NHẤT ---
  // =========================================================================
  const startRowKhoi2Title = totalRowBooksNum1 + 3;
  worksheet.getCell(`A${startRowKhoi2Title}`).value =
    "II. DANH SÁCH SÁCH MƯỢN NHIỀU NHẤT TRONG THÁNG";
  worksheet.getCell(`A${startRowKhoi2Title}`).font = {
    name: "Arial",
    size: 12,
    bold: true,
    color: { argb: NAVY_DARK },
  };

  const headerRowBooks2 = worksheet.getRow(startRowKhoi2Title + 1);
  headerRowBooks2.values = [
    "Mã Sách",
    "Tên Cuốn Sách",
    "Thể Loại",
    "Đơn Giá/Ngày",
    "Số Lượt Mượn",
    "Doanh Thu Dự Kiến",
  ];
  headerRowBooks2.height = 25;
  headerRowBooks2.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: NAVY_DARK },
    };
    cell.font = { name: "Arial", size: 10, bold: true, color: { argb: WHITE } };
    cell.alignment = { horizontal: "center", vertical: "middle" };
  });

  const dataStartKhoi2Row = startRowKhoi2Title + 2;
  booksReport.forEach((book, idx) => {
    const row = worksheet.addRow([
      book.id,
      book.title,
      book.category,
      book.pricePerDay,
      book.count,
      book.revenue,
    ]);
    row.height = 20;
    row.eachCell((cell, colNum) => {
      cell.font = { name: "Arial", size: 10 };
      cell.border = {
        top: { style: "thin", color: { argb: "D9D9D9" } },
        bottom: { style: "thin", color: { argb: "D9D9D9" } },
        left: { style: "thin", color: { argb: "D9D9D9" } },
        right: { style: "thin", color: { argb: "D9D9D9" } },
      };
      if (idx % 2 === 1)
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: ZEBRA_FILL },
        };
      if (colNum === 4 || colNum === 6) {
        cell.numberFormat = '#,##0"đ"';
        cell.alignment = { horizontal: "right", vertical: "middle" };
      } else if (colNum === 5) {
        cell.numberFormat = "#,##0";
        cell.alignment = { horizontal: "center", vertical: "middle" };
      } else if (colNum === 1) {
        cell.alignment = { horizontal: "center", vertical: "middle" };
      }
    });
  });

  const totalRowBooksNum2 = worksheet.lastRow!.number + 1;
  const totalRowBooks2 = worksheet.getRow(totalRowBooksNum2);
  totalRowBooks2.values = ["Tổng cộng hiệu suất", "", "", "", "", ""];
  totalRowBooks2.getCell(5).value = {
    formula: `=SUM(E${dataStartKhoi2Row}:E${totalRowBooksNum2 - 1})`,
  };
  totalRowBooks2.getCell(6).value = {
    formula: `=SUM(F${dataStartKhoi2Row}:F${totalRowBooksNum2 - 1})`,
  };
  totalRowBooks2.eachCell((cell, colNum) => {
    cell.font = { name: "Arial", size: 10, bold: true };
    cell.border = {
      top: { style: "thin", color: { argb: NAVY_DARK } },
      bottom: { style: "double", color: { argb: NAVY_DARK } },
    };
    if (colNum === 5)
      cell.alignment = { horizontal: "center", vertical: "middle" };
    if (colNum === 6) {
      cell.numberFormat = '#,##0"đ"';
      cell.alignment = { horizontal: "right", vertical: "middle" };
    }
  });

  // =========================================================================
  // --- KHỐI III: NHẬT KÝ GIAO DỊCH PHIẾU MƯỢN MỚI NHẤT ---
  // =========================================================================
  const startRowRecords = totalRowBooksNum2 + 3;
  worksheet.getCell(`A${startRowRecords}`).value =
    "III. NHẬT KÝ GIAO DỊCH PHIẾU MƯỢN MỚI NHẤT";
  worksheet.getCell(`A${startRowRecords}`).font = {
    name: "Arial",
    size: 12,
    bold: true,
    color: { argb: NAVY_DARK },
  };

  const headerRowRecs = worksheet.getRow(startRowRecords + 1);
  headerRowRecs.values = [
    "Mã Phiếu",
    "Độc Giả",
    "Ngày Mượn",
    "Hạn Trả",
    "Hình Thức",
    "Tổng Tiền",
    "Trạng Thái",
  ];
  headerRowRecs.height = 25;
  headerRowRecs.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: NAVY_DARK },
    };
    cell.font = { name: "Arial", size: 10, bold: true, color: { argb: WHITE } };
    cell.alignment = { horizontal: "center", vertical: "middle" };
  });

  const dataStartRecRow = startRowRecords + 2;
  recentRecords.forEach((rec, idx) => {
    const row = worksheet.addRow([
      rec.paymentCode || `LIB${rec.id.slice(-5).toUpperCase()}`,
      rec.user?.name || "Ẩn danh",
      new Date(rec.borrowDate).toLocaleDateString("vi-VN"),
      new Date(rec.dueDate).toLocaleDateString("vi-VN"),
      rec.paymentMethod,
      rec.amount,
      rec.status,
    ]);
    row.height = 20;
    row.eachCell((cell, colNum) => {
      cell.font = { name: "Arial", size: 10 };
      cell.border = {
        top: { style: "thin", color: { argb: "D9D9D9" } },
        bottom: { style: "thin", color: { argb: "D9D9D9" } },
        left: { style: "thin", color: { argb: "D9D9D9" } },
        right: { style: "thin", color: { argb: "D9D9D9" } },
      };
      if (idx % 2 === 1)
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: ZEBRA_FILL },
        };
      if (colNum === 6) {
        cell.numberFormat = '#,##0"đ"';
        cell.alignment = { horizontal: "right", vertical: "middle" };
      }
      if (colNum === 7) {
        cell.alignment = { horizontal: "center", vertical: "middle" };
        if (rec.status === "BORROWED") {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "E2EFDA" },
          };
          cell.font = {
            name: "Arial",
            size: 10,
            color: { argb: "375623" },
            bold: true,
          };
        } else {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF2CC" },
          };
          cell.font = {
            name: "Arial",
            size: 10,
            color: { argb: "7F6000" },
            bold: true,
          };
        }
      }
    });
  });

  const finalRowRecsNum = worksheet.lastRow!.number + 1;
  const totalRowRecs = worksheet.getRow(finalRowRecsNum);
  totalRowRecs.values = ["Tổng doanh thu gần đây", "", "", "", "", ""];
  totalRowRecs.getCell(6).value = {
    formula: `=SUM(F${dataStartRecRow}:F${finalRowRecsNum - 1})`,
  };
  totalRowRecs.eachCell((cell, colNum) => {
    cell.font = { name: "Arial", size: 10, bold: true };
    cell.border = {
      top: { style: "thin", color: { argb: NAVY_DARK } },
      bottom: { style: "double", color: { argb: NAVY_DARK } },
    };
    if (colNum === 6) {
      cell.numberFormat = '#,##0"đ"';
      cell.alignment = { horizontal: "right", vertical: "middle" };
    }
  });

  // TỰ CO GIÃN CỘT
  worksheet.columns.forEach((col) => {
    let maxLen = 0;
    col.eachCell!({ includeEmpty: false }, (cell) => {
      const valStr = cell.value ? String(cell.value) : "";
      if (!valStr.includes("BÁO CÁO THỐNG KÊ"))
        maxLen = Math.max(maxLen, valStr.length);
    });
    col.width = Math.max(maxLen + 5, 12);
  });
  worksheet.getColumn(2).width = 32;

  return workbook;
}
