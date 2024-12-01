"use client";

import { AccountFavorite } from "@/components/account/card-favorite";
import { getFavoriteByUserId } from "@/lib/data";
import useSWR from "swr";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

const favoriteFetcher = async (userId: string) => {
    if (!userId) throw new Error("User ID is required");
    const data = await getFavoriteByUserId(userId);
    if (!data) throw new Error("No data returned from getFavoriteByUserId");
    return data;
}

export default function Favorite() {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = sessionStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error("No userId found in localStorage");
        }
    }, []);

    const { data: listFavorite, isLoading, error, mutate } = useSWR(
        userId ? `favorites-${userId}` : null,
        () => favoriteFetcher(userId as string),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            refreshInterval: 0,
            onError: (err) => {
                console.error("Error fetching favorite data", err);
            }
        }
    );

    useEffect(() => {
        if (error) {
            console.error("SWR error:", error);
            mutate(); // Retry on error
        }
    }, [error, mutate]);

    if (!userId) {
        return <div>Vui lòng đăng nhập để xem danh sách yêu thích!</div>;
    }

    return (
        <div className="grow flex flex-col gap-6 px-20">
            <h1 className="text-2xl font-semibold">Danh mục yêu thích</h1>
            <div className="grow flex justify-between">
                <div className="flex flex-col w-full gap-3">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <div>Error loading favorites. Please try again.</div>
                    ) : listFavorite && listFavorite.length > 0 ? (
                        <AccountFavorite listFavorite={listFavorite} isLoading={isLoading} />
                    ) : (
                        <div>Không có món ăn nào trong danh mục yêu thích.</div>
                    )}
                </div>
            </div>
        </div>
    )
}

