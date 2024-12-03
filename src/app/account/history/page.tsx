"use client";

import { CardHistory } from "@/components/account/card-history";
import { getInvoiceByUserId } from "@/lib/data";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth-client";

const fetcherInvoicePending = async (userId: string) => {
    return getInvoiceByUserId(userId, "pending");
}

export default async function History() {

    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchSessionData = async () => {
            const sessionData = await getSession();
            const storedUserId = sessionData?.data?.user?.id as string;
            if (storedUserId) {
                setUserId(storedUserId);
            } else {
                console.error("No userId found in localStorage");
            }
        };
        fetchSessionData();
    }, []);

    const { data: listInvoices, isLoading, error, mutate } = useSWR(userId ? `invoice-${userId}` : null, () => fetcherInvoicePending(userId as string),
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