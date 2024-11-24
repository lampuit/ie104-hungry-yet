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

import { Suspense, useRef, useState } from "react";
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
import { SmartDatetimeInput } from "@/components/ui/smart-date-time-input";

// Tạo schema form với các trường dữ liệu tương ứng với cơ sở dữ liệu
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên mã phải chứa ít nhất 2 ký tự.",
  }),
  description: z.string().min(5, {
    message: "Mô tả sản phẩm phải chứa ít nhất 5 ký tự.",
  }),
  discount: z.coerce
    .number({
      required_error: "Số ưu đãi phải là một số dương và không được để trống.",
    })
    .positive({
      message: "Giá sản phẩm phải là một số dương.",
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
      discount: undefined,
      fromDate: new Date(),
      toDate: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsPending(true);

      //  Tạo mã
      await createDiscount(values);

      // Hiện mã thành công
      toast({
        title: "Tạo mã thành công.",
        description: `Tên mã: ${values.name}`,
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
      <form
        ref={formRef}
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
        <FormField // Field nhập giá
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <Label>Giá</Label>
              <FormControl>
                <div className="relative">
                  <Percent className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="w-full bg-background pl-8"
                    placeholder="0"
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      // Kiểm tra giá trị input nếu trống truyền "undefined", ngược lại thay đổi giá trị field
                      if (e.target.value === "")
                        return field.onChange(undefined);
                      field.onChange(Number(e.target.value));
                    }}
                    name={field.name}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fromDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày Bắt Đầu</FormLabel>
              <FormControl>
                <SmartDatetimeInput
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="toDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày Kết Thúc</FormLabel>
              <FormControl>
                <SmartDatetimeInput
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Tạo mã
        </Button>
      </form>
    </Form>
  );
}
