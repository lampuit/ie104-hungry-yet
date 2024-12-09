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

export async function updateStatus(formData: FormData) {
    try {
        await db
            .update(invoices)
            .set({
                status: formData.get("status") as "pending" | "accepted" | "cooking" | "ready" | "delivered" | "cancelled" | null | undefined,
                reason: formData.get("reason") as string,
            })
            .where(eq(invoices.id, formData.get("id") as string));

        revalidatePath('/account/history');
        let message;

        if (formData.get("status") === "cancelled") {
            message = "Hủy đơn hàng thành công!";
        }

        return { success: true, message: message ? message : "Cập nhập trạng thái đơn hàng thành công!" };
    } catch (error) {
        console.error("Error updating invoice status:", error);
        return {
            success: false, message: "Thất bại! Vui lòng thử lại!"
        }
    }
}

