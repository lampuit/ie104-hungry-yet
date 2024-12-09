"use server";

import { db } from "@/drizzle/db";
import { revalidatePath } from "next/cache";
import { invoices } from "@/drizzle/schema/project";
import { eq } from "drizzle-orm";

export async function updateInvoices(formData: FormData) {
    const id = formData.get("id") as string;
    const deliveryAddress = formData.get("deliveryAddress") as string;
    const note = formData.get("note") as string;
    const phone = formData.get("phone") as string;

    try {
        await db
            .update(invoices)
            .set({
                deliveryAddress,
                note,
                phone,
            })
            .where(eq(invoices.id, id));

        revalidatePath('/account/history');

        return { success: true, message: "Cập nhập thông tin đơn hàng thành công!" };
    } catch (error) {
        console.error("Error updating invoice:", error);
        return { success: false, message: "Cập nhập thông tin đơn hàng thất bại!" };
    }
}

