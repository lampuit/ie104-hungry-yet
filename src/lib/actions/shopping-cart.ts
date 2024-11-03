"use server";

import { db } from "@/drizzle/db";
import {
  inserShoppingCartSchema,
  shoppingCart,
  products,
  favorite
 } from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";

const CreateShoppingCart = inserShoppingCartSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function getShoppingCartByUserId(userId: string) {
  const response = await db
    .select({
      cartId: shoppingCart.id,
      userId: shoppingCart.userId,
      productId: shoppingCart.productId,
      quantity: shoppingCart.quantity,
      name: products.name,
      image: products.imageUrl,
      price: products.price,
      favoriteProductId: favorite.productId, // Temporarily select favorite product ID to check later
    })
    .from(shoppingCart)
    .innerJoin(products, eq(shoppingCart.productId, products.id))
    .leftJoin(favorite, and(
      eq(shoppingCart.productId, favorite.productId),
      eq(shoppingCart.userId, favorite.userId)
    ))
    .where(eq(shoppingCart.userId, userId));

  // Map the result to add `isFavorite` based on the presence of `favoriteProductId`
  const updatedResponse = response.map((item) => ({
    ...item,
    isFavorite: item.favoriteProductId != null,
  }));

  return updatedResponse;
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
    .where(
      and(
        eq(shoppingCart.userId, formData.get("userId") as string),
        eq(shoppingCart.productId, formData.get("productId") as string)
      )
    );
}

export async function deleteShoppingCart(id: string) {
  await db.delete(shoppingCart).where(eq(shoppingCart.id, id));
}
