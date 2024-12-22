"use server";

import { db } from "@/drizzle/db";
import { revalidatePath } from "next/cache";
import { invoices, assigments, shifts } from "@/drizzle/schema/project";
import { and, eq, gte, lte } from "drizzle-orm";
import { redirect } from "next/navigation";

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

    revalidatePath("/account/history");

    return {
      success: true,
      message: "Cập nhập thông tin đơn hàng thành công!",
    };
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
        status: formData.get("status") as
          | "pending"
          | "accepted"
          | "cooking"
          | "ready"
          | "delivered"
          | "cancelled"
          | null
          | undefined,
        reason: formData.get("reason") as string,
      })
      .where(eq(invoices.id, formData.get("id") as string));

    revalidatePath("/account/history");
    let message;

    if (formData.get("status") === "cancelled") {
      message = "Hủy đơn hàng thành công!";
    }

    return {
      success: true,
      message: message ? message : "Cập nhập trạng thái đơn hàng thành công!",
    };
  } catch (error) {
    console.error("Error updating invoice status:", error);
    return {
      success: false,
      message: "Thất bại! Vui lòng thử lại!",
    };
  }
}

// export async function updateInvoiceStatus(id: string, status: string) {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Set to start of day

//     const assignment = await db.query.assigments.findFirst({
//         where: eq(assigments.workDate, today)
//     });

//     const shipperId = assignment ? assignment.userId : 'null';

//     return await db.update(invoices).set({
//         status: status as "pending" | "accepted" | "cooking" | "ready" | "delivered" | "cancelled",
//         shipperId: shipperId,
//     }).where(eq(invoices.id, id));
// }

export async function updateInvoiceStatus(id: string, status: string) {
  try {
    const now = new Date();
    const today = new Date(now).toISOString().split("T")[0];
    const currentTime = now.getHours();

    const assignment = await db
      .select({ userId: assigments.userId })
      .from(assigments)
      .where(
        and(
          eq(assigments.workDate, new Date(today)),
          gte(shifts.endTime, currentTime),
        ),
      )
      .innerJoin(shifts, eq(assigments.shiftId, shifts.id));

    const shipperId = assignment[0]?.userId || null;

    await db
      .update(invoices)
      .set({
        status: status as
          | "pending"
          | "accepted"
          | "cooking"
          | "ready"
          | "delivered"
          | "cancelled",
        shipperId: shipperId,
      })
      .where(eq(invoices.id, id));

    console.log("Success: Invoice status updated successfully");
    // revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error("Error updating invoice status:", error);
    throw new Error("Failed to update invoice status");
  }
}
