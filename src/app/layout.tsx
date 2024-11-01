import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Charm } from "next/font/google";
import "@/styles/globals.css";

export const montserrat = Montserrat({
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Hungry Yet ?",
  description: "Created by Team 7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
