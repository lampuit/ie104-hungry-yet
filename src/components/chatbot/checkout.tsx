"use client";

import { DiscountForm } from "@/components/checkout/discount-form";
import { InformationForm } from "@/components/checkout/information-form";
import { PaymentForm } from "@/components/checkout/payment-form";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { submitPayment } from "@/lib/actions/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Value } from "react-phone-number-input";
import z from "zod";

const formSchema = z.object({
  addressDelivery: z.string().min(1, "Địa chỉ không được để trống"), // Trường bắt buộc
  phone: z.string().regex(/^(\+84|0)\d{9,10}$/, "Số điện thoại không hợp lệ"), // Validation cho số điện thoại Việt Nam
  note: z.string().max(200, "Ghi chú không được vượt quá 200 ký tự").optional(), // Giới hạn độ dài ghi chú
});

export function Checkout({
  carts,
  userId,
  discount_code,
  address,
  phone,
  note,
  append,
}: {
  carts: any[];
  userId: string;
  discount_code?: string;
  total: number;
  address: string;
  phone: string;
  note: string;
  append: any;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [discount, setDiscount] = useState(0);
  const [discountId, setDiscountId] = useState<string | undefined>(
    discount_code || "",
  );

  const subtotal = carts.reduce(
    (acc, cart) => acc + cart?.product?.price * cart?.quantity,
    0,
  );

  const total = subtotal - discount;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressDelivery: address || "",
      phone: phone || ("" as Value),
      note: note || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!userId) {
        throw new Error("User ID is required for payment");
      }

      const result = await submitPayment(
        carts,
        total,
        discountId,
        paymentMethod,
        userId,
        values.addressDelivery,
        40,
        values.note || "",
        values.phone,
      );

      if (result.success) {
        append({
          role: "assistant",
          content: `Người dùng đã đặt đơn hàng mới ${result.invoiceId} thành công`,
          appear: false,
        });
        if (paymentMethod == "momo") {
          if (result.paymentUrl) {
            window.open(result.paymentUrl, "_blank", "noopener,noreferrer");
          } else {
            throw new Error("Trang thanh toán không được cung cấp ");
          }
        }
      } else {
        throw new Error(result.error || "Payment failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Thanh Toán Lỗi",
          description: error.message,
          action: <ToastAction altText="Thử lại">Thử lại</ToastAction>,
        });
      }
    }
  };

  return (
    carts.length > 0 && (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative z-50 w-full max-w-xl space-y-4"
        >
          <InformationForm form={form} />
          <div className="border p-6">
            <DiscountForm
              subtotal={subtotal}
              discount={discount}
              discountId={discountId}
              onDiscountChange={setDiscount}
              onDiscountIdChange={setDiscountId}
            />
          </div>
          <PaymentForm
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    )
  );
}
