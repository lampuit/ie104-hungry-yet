import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Charm } from "next/font/google";
import "@/styles/globals.css";

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
    <html lang="en" className="overflow-x-hidden">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
