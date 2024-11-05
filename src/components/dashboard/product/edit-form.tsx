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

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { editProduct } from "@/lib/actions/product";
import { del, head } from "@vercel/blob";

const formSchema = z.object({
  imageUrl: z.string({ required_error: "Vui lòng tải hình ảnh lên." }),
  name: z.string().min(2, {
    message: "Tên sản phẩm phải chứa ít nhất 2 ký tự.",
  }),
  description: z.string().min(5, {
    message: "Mô tả sản phẩm phải chứa ít nhất 5 ký tự.",
  }),
  category: z.string().nonempty({
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
  // discount: z
  //   .number({
  //     required_error:
  //       "Giảm giá phải là số từ 0% trở lên và không được để trống.",
  //   })
  //   .min(0, {
  //     message: "Giảm giá phải là số từ 0% trở lên.",
  //   })
  //   .max(100, {
  //     message: "Giảm giá không thể vượt quá 100%.",
  //   }),
});

export function EditForm({
  categories,
  product,
}: {
  categories: any;
  product: any;
}) {
  const { toast } = useToast();

  const [file, setFile] = useState<File | null>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: product.imageUrl,
      name: product.name,
      description: product.description,
      category: product.categoryId,
      price: product.price,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();

      let imageUrl = values.imageUrl;

      console.log(imageUrl);

      if (imageUrl != product.imageUrl && file) {
        await del(product.imageUrl);
      }
      console.log(imageUrl);
      formData.append("imageUrl", imageUrl);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("price", values.price.toString());

      await editProduct(product.id, formData);

      toast({
        title: "Chỉnh sửa sản phẩm thành công.",
        description: `Tên sản phẩm: ${values.name}`,
      });
    } catch (error) {
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
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-end">
          <Button className="gap-2">
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
                <Label className="col-span-2">Hình ảnh sản phẩm</Label>
                <div
                  className={cn(
                    "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border-2",
                    {
                      "border-dashed hover:bg-slate-50":
                        !form.getValues("imageUrl"),
                    },
                  )}
                >
                  {form.getValues("imageUrl") ? (
                    <Image
                      priority
                      src={form.getValues("imageUrl")}
                      alt="image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    "Hãy tải hình ảnh lên"
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
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
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setFile(e.target.files[0]);
                              form.setValue(
                                "imageUrl",
                                URL.createObjectURL(e.target.files[0]),
                              );
                            }
                          }}
                          accept="image/*"
                          type="file"
                          className="hidden"
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
                  <FormField
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
                    <FormField
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
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
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