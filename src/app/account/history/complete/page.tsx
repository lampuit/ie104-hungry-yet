"use client";

import { AccountCardHistory } from "@/components/account/card-history";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Complete() {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md flex flex-col gap-2">
            <AccountCardHistory />
            <AccountCardHistory />
            <AccountCardHistory />
            <Button variant={"ghost"}>Xem thêm <ChevronDown /></Button>
        </div>
    )
}