"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { fetchValidDiscount } from "@/lib/data";
import { useState } from "react";

export function DiscountForm({
  subtotal,
  discount,
  onDiscountChange,
  onDiscountIdChange,
}: {
  subtotal: number;
  discount: number;
  onDiscountChange: (value: number) => void;
  onDiscountIdChange: (value: string | undefined) => void;
}) {
  const { toast } = useToast();

  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  const applyDiscount = async () => {
    try {
      const discountResult = await fetchValidDiscount(discountCode);
      if (discountResult?.discount) {
        onDiscountChange((discountResult.discount / 100) * subtotal);
        onDiscountIdChange(discountResult.id);
        toast({
          title: "Thành Công",
          description: "Mã giảm giá áp dụng thành công!",
        });
      } else {
        onDiscountChange(0);
        onDiscountIdChange(undefined);
        toast({
          title: "Mã Không Hợp Lệ",
          description: "Mã giảm giá không hợp lệ hoặc hết hạn.",
          variant: "destructive",
        });
      }
    } catch (error) {
      onDiscountChange(0);
      onDiscountIdChange(undefined);
    }
  };

  const removeDiscount = () => {
    onDiscountChange(0);
    onDiscountIdChange(undefined);
    setIsDiscountApplied(false);
    setDiscountCode("");
    toast({
      title: "Discount Removed",
      description: "The discount has been removed from your order.",
    });
  };

  return (
    <CardFooter className="flex-col space-y-2">
      <div className="flex w-full space-x-2">
        <Input
          placeholder="Nhập mã giảm giá"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          disabled={isDiscountApplied}
        />
        {isDiscountApplied ? (
          <Button type="button" onClick={removeDiscount}>
            Hủy mã
          </Button>
        ) : (
          <Button type="button" onClick={applyDiscount}>
            Áp dụng
          </Button>
        )}
      </div>
      {discount > 0 && (
        <p className="text-sm text-green-600">
          Áp dụng mã &quot;{discountCode}&quot; thành công!
        </p>
      )}
    </CardFooter>
  );
}
