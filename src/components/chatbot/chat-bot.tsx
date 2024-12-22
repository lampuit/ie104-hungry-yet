import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import Link from "next/link";

export function Chatbot() {
  return (
    <Link
      className="fixed bottom-12 right-12 z-40 rounded-full bg-amber-500 p-2 ring-2 ring-background"
      href="/chatbot"
    >
      <MessageCircleMore className="stroke-white" size={32} />
    </Link>
  );
}
