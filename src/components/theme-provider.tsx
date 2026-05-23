"use client";

import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { ThemeProvider as NextThemesProvider } from "next-themes"; // 🌟 1. Import thư viện mới

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* 🌟 2. Bọc NextThemesProvider ở đây để toàn bộ hệ thống nhận diện được class="dark" */}
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
}
