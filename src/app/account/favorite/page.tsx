"use client";

import { AccountFavorite } from "@/components/account/card-favorite";
import { getFavoriteByUserId } from "@/lib/data";
import useSWR from "swr";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { getSession } from "@/lib/auth-client";
import LoginPrompt from "@/components/ui/login-prompt";

const favoriteFetcher = async (userId: string) => {
  if (!userId) throw new Error("User ID is required");
  const data = await getFavoriteByUserId(userId);
  if (!data) throw new Error("No data returned from getFavoriteByUserId");
  return data;
};

// Lấy userId từ session
const fetcherUserId = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return userId;
};

export default function Favorite() {
  const { data: userId } = useSWR("userId", fetcherUserId);

  const {
    data: listFavorite,
    isLoading,
    error,
    mutate,
  } = useSWR(
    userId ? `favorites-${userId}` : null,
    () => favoriteFetcher(userId as string),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      onError: (err) => {
        console.error("Error fetching favorite data", err);
      },
    },
  );

  useEffect(() => {
    if (error) {
      console.error("SWR error:", error);
      mutate(); // Retry on error
    }
  }, [error, mutate]);

  if (!userId) {
    return <LoginPrompt />;
  }

  return (
    <div className="flex grow flex-col gap-6">
      <h1 className="text-2xl font-semibold">Danh mục yêu thích</h1>
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div>Error loading favorites. Please try again.</div>
        ) : listFavorite && listFavorite.length > 0 ? (
          <AccountFavorite
            listFavorite={listFavorite}
            isLoading={isLoading}
            mutate={mutate}
          />
        ) : (
          <div>Không có món ăn nào trong danh mục yêu thích.</div>
        )}
      </div>
    </div>
  );
}
