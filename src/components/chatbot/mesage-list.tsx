import { CartSummary } from "@/components/chatbot/cart-summary";
import { ProductList } from "@/components/chatbot/product-list";
import { ChatMessage } from "@/components/ui/chat-message";
import { Skeleton } from "@/components/ui/skeleton";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { ToolInvocation } from "ai";

export function MessageList({
  messages,
  isTyping,
  append,
}: {
  messages: any;
  isTyping: boolean;
  append: any;
}) {
  return (
    <div className="space-y-4 overflow-hidden">
      {messages.map((message: any, index: any) => (
        <div key={index}>
          {message.content && (
            <ChatMessage
              id={message.id}
              role={message.role}
              content={message.content}
              createdAt={new Date()}
              showTimeStamp
              animation="none"
            />
          )}
          {message.toolInvocations && (
            <div className="space-y-4">
              {message.toolInvocations.map((toolInvocation: ToolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === "result") {
                  const { result } = toolInvocation;

                  return (
                    <div key={toolCallId}>
                      {toolName === "displayProducts" ? (
                        <ProductList {...result} append={append} />
                      ) : null}
                      {toolName === "displayCarts" ? (
                        <CartSummary {...result} />
                      ) : null}
                      {toolName === "displayCarts" ? (
                        <CartSummary {...result} />
                      ) : null}
                    </div>
                  );
                } else {
                  return (
                    <div key={toolCallId}>
                      {toolName === "displayProducts" ? (
                        <Skeleton className="h-[200px] w-[500px]" />
                      ) : null}
                      {toolName === "displayCarts" ? (
                        <Skeleton className="h-[200px] w-[650px]" />
                      ) : null}
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
}
