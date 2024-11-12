"use server";

import { db } from "@/drizzle/db";
import {
  discounts,
  insertDiscountSchema,
  insertProductSchema,
} from "@/drizzle/schema/project";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const CreateDiscount = insertDiscountSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function createDiscount(formData: FormData) {
  const data = CreateDiscount.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    fromDate: new Date(formData.get("fromDate") as string),
    toDate: new Date(formData.get("toDate") as string),
  });

  try {
    await db.insert(discounts).values(data);
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Lỗi cơ sở dữ liệu: Không thể thêm mã.");
  }

  revalidateTag("discounts");
}

export async function deleteDiscount(id: string) {
  try {
    await db.delete(discounts).where(eq(discounts.id, id));
  } catch (error) {
    throw new Error("Lỗi cơ sở dữ liệu: Không thể xóa mã.");
  }

  revalidateTag("discounts");
}
