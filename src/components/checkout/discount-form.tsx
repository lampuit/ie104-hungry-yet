import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { fetchValidDiscount } from "@/lib/data";

export function DiscountForm({
  subtotal,
  discount,
  discountId,
  onDiscountChange,
  onDiscountIdChange,
}: {
  subtotal: number;
  discount: number;
  discountId: string | undefined;
  onDiscountChange: (value: number) => void;
  onDiscountIdChange: (value: string | undefined) => void;
}) {
  const { toast } = useToast();
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const applyDiscount = useCallback(
    async (code: string) => {
      if (!code.trim()) {
        toast({
          title: "Lỗi",
          description: "Vui lòng nhập mã giảm giá.",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      try {
        const discountResult = await fetchValidDiscount(code.trim());

        if (discountResult?.discount) {
          const discountValue = (discountResult.discount / 100) * subtotal;
          onDiscountChange(discountValue);
          onDiscountIdChange(discountResult.id);
          setIsDiscountApplied(true);
          setDiscountCode(code); // Lưu mã giảm giá vào state

          toast({
            title: "Thành Công",
            description: "Mã giảm giá áp dụng thành công!",
          });
        } else {
          onDiscountChange(0);
          onDiscountIdChange(undefined);
          setIsDiscountApplied(false);
          toast({
            title: "Mã Không Hợp Lệ",
            description: "Mã giảm giá không hợp lệ hoặc đã hết hạn.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Lỗi áp dụng mã:", error);
        onDiscountChange(0);
        onDiscountIdChange(undefined);
        setIsDiscountApplied(false);
        toast({
          title: "Lỗi",
          description:
            "Đã xảy ra lỗi khi áp dụng mã giảm giá. Vui lòng thử lại.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [onDiscountChange, onDiscountIdChange, subtotal, toast],
  );

  useEffect(() => {
    if (discountId && !isDiscountApplied) {
      applyDiscount(discountId);
    }
  }, [discountId, isDiscountApplied, applyDiscount]);

  const removeDiscount = () => {
    onDiscountChange(0);
    onDiscountIdChange(undefined);
    setIsDiscountApplied(false);
    setDiscountCode("");

    toast({
      title: "Mã Đã Hủy",
      description: "Mã giảm giá đã được hủy khỏi đơn hàng của bạn.",
    });
  };

  return (
    <div className="flex w-full flex-col items-center space-y-4">
      <div className="flex w-full space-x-2">
        <Input
          placeholder="Nhập mã giảm giá"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          disabled={isDiscountApplied || isLoading}
        />
        {isDiscountApplied ? (
          <Button
            variant="outline"
            type="button"
            onClick={removeDiscount}
            disabled={isLoading}
          >
            Hủy mã
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => applyDiscount(discountCode)}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Áp dụng"}
          </Button>
        )}
      </div>
      {discount > 0 && (
        <p className="text-sm text-green-600">
          Áp dụng mã <strong>&quot;{discountCode}&quot;</strong> thành công!
        </p>
      )}
    </div>
  );
}
