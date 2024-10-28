"use client";

import { CreateForm } from "@/components/dashboard/product/create-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Create() {
  return (
    <div className="flex-1 p-4">
      <CreateForm />
    </div>
  );
}
