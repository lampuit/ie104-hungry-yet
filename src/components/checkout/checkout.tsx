"use client";

import { columns } from "@/components/checkout/columns";
import { DataTable } from "@/components/checkout/data-table";
import { DiscountForm } from "@/components/checkout/discount-form";
import { InformationForm } from "@/components/checkout/information-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentForm } from "@/components/checkout/payment-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { submitPayment } from "@/lib/actions/submit-payment";
import { fetchValidDiscount } from "@/lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { getSession } from "@/lib/auth-client";
import useSWR from "swr";

// Lấy userId từ session
const fetcherUserId = async () => {
    const response = await getSession();
    const userId = response?.data?.user?.id as string;
    return userId;
};

const formSchema = z.object({
  street: z.string().min(1, "Địa chỉ không được để trống"), // Trường bắt buộc
  province: z.string().min(1, "Tỉnh thành không được để trống"), // Trường bắt buộc
  district: z.string().optional(), // Tùy chọn, không cần ràng buộc thêm
  ward: z.string().optional(), // Tùy chọn, không cần ràng buộc thêm
  phone: z.string().regex(/^(\+84|0)\d{9,10}$/, "Số điện thoại không hợp lệ"), // Validation cho số điện thoại Việt Nam
  note: z.string().max(200, "Ghi chú không được vượt quá 200 ký tự"), // Giới hạn độ dài ghi chú
});

export function Checkout({ carts }: { carts: any[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: userId } = useSWR("userId", fetcherUserId);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [discount, setDiscount] = useState(0);
  const [discountId, setDiscountId] = useState<string | undefined>();

  const subtotal: number = carts.reduce(
    (acc, cart) => acc + cart.product.price * cart.quantity,
    0,
  );

  const total = subtotal;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // TEST
  };

  const handlePayment = async () => {
    try {
      if (!userId) {
        throw new Error("User ID is required for payment");
      }

      const result = await submitPayment(
        carts,
        total,
        discountId,
        paymentMethod,
        userId || "",
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
            <DiscountForm
              subtotal={subtotal}
              discount={discount}
              onDiscountChange={setDiscount}
              onDiscountIdChange={setDiscountId}
            />
          </Card>
          <PaymentForm
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onSubmit={handlePayment}
          />
        </div>
      </form>
    </Form>
  );
}
