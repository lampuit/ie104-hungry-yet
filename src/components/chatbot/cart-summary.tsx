import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingCart, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { createCart, deleteCart, updateCart } from "@/lib/actions/chatbot";
import { Badge } from "@/components/ui/badge";

function DongFormat(number: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

export default function CartSummary({
  carts,
  discount,
}: {
  carts: any[];
  discount: number;
}) {
  const { data: session } = useSession();
  const [items, setItems] = useState<any[]>(carts);
  const [isPending, setIsPending] = useState(false);

  if (!session) throw new Error("Không có session");

  const updateQuantity = async (productId: string, change: number) => {
    const updatedItems = items.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item,
    );

    setItems(updatedItems);

    const updatedItem = updatedItems.find(
      (item) => item.product.id === productId,
    );

    if (!updatedItem) return;

    try {
      setIsPending(true);

      if (updatedItem.quantity === 0) {
        await deleteCart({
          productId: productId,
          userId: session.user.id,
        });
      } else if (updatedItem.quantity === 1 && change === 1) {
        await createCart({
          productId: productId,
          userId: session.user.id,
          quantity: updatedItem.quantity,
        });
      } else {
        await updateCart({
          productId: productId,
          userId: session.user.id,
          quantity: updatedItem.quantity,
        });
      }
    } catch (error) {
      console.error("Error updating cart", error);
    } finally {
      setIsPending(false);
    }
  };

  const subtotal = items.reduce(
    (acc, cart) => acc + cart.product.price * cart.quantity,
    0,
  );

  const totaldiscount = discount ? (subtotal * discount) / 100 : 0;

  const total = subtotal - totaldiscount;

  const totalcart = items.filter((cart) => cart.quantity > 0).length;

  return (
    items.length > 0 && (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart size={38} />
              <Badge className="absolute -top-1.5 left-full min-w-4 -translate-x-3.5 border-background px-2">
                {totalcart}
              </Badge>
            </div>
            Giỏ Hàng Của Bạn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-8">
            {items.map((item, index) => (
              <li
                key={index}
                className={cn("flex items-center gap-4", {
                  "opacity-50": item.quantity === 0,
                })}
              >
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
                <div className="grow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.product.name}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {DongFormat(item.product.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="z-50 h-6 w-6"
                        onClick={() => updateQuantity(item.product.id, -1)}
                        disabled={isPending}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="z-50 h-6 w-6"
                        onClick={() => updateQuantity(item.product.id, 1)}
                        disabled={isPending}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Separator className="mb-4" />
          <div className="flex w-full justify-between text-sm">
            <span>Tạm tính:</span>
            <span>{DongFormat(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="mt-1 flex w-full justify-between text-sm text-green-600">
              <span>Giảm giá:</span>
              <span>-{DongFormat(totaldiscount)}</span>
            </div>
          )}
          <Separator className="my-4" />
          <div className="flex w-full justify-between font-semibold">
            <span>Tổng:</span>
            <span>{DongFormat(total)}</span>
          </div>
        </CardFooter>
      </Card>
    )
  );
}
