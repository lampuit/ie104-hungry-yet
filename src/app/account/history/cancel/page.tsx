"use client";

import { CardHistory } from "@/components/account/card-history";
import { getInvoiceByUserId } from "@/lib/data";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth-client";

const fetcherInvoiceCancel = async (userId: string) => {
    return getInvoiceByUserId(userId, "cancelled");
}

export default function Cancel() {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const session = await getSession();
            const storedUserId = session?.data?.user?.id as string;
            if (storedUserId) {
                setUserId(storedUserId);
            } else {
                console.error("No userId found in localStorage");
            }
        };
        fetchUserId();
    }, []);

    const { data: listInvoices, isLoading, error, mutate } = useSWR(userId ? `invoice-${userId}` : null, () => fetcherInvoiceCancel(userId as string),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            refreshInterval: 0,
            onError: (err) => {
                console.error("Error fetching favorite data", err);
            }
        });

    if (error) {
        console.error("Error loading data", error);
    }

    useEffect(() => {
        if (error) {
            console.error("SWR error:", error);
            mutate(); // Retry on error
        }
    }, [error, mutate]);
    return (
        isLoading ? <LoadingSpinner /> :
            <div className="bg-white rounded-lg shadow-md flex flex-col gap-2">
                {
                    listInvoices?.map((invoice: any) => {
                        return <CardHistory key={invoice.id} invoice={invoice} />
                    })
                }
            </div>
    )
}