// src/components/auth-provider.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/src/components/ui/tooltip";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* Tiện tay bọc luôn cả TooltipProvider của Sidebar vào đây cho sạch code layout */}
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </SessionProvider>
  );
}
