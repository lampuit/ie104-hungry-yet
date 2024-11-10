"use server"
import { db } from "@/drizzle/db";
import { favorite, products, shoppingCart, categories } from "@/drizzle/schema/project";
import { eq, and, getTableColumns } from "drizzle-orm";


export async function getAllProducts () {
    return await db
    .select({
      ...getTableColumns(products),
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id));
}

export async function getProductById (id: string){
  return await db
  .select({
    ...getTableColumns(products),
    categoryName: categories.name,
  })
  .from(products)
  .leftJoin(categories, eq(products.categoryId, categories.id))
  .where(eq(products.id, id))
}

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
    .leftJoin(
      favorite,
      and(
        eq(shoppingCart.productId, favorite.productId),
        eq(shoppingCart.userId, favorite.userId),
      ),
    )
    .where(eq(shoppingCart.userId, userId));

  // Map the result to add `isFavorite` based on the presence of `favoriteProductId`
  const updatedResponse = response.map((item) => ({
    ...item,
    isFavorite: item.favoriteProductId != null,
  }));

  return updatedResponse;
}
