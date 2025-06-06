"use server";

import { db } from "@/drizzle/db";
import { discounts, insertDiscountSchema } from "@/drizzle/schema/project";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CreateDiscount = insertDiscountSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function createDiscount(values: any) {
  const newDiscount = CreateDiscount.parse(values);

  try {
    await db
      .insert(discounts)
      .values({ ...newDiscount, code: newDiscount?.code?.toUpperCase() });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Lỗi cơ sở dữ liệu: Không thể thêm mã.");
  }

  revalidatePath("/dashboard/discount");
  redirect("/dashboard/discount");
}

export async function deleteDiscount(id: string) {
  try {
    await db.delete(discounts).where(eq(discounts.id, id));
  } catch (error) {
    throw new Error("Lỗi cơ sở dữ liệu: Không thể xóa mã.");
  }

  revalidatePath("/dashboard/discount");
  redirect("/dashboard/discount");
}
