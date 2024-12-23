"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function DialogModal({ children }: { children: ReactNode }) {
  const router = useRouter();

  // Xử lý openChange khi người dùng nhấp quay lại lịch sử
  const handleOpenChange = () => router.back();
  return (
    <Dialog open={true} defaultOpen={true} onOpenChange={handleOpenChange}>
      {children}
    </Dialog>
  );
}
