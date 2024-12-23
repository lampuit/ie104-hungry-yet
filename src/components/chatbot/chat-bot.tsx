import { BotMessageSquare } from "lucide-react";

import Link from "next/link";

export function Chatbot() {
  return (
    <Link
      className="fixed bottom-12 right-12 z-40 rounded-full bg-amber-500 p-2"
      href="/chatbot"
    >
      <BotMessageSquare className="stroke-white" size={32} />
    </Link>
  );
}
