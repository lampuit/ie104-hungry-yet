import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-extrabold">Không Tìm Thấy</h2>
      <p>Không thể tìm thấy nguồn phản hồi nào</p>
      <Button asChild>
        <Link href="/">Quay Về</Link>
      </Button>
    </div>
  );
}
