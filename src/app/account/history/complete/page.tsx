"use client";

import { AccountCardHistory } from "@/components/account/card-history";

export default function Complete() {
    return (
        <div className="bg-white rounded-lg shadow-md flex flex-col gap-2">
            <AccountCardHistory />
            <AccountCardHistory />
            <AccountCardHistory />
        </div>
    )
}