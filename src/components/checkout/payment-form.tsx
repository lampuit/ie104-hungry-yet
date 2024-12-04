"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export function PaymentForm({
  paymentMethod,
  onPaymentMethodChange,
  onSubmit,
}: {
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
  onSubmit: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await onSubmit();
    } catch (error) {
      console.error("Thanh toán lỗi: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phương Thức Thanh Toán</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="momo" id="momo" />
            <Label htmlFor="momo" className="flex items-center space-x-2">
              Ví điện tử MOMO
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paylater" id="paylater" />
            <Label htmlFor="paylater" className="flex items-center space-x-2">
              Trả tiền mặt
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
          Đặt Đơn
        </Button>
      </CardFooter>
    </Card>
  );
}
