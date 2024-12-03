"use client";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { UnauthorizedNavbar } from "@/components/navbar/unauthorized-nav";
import { AuthorizedNavbar } from "@/components/navbar/authorized-nav";
import { getSession } from "@/lib/auth-client";
import { use, useEffect, useState } from "react";
import { metadata } from "./metadata";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { se } from "date-fns/locale";

// Font chữ chính cho toàn bộ trang web
export const montserrat = Montserrat({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
});

// Lấy session
const fetcher = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return userId;
};

// Layout chính
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: userId, error } = useSWR('userId', fetcher);

  useEffect(() => {
    if (userId !== undefined && userId !== null) {
      sessionStorage.setItem('userId', userId);
    } else if (error) {
      console.error("Failed to fetch user session:", error);
    }
  }, []);

  const pathname = usePathname();

  const isDashboardPath = pathname.startsWith("/dashboard");
  const isLoginPath = pathname.startsWith("/login");
  const isRegisterPath = pathname.startsWith("/signup");

  return (
    <html lang="en">
      <body className={`${montserrat.className} overflow-x-hidden`}>
        {!isDashboardPath && !isLoginPath && !isRegisterPath && (
          <div className="flex justify-center w-screen bg-black z-10">
            {userId ? <AuthorizedNavbar /> : <UnauthorizedNavbar />}
          </div>
        )}
        {children}
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}

