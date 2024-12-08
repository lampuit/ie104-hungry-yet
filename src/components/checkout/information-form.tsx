"use client";

import { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvoiceDetail } from "@/lib/data";
import useSWR from "swr";

const fetcherInvoiceInf = async (invoiceId: string) => {
  return await getInvoiceDetail(invoiceId);
}

export function InformationForm({ form }: { form: any }) {

  const invoiceId = form.getValues("invoiceId");

  const { data: invoice, isLoading, error } = useSWR(invoiceId, fetcherInvoiceInf);

  if (error) {
    console.error("Error fetching invoice data:", error);
  }


  useEffect(() => {
    if (invoice) {
      form.setValue("invoiceId", invoice.id);
      form.setValue("addressDelivery", invoice.deliveryAddress || "");
      form.setValue("phone", invoice.phone || "");
      form.setValue("note", invoice.note || "");
    }
  }, [invoice]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông Tin Đơn Hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="addressDelivery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa Chỉ Giao Hàng</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập địa chỉ"
                  type="text"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Số Điện Thoại</FormLabel>
              <FormControl className="w-full">
                <PhoneInput
                  {...field}
                  defaultCountry="VN"
                  placeholder="Điền số điện thoại"
                  disabled={isLoading}
                />
              </FormControl>
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
                  disabled={isLoading}
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

