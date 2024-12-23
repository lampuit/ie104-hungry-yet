"use server";

import { db } from "@/drizzle/db";
import { insertRatingSchema, ratings } from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";

export async function createRatings(formData: FormData) {
  const data = insertRatingSchema.parse({
    userId: formData.get("userId"),
    productId: formData.get("productId"),
    star: Number(formData.get("star")),
    review: formData.get("review"),
    imageURL: formData.get("imageURL"),
    isAnonymous: Boolean(formData.get("isAnonymous")),
  });

  await db.insert(ratings).values(data);
}

export async function updateRating(formData: FormData) {
  await db
    .update(ratings)
    .set({
      star: Number(formData.get("star")),
      review: formData.get("review") as string,
    })
    .where(
      and(
        eq(ratings.productId, formData.get("productId") as string),
        eq(ratings.userId, formData.get("userId") as string),
      ),
    );
}

export async function deleteRating(userId: string, productId: string) {
  await db
    .delete(ratings)
    .where(and(eq(ratings.productId, productId), eq(ratings.userId, userId)));
}
