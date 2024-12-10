"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Loader2, Home, ArrowRight, Truck, UtensilsCrossed } from 'lucide-react';
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
import { getUserById } from "@/lib/data";

const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

export default function Signin() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsPending(true);
      const response = await signIn.email({
        ...values,
        fetchOptions: {
          onError(ctx) {
            throw new Error(String(ctx?.error?.message));
          },
        },
      });

      const userId = response?.data?.user?.id as string;

      if (userId) {
        const userInfoArray = await getUserById(userId);
        const userInfo = userInfoArray[0];

        if (userInfo.role === "admin") {
          router.push("/dashboard");
        }
        else
          router.push("/");

      }

    } catch (error) {
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
              Hungry Yet?
            </h1>
            <h2 className="text-2xl font-bold text-gray-800">
              Chào mừng trở lại!
            </h2>
          </div>
          <p className="text-gray-600 text-lg flex items-center justify-center space-x-2">
            <UtensilsCrossed className="w-5 h-5" />
            <span>Đăng nhập để đặt món ăn ngon</span>
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email của bạn" {...field} className="bg-orange-50" />
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
                      <Input
                        placeholder="Mật khẩu"
                        type="password"
                        {...field}
                        className="bg-orange-50"
                      />
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
                    Đang đăng nhập...
                  </>
                ) : (
                  <>
                    Đăng nhập
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <Button
              variant="link"
              className="p-0 text-orange-500 hover:text-orange-600"
              onClick={() => router.push("/signup")}
            >
              Đăng ký ngay
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
