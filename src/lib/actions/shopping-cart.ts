"use server";

import { db } from "@/drizzle/db";
import {
  inserShoppingCartSchema,
  shoppingCart,
} from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";

const CreateShoppingCart = inserShoppingCartSchema.omit({
  id: true,
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
    const response = await db.insert(shoppingCart).values(data);
    console.log("response",response);

}

export async function updateShoppingCart(formData: FormData) {
  await db
    .update(shoppingCart)
    .set({ quantity: Number(formData.get("quantity")) })
    .where(
      and(
        eq(shoppingCart.userId, formData.get("userId") as string),
        eq(shoppingCart.productId, formData.get("productId") as string),
      ),
    );
}

export async function deleteShoppingCart(id: string) {
  try{
  await db.delete(shoppingCart).where(eq(shoppingCart.id, id));
  } catch (error) {
    console.error('Error deleting shopping cart',error);
  }
}
