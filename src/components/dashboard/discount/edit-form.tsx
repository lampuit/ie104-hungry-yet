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
import { ArrowDownToLine, DollarSign, Percent, PlusCircle } from "lucide-react";
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

// Tạo schema form với các trường dữ liệu tương ứng với cơ sở dữ liệu
const formSchema = z.object({
  file: z.string().min(1, { message: "Vui lòng tải hình ảnh lên." }),
  name: z.string().min(2, {
    message: "Tên sản phẩm phải chứa ít nhất 2 ký tự.",
  }),
  description: z.string().min(5, {
    message: "Mô tả sản phẩm phải chứa ít nhất 5 ký tự.",
  }),
  category: z.string().min(1, {
    message: "Vui lòng chọn một danh mục cho sản phẩm.",
  }),
  price: z.coerce
    .number({
      required_error:
        "Giá sản phẩm phải là một số dương và không được để trống.",
    })
    .positive({
      message: "Giá sản phẩm phải là một số dương.",
    }),
});

export function EditForm({
  product,
  categories,
}: {
  product: any;
  categories: any;
}) {
  const { toast } = useToast();

  const [isPending, setIsPending] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Định nghĩa các giá trị mặc định
    defaultValues: {
      file: product.imageUrl || "",
      name: product.name || "",
      description: product.description || "",
      category: product.categoryId || "",
      price: product.price || undefined,
    },
  });

  const formAction = async (formData: FormData) => {
    try {
      //  Tạo sản phẩm
      await createProduct(formData);

      // Hiện thông báo thành công
      toast({
        title: "Chỉnh sửa sản phẩm thành công.",
        description: `Tên sản phẩm: ${formData.get("name")}`,
      });
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
      <form ref={formRef} className="flex flex-col gap-4" action={formAction}>
        <div className="flex items-center justify-end">
          <Button
            type="submit"
            className="gap-2"
            onClick={form.handleSubmit(() => {
              setIsPending(true);
              formRef.current?.requestSubmit();
            })}
            disabled={isPending}
          >
            <ArrowDownToLine className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Lưu sản phẩm
            </span>
          </Button>
        </div>
        <div className="col-span-1 grid gap-4 xl:grid-cols-3">
          <div>
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Hình ảnh</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 p-6">
                <FormField // Field đính kèm image
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="col-span-2">Hình ảnh sản phẩm</Label>
                      <div
                        className={cn(
                          "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border-2",
                          {
                            "border-dashed hover:bg-slate-50": field.value,
                          },
                        )}
                      >
                        {field.value ? (
                          <Image
                            priority
                            src={field.value}
                            alt="preview-image"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                          />
                        ) : (
                          "Hãy tải hình ảnh lên"
                        )}
                      </div>
                      <Button
                        className="text-black"
                        type="button"
                        variant="outline"
                        asChild
                      >
                        <FormLabel>Tải hình ảnh</FormLabel>
                      </Button>
                      <FormControl>
                        <Input
                          accept="image/*"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            // Kiểm tra file đẫ được attach
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];

                              const newImageUrl = URL.createObjectURL(file);
                              field.onChange(newImageUrl);
                            }
                          }}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="xl:col-span-2">
            <div>
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Thông Tin Sản Phẩm</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 p-6">
                  <FormField // Filed nhập tên
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Tên Sản Phẩm</Label>
                        <FormControl>
                          <Input placeholder="Nhập tên sản phẩm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField // Field nhập giá
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Giá</Label>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="w-full bg-background pl-8"
                                placeholder="0.000"
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
                  </div>
                  <FormField // Field nhập mô tả
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Mô Tả Sản Phẩm</Label>
                        <FormControl>
                          <Textarea
                            className="h-[120px] resize-none"
                            placeholder="Mô tả"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Thể Loại</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            name={field.name}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn một thể loại" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category: any) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
