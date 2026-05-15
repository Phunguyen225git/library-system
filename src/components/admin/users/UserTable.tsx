/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/users/user-table.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Edit, Trash2, User, ShieldCheck, Mail } from "lucide-react";

// Định nghĩa kiểu dữ liệu cho User (giống với Prisma Schema của bạn)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UserTable({
  users,
  onEditRole,
  onDelete,
}: {
  users: any[];
  onEditRole: (user: any) => void;
  onDelete: (user: any) => void;
}) {
  return (
    <div className="border rounded-md bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[80px] text-center">Avatar</TableHead>
            <TableHead>Thông tin độc giả</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Ngày tham gia</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-slate-50 transition-colors"
              >
                {/* CỘT 1: AVATAR MẶC ĐỊNH */}
                <TableCell className="flex justify-center py-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {user.role === "ADMIN" ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                </TableCell>

                {/* CỘT 2: TÊN VÀ EMAIL */}
                <TableCell>
                  <div className="font-semibold text-slate-800">
                    {user.name || "Chưa cập nhật tên"}
                  </div>
                  <div className="text-sm text-slate-500 flex items-center mt-1">
                    <Mail className="w-3 h-3 mr-1" />
                    {user.email}
                  </div>
                </TableCell>

                {/* CỘT 3: VAI TRÒ (ROLE) */}
                <TableCell>
                  <Badge
                    variant={user.role === "ADMIN" ? "destructive" : "default"}
                    className={
                      user.role === "USER"
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : ""
                    }
                  >
                    {user.role === "ADMIN" ? "Quản trị viên" : "Độc giả"}
                  </Badge>
                </TableCell>

                {/* CỘT 4: NGÀY THAM GIA */}
                <TableCell className="text-slate-600 text-sm">
                  {new Date(user.createdAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>

                {/* CỘT 5: NÚT THAO TÁC */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditRole(user)}
                      className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                      title="Cấp quyền"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(user)}
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      title="Xóa tài khoản"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-slate-500"
              >
                <div className="flex flex-col items-center justify-center">
                  <User className="w-8 h-8 text-slate-300 mb-2" />
                  <p>Hệ thống chưa có độc giả nào.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
