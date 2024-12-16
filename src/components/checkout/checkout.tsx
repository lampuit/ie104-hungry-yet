"use client";

import { columns } from "@/components/checkout/columns";
import { DataTable } from "@/components/checkout/data-table";
import { DiscountForm } from "@/components/checkout/discount-form";
import { InformationForm } from "@/components/checkout/information-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentForm } from "@/components/checkout/payment-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { submitPayment } from "@/lib/actions/submit-payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  addressDelivery: z.string().min(1, "Địa chỉ không được để trống"), // Trường bắt buộc
  phone: z.string().regex(/^(\+84|0)\d{9,10}$/, "Số điện thoại không hợp lệ"), // Validation cho số điện thoại Việt Nam
  note: z.string().max(200, "Ghi chú không được vượt quá 200 ký tự").optional(), // Giới hạn độ dài ghi chú
});

export function Checkout({ carts, userId }: { carts: any[]; userId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [discount, setDiscount] = useState(0);
  const [discountId, setDiscountId] = useState<string | undefined>();

  const subtotal: number = carts.reduce(
    (acc, cart) => acc + cart?.product?.price * cart?.quantity,
    0,
  );

  const total = subtotal - discount;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
        if (paymentMethod == "momo") {
          if (result.paymentUrl) {
            router.push(result.paymentUrl);
          } else {
            throw new Error("Trang thanh toán không được cung cấp ");
          }
        } else {
          router.push("/checkout/success");
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-8 lg:grid-cols-2"
      >
        <div>
          <InformationForm form={form} />
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Giỏ Hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <DataTable columns={columns} data={carts} />
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                total={total}
              />
            </CardContent>
            <CardFooter>
              <DiscountForm
                subtotal={subtotal}
                discount={discount}
                discountId={discountId}
                onDiscountChange={setDiscount}
                onDiscountIdChange={setDiscountId}
              />
            </CardFooter>
          </Card>
          <PaymentForm
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </Form>
  );
}
