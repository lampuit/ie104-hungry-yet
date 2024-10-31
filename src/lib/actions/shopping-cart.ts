"use server";

import { db } from "@/drizzle/db";
import {
  inserShoppingCartSchema,
  shoppingCart,
} from "@/drizzle/schema/project";
import { eq } from "drizzle-orm";

const CreateShoppingCart = inserShoppingCartSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function getShoppingCartByUserId(userId: string) {
  return await db.select().from(shoppingCart).where(eq(shoppingCart.userId, userId));
}

export async function createShoppingCart(formData: FormData) {
  const data = CreateShoppingCart.parse({
    userId: formData.get("userId"),
    productId: formData.get("productId"),
    quantity: Number(formData.get("quantity")),
  });

  console.log(data);

  await db.insert(shoppingCart).values(data);
}

export async function updateShoppingCart(formData: FormData) {
  await db
    .update(shoppingCart)
    .set({ quantity: Number(formData.get("quantity")) })
    .where(eq(shoppingCart.id, formData.get("id") as string));
}

export async function deleteOrderProduct(id: string) {
  await db.delete(shoppingCart).where(eq(shoppingCart.id, id));
}
