import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//of LOANS
interface OverdueResult {
  isOverdue: boolean;
  overdueDays: number;
  fineAmount: number;
}

/**
 * Hàm tự động tính toán số ngày quá hạn và số tiền phạt phát sinh
 * @param dueDateString Ngày hết hạn trả sách (Dạng chuỗi ISO hoặc Date)
 * @param finePerDay Số tiền phạt cho mỗi ngày quá hạn (Mặc định là 5.000đ/ngày)
 */
export function calculateOverdue(
  dueDateString: string | Date,
  finePerDay: number = 5000
): OverdueResult {
  const currentDate = new Date();
  const dueDate = new Date(dueDateString);

  // Đặt giờ về 00:00:00 để so sánh chính xác theo ngày, tránh lệch múi giờ mili-giây
  currentDate.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  // Nếu chưa đến hạn hoặc bằng ngày hẹn trả thì không bị phạt
  if (currentDate <= dueDate) {
    return { isOverdue: false, overdueDays: 0, fineAmount: 0 };
  }

  // Tính số ngày chênh lệch
  const diffTime = currentDate.getTime() - dueDate.getTime();
  const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Quy đổi từ mili-giây sang ngày

  // Tính tổng tiền phạt
  const fineAmount = overdueDays * finePerDay;

  return {
    isOverdue: true,
    overdueDays,
    fineAmount,
  };
}
