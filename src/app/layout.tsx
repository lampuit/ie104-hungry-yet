"use client";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UnauthorizedNavbar } from "@/components/navbar/unauthorized-nav";
import { AuthorizedNavbar } from "@/components/navbar/authorized-nav";
import { getSession } from "@/lib/auth-client";
import { use, useEffect, useState } from "react";
import { metadata } from "./metadata";
import { usePathname } from "next/navigation";
import useSWR from "swr";

// Font chữ chính cho toàn bộ trang web
export const montserrat = Montserrat({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
});

// Lấy userId từ session
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
  const pathname = usePathname();

  const isDashboardPath = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body className={`${montserrat.className} overflow-x-hidden`}>
        {!isDashboardPath && (
          <div className="flex justify-center w-screen bg-black z-10">
            {userId ? <AuthorizedNavbar /> : <UnauthorizedNavbar />}
          </div>
        )}
        {children}
        <Toaster />
      </body>
    </html>
  );
}

