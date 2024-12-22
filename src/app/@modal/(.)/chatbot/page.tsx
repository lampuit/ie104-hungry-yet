"use client";

import { ChatMessages } from "@/components/chatbot/chat-message";
import { MessageList } from "@/components/chatbot/mesage-list";
import { SheetModal } from "@/components/modal/sheet-modal";
import { Button } from "@/components/ui/button";
import { ChatContainer, ChatForm } from "@/components/ui/chat";
import LoginPrompt from "@/components/ui/login-prompt";
import { MessageInput } from "@/components/ui/message-input";
import { PromptSuggestions } from "@/components/ui/prompt-suggestions";
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

export default function Chatbot() {
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
    <SheetModal>
      <SheetContent className="flex h-full w-full flex-col sm:max-w-5xl">
        <SheetHeader className="flex-none">
          <SheetTitle>Chatbot</SheetTitle>
          <SheetDescription>
            Sử dụng hội thoại trực tuyến để đặt món ăn
          </SheetDescription>
        </SheetHeader>
        {session ? (
          <ChatContainer className="mt-8 min-h-0 flex-1">
            {isEmpty && (
              <PromptSuggestions
                label="Bắt đầu với các câu hỏi &#129348;"
                append={append}
                suggestions={["Hướng dẫn đặt đồ ăn", "Cho tôi xem thực đơn"]}
              />
            )}
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
            <LoginPrompt />
            <Button asChild>
              <Link href="/login">Đăng nhập</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </SheetModal>
  );
}
