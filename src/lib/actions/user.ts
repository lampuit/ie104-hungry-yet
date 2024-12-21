"use server";

import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema/auth";
import { eq } from "drizzle-orm";

export async function updateUser(formData: FormData) {
  await db
    .update(user)
    .set({
      phone: String(formData.get("phone")),
      address: String(formData.get("address")),
      imageUrl: String(formData.get("imageUrl")),
      gender: formData.get("gender") as "Nam" | "Nữ" | "Khác" | null | undefined,
      name: String(formData.get("name")),
      birthday: new Date(formData.get("birthday") as string),
    })
    .where(
      eq(user.id, formData.get("userId") as string)
    );
}




