"use server";

import { db } from "@/drizzle/db";
import { insertFavouriteSchema, favorite } from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";

export async function createFavorite(formData: FormData) {
  const data = insertFavouriteSchema.parse({
    userId: formData.get("userId"),
    productId: formData.get("productId"),
  });
  console.log(data);
  await db.insert(favorite).values(data);
}

export async function deleteFavorite(userId: string, productId: string) {
  await db
    .delete(favorite)
    .where(and(eq(favorite.productId, productId), eq(favorite.userId, userId)));
}
