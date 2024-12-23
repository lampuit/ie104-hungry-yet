"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function SheetModal({ children }: { children: ReactNode }) {
  const router = useRouter();

  // Xử lý openChange khi người dùng nhấp quay lại lịch sử
  const handleOpenChange = () => router.back();
  return (
    <Sheet
      open={true}
      defaultOpen={true}
      onOpenChange={handleOpenChange}
      modal={true}
    >
      {children}
    </Sheet>
  );
}
