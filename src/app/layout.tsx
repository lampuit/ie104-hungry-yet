"use client";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { UnauthorizedNavbar } from "@/components/navbar/unauthorized-nav";
import { AuthorizedNavbar } from "@/components/navbar/authorized-nav";
import { getSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import Footer from "@/components/ui/footer";

// Font chữ chính cho toàn bộ trang web
export const montserrat = Montserrat({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  adjustFontFallback: false,
});

// Lấy session
const fetcherUserId = async () => {
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
  const { data: userId } = useSWR("userId", fetcherUserId);

  const pathname = usePathname();

  const isDashboardPath = pathname.startsWith("/dashboard");
  const isLoginPath = pathname.startsWith("/login");
  const isRegisterPath = pathname.startsWith("/signup");
  const isAccountPath = pathname.startsWith("/account");
  const isHomePath = pathname === "/";

  return (
    <html lang="en">
      <body
        className={`${montserrat.className} flex min-h-screen w-screen flex-col overflow-x-clip`}
      >
        {!isDashboardPath && !isLoginPath && !isRegisterPath && (
          <div
            className={`z-30 flex w-full justify-center bg-black ${isHomePath ? "sticky top-0" : ""}`}
          >
            {userId ? <AuthorizedNavbar /> : <UnauthorizedNavbar />}
          </div>
        )}
        <div className="grow">{children}</div>
        {!isDashboardPath && !isLoginPath && !isRegisterPath && <Footer />}
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
