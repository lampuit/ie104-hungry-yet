"use server";

import { db } from "@/drizzle/db";
import { revalidatePath } from "next/cache";
import { invoices } from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import { user } from "@/drizzle/schema/auth";

export async function updateInvoices(formData: FormData) {
    return await db
        .update(invoices)
        .set({
            deliveryAddress: formData.get("deliveryAdress") as string,
            note: formData.get("note") as string,
            phone: formData.get("phone") as string,
        })
        .where(
            eq(invoices.id, formData.get("id") as string),
        )
        ;
}

