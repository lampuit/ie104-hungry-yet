"use client";

import { CardHistory } from "@/components/account/card-history";
import { getInvoiceByUserId } from "@/lib/data";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth-client";

const fetcherInvoiceCancel = async (userId: string) => {
  return getInvoiceByUserId(userId, "cancelled");
};

// Lấy userId từ session
const fetcherUserId = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return userId;
};

export default function Cancel() {
  const { data: userId } = useSWR("userId", fetcherUserId);
  const {
    data: listInvoices,
    isLoading,
    error,
    mutate,
  } = useSWR(
    userId ? `invoice-${userId}` : null,
    () => fetcherInvoiceCancel(userId as string),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      onError: (err) => {
        console.error("Error fetching favorite data", err);
      },
    },
  );

  if (error) {
    console.error("Error loading data", error);
  }

  useEffect(() => {
    if (error) {
      console.error("SWR error:", error);
      mutate(); // Retry on error
    }
  }, [error, mutate]);
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col gap-4">
      {listInvoices?.map((invoice: any) => {
        return <CardHistory key={invoice.id} invoice={invoice} />;
      })}
    </div>
  );
}
