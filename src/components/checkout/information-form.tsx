"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserById } from "@/lib/data";
import useSWR from "swr";
import { getSession } from "@/lib/auth-client";
import LoadingSpinner from "../ui/loading-spinner";
import { useEffect } from "react";

const fetcherUserId = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return userId;
}

const fetcherUser = async (userId: string) => {
  return await getUserById(userId);
}

export function InformationForm({ form }: { form: any }) {
  const { data: userId, error: errorGetUserId } = useSWR("userId", fetcherUserId);
  if (errorGetUserId) {
    return <div>Có lỗi xảy ra khi lấy userId</div>
  }
  const { data: user, isLoading } = useSWR(userId, fetcherUser);
  if (isLoading || !user) {
    return <LoadingSpinner />
  }

  useEffect(() => {
    if (user) {
      form.reset({
        street: user[0]?.address || "",
        province: "",
        district: "",
        ward: "",
        phone: user[0]?.phone || "",
        note: "",
      });
    }
  }, [user, form]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông Tin Đơn Hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa Chỉ Giao Hàng</FormLabel>
              <FormControl>
                <Input placeholder="Nhập địa chỉ" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỉnh Thành</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tỉnh thành"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận Huyện (tùy chọn)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập quận huyện"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phường Xã (tùy chọn)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập phường xã"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Số Điện Thoại</FormLabel>
              <FormControl className="w-full">
                <PhoneInput {...field} defaultCountry="VN" />
              </FormControl>
              <FormDescription>Điền số điện thoại</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi Chú</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ghi chú cho nhân viên"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
