"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hiện thêm lỗi cho phía người dùng
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <h2 className="text-center">Có gì đó không ổn!</h2>
      <Button
        className="mt-4"
        onClick={
          // Re-render trang web khi gặp lỗi
          () => reset()
        }
      >
        Try again
      </Button>
    </main>
  );
}
