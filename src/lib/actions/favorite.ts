"use server";

import { db } from "@/drizzle/db";
import {
  insertFavouriteSchema,
  favorite,
  products,
} from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";

export async function getFavoriteByUserId(userId: string) {
  const response = await db
    .select({
      userId: favorite.userId,
      productId: favorite.productId,
      productName: products.name,
      productPrice: products.price,
      productImageUrl: products.imageUrl,
    })
    .from(favorite)
    .innerJoin(products, eq(favorite.productId, products.id))
    .where(eq(favorite.userId, userId));
  return response;
}

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
