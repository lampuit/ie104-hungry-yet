"use server";

import { db } from "@/drizzle/db";
import {
  inserCartSchema,
  carts,
} from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";

const CreateShoppingCart = inserCartSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export async function createShoppingCart(formData: FormData) {
  const data = CreateShoppingCart.parse({
    userId: formData.get("userId"),
    productId: formData.get("productId"),
    quantity: Number(formData.get("quantity")),
  });
  // If the item does not exist, insert a new item
  const response = await db.insert(carts).values(data);
  console.log("response", response);

}

export async function updateShoppingCart(formData: FormData) {
  await db
    .update(carts)
    .set({ quantity: Number(formData.get("quantity")) })
    .where(
      and(
        eq(carts.userId, formData.get("userId") as string),
        eq(carts.productId, formData.get("productId") as string),
      ),
    );
}

export async function deletecarts(productId: string, userId: string) {
  try {
    await db.delete(carts).where(
      and(
        eq(carts.productId, productId), eq(carts.userId, userId)
      )
    )
  } catch (error) {
    console.error('Error deleting shopping cart', error);
  }
}
