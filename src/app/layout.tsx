import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UnauthorizedNavbar } from "@/components/navbar/unauthorized-nav";
import { AuthorizedNavbar } from "@/components/navbar/authorized-nav";

export const montserrat = Montserrat({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hungry Yet ?",
  description: "Created by Team 8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} overflow-x-hidden`}>
        <div className="flex justify-center w-screen bg-black z-10">
          <UnauthorizedNavbar />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

