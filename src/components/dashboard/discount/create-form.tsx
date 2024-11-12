"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { set } from "zod";
import { upload } from "@vercel/blob/client";
import { DollarSign, Percent, PlusCircle } from "lucide-react";
import Image from "next/image";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { createProduct } from "@/lib/actions/product";
import { useFormState } from "react-dom";
import { product } from "remeda";
import { put } from "@vercel/blob";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import { createDiscount } from "@/lib/actions/discount";
import { useRouter } from "next/navigation";

// Tạo schema form với các trường dữ liệu tương ứng với cơ sở dữ liệu
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên mã phải chứa ít nhất 2 ký tự.",
  }),
  description: z.string().min(5, {
    message: "Mô tả sản phẩm phải chứa ít nhất 5 ký tự.",
  }),
  fromDate: z.coerce.date(),
  toDate: z.coerce.date(),
});

export function CreateForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, setIsPending] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Định nghĩa các giá trị mặc định
    defaultValues: {
      name: "",
      description: "",
      fromDate: new Date(),
      toDate: new Date(),
    },
  });

  const formAction = async (formData: FormData) => {
    try {
      // Thêm các trường dữ liệu còn thiếu khi submit -- Tiền xử lý
      const values = form.getValues();
      formData.append("fromDate", values.fromDate.toISOString());
      formData.append("toDate", values.toDate.toISOString());

      //  Tạo mã
      await createDiscount(formData);

      // Hiện mã thành công
      toast({
        title: "Tạo mã thành công.",
        description: `Tên sản phẩm: ${formData.get("name")}`,
      });

      router.back();
    } catch (error) {
      setIsPending(false);

      // Hiện thông báo lỗi
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Có gì đó sai.",
          description: error.message,
          action: <ToastAction altText="Thử lại">Thử lại</ToastAction>,
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form ref={formRef} className="space-y-8" action={formAction}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Mã</FormLabel>
              <FormControl>
                <Input placeholder="Nhập mã" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Input placeholder="Mô tả" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fromDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày Bắt Đầu</FormLabel>
              <DatetimePicker
                {...field}
                format={[
                  ["months", "days", "years"],
                  ["hours", "minutes", "am/pm"],
                ]}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fromDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày Bắt Đầu</FormLabel>
              <DatetimePicker
                {...field}
                format={[
                  ["months", "days", "years"],
                  ["hours", "minutes", "am/pm"],
                ]}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          onClick={form.handleSubmit(() => {
            setIsPending(true);
            formRef.current?.requestSubmit();
          })}
        >
          Tạo mã
        </Button>
      </form>
    </Form>
  );
}
