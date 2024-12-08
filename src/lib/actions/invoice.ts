"use server";

import { db } from "@/drizzle/db";
import { revalidatePath } from "next/cache";
import { invoices } from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function updateInvoices(formData: FormData) {
    return await db
        .update(invoices)
        .set({ deliveryAddress: formData.get("address") as string }, )
        .where(
            and(
                eq(invoices.id, formData.get("id") as string),
            ),
        );
}

