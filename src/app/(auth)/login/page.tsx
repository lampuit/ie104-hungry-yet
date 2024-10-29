"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
      await signIn.email({
        ...values,
        fetchOptions: {
          onError(ctx) {
            throw new Error(String(ctx?.error?.message));
          },
        },
      });
      router.push("/");
    } catch (error) {
      toast.error(`${error}.`);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-100 transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold">Đăng nhập</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-center space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="font-medium">Email</div>
                    <FormControl>
                      <Input placeholder="Nhập email" {...field} />
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
                    <div className="font-medium">Mật khẩu</div>
                    <FormControl>
                      <Input
                        placeholder="Nhập mật khẩu"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Bạn có tài tài khoản chưa nhỉ?{" "}
            <Button
              variant="link"
              className="p-0 text-blue-500 hover:underline"
              onClick={() => router.push("/signup")}
            >
              Đăng ký
            </Button>
          </div>
        </CardContent>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
}
