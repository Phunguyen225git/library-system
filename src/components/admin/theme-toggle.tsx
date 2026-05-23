// src/components/admin/theme-toggle.tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/src/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Đổi chế độ sáng/tối"
    >
      {/* Icon Mặt trời: Hiển thị ở chế độ Light, ẩn ở chế độ Dark */}
      <Sun
        className="h-[22px] w-[22px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500"
        strokeWidth={2.2}
      />

      {/* Icon Mặt trăng: Ẩn ở chế độ Light, hiển thị ở chế độ Dark */}
      <Moon
        className="h-[22px] w-[22px] absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400"
        strokeWidth={2.2}
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
