"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Loader2, Home, ArrowRight, Truck, UtensilsCrossed, User, Mail, Phone, Lock } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  name: z.string().min(1, "Tên người dùng không hợp lệ!"),
  role: z.string().optional(),
  phone: z.string().min(10, "Số điện thoại không hợp lệ!"),
});

export default function Sign() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsPending(true);
      await signUp.email({
        ...values,
        fetchOptions: {
          onError(ctx) {
            throw new Error(String(ctx?.error?.message));
          },
        },
      });
      router.push("/login");
    } catch (error) {
      setIsPending(false);

      toast.error(`${error}.`);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 bg-amber-500 text-white p-4 rounded-full w-24 h-24 mx-auto">
            <Truck className="w-12 h-12 stroke-2" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-orange-600 tracking-tight">
              Đăng ký ngay!
            </h1>
            <h2 className="text-2xl font-bold text-gray-800">
              Tham gia cùng chúng tôi
            </h2>
          </div>
          <p className="text-gray-600 text-lg flex items-center justify-center space-x-2">
            <UtensilsCrossed className="w-5 h-5" />
            <span>Đăng ký để khám phá món ngon</span>
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Họ và Tên" {...field} className="bg-orange-50 pl-10" />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Email" {...field} className="bg-orange-50 pl-10" />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Số điện thoại" {...field} className="bg-orange-50 pl-10" />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Mật khẩu" type="password" {...field} className="bg-orange-50 pl-10" />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang đăng ký...
                  </>
                ) : (
                  <>
                    Đăng ký
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-600">
            Bạn đã có tài khoản?{" "}
            <Button
              variant="link"
              className="p-0 text-orange-500 hover:text-orange-600"
              onClick={() => router.push("/login")}
            >
              Đăng nhập ngay
            </Button>
          </div>
          <Button
            variant="outline"
            className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Quay về trang chủ
          </Button>
        </CardFooter>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
}
