"use client";

import { ChatMessages } from "@/components/chatbot/chat-message";
import { MessageList } from "@/components/chatbot/mesage-list";
import { Button } from "@/components/ui/button";
import { ChatContainer, ChatForm } from "@/components/ui/chat";
import { MessageInput } from "@/components/ui/message-input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "@/lib/auth-client";

import { useChat } from "ai/react";
import Link from "next/link";

export default function Page() {
  const { data: session } = useSession();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    append,
  } = useChat();

  const lastMessage = messages.at(-1);
  const isEmpty = messages.length === 0;
  const isTyping =
    lastMessage?.role === "user" || (!lastMessage?.content && !isEmpty);

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col sm:max-w-5xl">
        <SheetHeader className="flex-none">
          <SheetTitle>Chatbot</SheetTitle>
          <SheetDescription>
            Sử dụng hội thoại trực tuyến để đặt món ăn
          </SheetDescription>
        </SheetHeader>
        {session ? (
          <ChatContainer className="mt-8 min-h-0 flex-1">
            <ChatMessages messages={messages}>
              {!isEmpty && (
                <MessageList
                  messages={messages}
                  isTyping={isTyping}
                  append={append}
                />
              )}
            </ChatMessages>
            <ChatForm
              isPending={isLoading || isTyping}
              handleSubmit={handleSubmit}
            >
              {() => (
                <MessageInput
                  value={input}
                  onChange={handleInputChange}
                  isGenerating={isLoading || isTyping}
                  stop={stop}
                />
              )}
            </ChatForm>
          </ChatContainer>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center space-y-4">
            <span>Vui lòng đăng nhập để sử dụng chức năng này</span>
            <Button asChild>
              <Link href="/login">Đăng nhập</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
