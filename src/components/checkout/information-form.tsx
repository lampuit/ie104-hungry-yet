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

export function InformationForm({ form }: { form: any }) {
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
