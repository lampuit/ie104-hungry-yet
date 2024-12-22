"use server";

import { db } from "@/drizzle/db";
import { insertFavouriteSchema, favorites } from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createFavorite(formData: FormData) {
  const data = insertFavouriteSchema.parse({
    userId: formData.get("userId"),
    productId: formData.get("productId"),
  });
  console.log(data);
  await db.insert(favorites).values(data);
  revalidatePath("/menu/cart");
}

export async function deleteFavorite(userId: string, productId: string) {
  await db
    .delete(favorites)
    .where(
      and(eq(favorites.productId, productId), eq(favorites.userId, userId)),
    );
  revalidatePath("/menu/cart");
}
