import CartSummary from "@/components/chatbot/cart-summary";
import { Checkout } from "@/components/chatbot/checkout";
import InvoiceListCard from "@/components/chatbot/invoice-list";
import { InvoiceTracking } from "@/components/chatbot/invoice-tracking";
import ProductDetailCard from "@/components/chatbot/product-detail-card";
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
          {message.content && message.appear !== false && (
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
                      {toolName === "displayProductDetail" ? (
                        <ProductDetailCard {...result} append={append} />
                      ) : null}
                      {toolName === "displayProductByCategory" ? (
                        <ProductList {...result} append={append} />
                      ) : null}
                      {toolName === "displayCart" ? (
                        <CartSummary {...result} />
                      ) : null}
                      {toolName === "getInvoices" ? (
                        <InvoiceListCard {...result} append={append} />
                      ) : null}
                      {toolName === "trackingInvoice" ? (
                        <InvoiceTracking {...result} />
                      ) : null}
                      {toolName === "checkingInformation" ? (
                        <Checkout {...result} append={append} />
                      ) : null}
                    </div>
                  );
                } else {
                  return (
                    <div key={toolCallId}>
                      {toolName === "displayProductsByCategory" ? (
                        <Skeleton className="h-[10px] w-full max-w-md" />
                      ) : null}
                      {toolName === "displayProductByCategory" ? (
                        <Skeleton className="h-[100px] w-full max-w-md" />
                      ) : null}
                      {toolName === "displayCart" ? (
                        <Skeleton className="h-[100px] w-full max-w-md" />
                      ) : null}
                      {toolName === "getInvoices" ? (
                        <Skeleton className="h-[100px] w-full max-w-md" />
                      ) : null}
                      {toolName === "trackingInvoice" ? (
                        <Skeleton className="h-[100px] w-full max-w-2xl" />
                      ) : null}
                      {toolName === "checkingInformation" ? (
                        <Skeleton className="h-[200px] w-full max-w-xl" />
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
