"use server";

import { db } from "@/drizzle/db";
import {
  favorite,
  products,
  shoppingCart,
  categories,
  ratings,
  shifts,
  userWorkShifts
} from "@/drizzle/schema/project";
import { user } from "@/drizzle/schema/auth";
import { eq, and, getTableColumns } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function fetchProducts() {
  try {
    return await db
      .select({
        ...getTableColumns(products),
        categoryName: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu danh sách sản phẩm.");
  }
}

export async function fetchDiscounts() {
  try {
    return await db.query.discounts.findMany();
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu mã ưu đãi.");
  }
}

export async function fetchProductId(id: string) {
  try {
    unstable_noStore();
    return await Promise.all([
      db.query.categories.findMany(),
      db.query.products.findFirst({
        where: eq(products.id, id),
      }),
    ]);
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu sản phẩm.");
  }
}

export async function getUserById(id: string) {
  return await db
    .select({
      ...getTableColumns(user),
    })
    .from(user)
    .where(eq(user.id, id));
}

export async function getAllShift() {
  return await db
    .select()
    .from(shifts);
}

export async function getAllEmployee() {
  return await db
    .select ()
    .from(user)
    .where(eq(user.role, "staff"));
}

export async function getAllProducts() {
  return await db
    .select({
      ...getTableColumns(products),
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id));
}

export async function getProductById({ id }: { id: string }) {
  return await db
    .select({
      ...getTableColumns(products),
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.id, id));
}

export async function getAllCategory() {
  const response = await db
    .select({
      ...getTableColumns(categories),
    })
    .from(categories);
  return response;
}

export async function getProductByCategoryId(
  id: string,
  page = 1,
  pageSize = 3,
) {
  // Count total records for the specified category ID
  const totalRecords = await db.$count(products, eq(products.categoryId, id));

  // Retrieve the paginated records
  const records = await db
    .select({
      ...getTableColumns(products),
    })
    .from(products)
    .where(eq(products.categoryId, id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
  // Return both totalRecords and the records for the current page
  return { totalRecords, records };
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

export async function getAllRatings() {
  return await db
    .select({
      ...getTableColumns(ratings),
      productName: products.name,
      productPrice: products.price,
      productImageUrl: products.imageUrl,
    })
    .from(ratings)
    .leftJoin(products, eq(ratings.productId, products.id));
}

export async function getRatingsByProductId(id: string) {
  return await db
    .select({
      ...getTableColumns(ratings),
      productName: products.name,
      productPrice: products.price,
      productImageUrl: products.imageUrl,
    })
    .from(ratings)
    .leftJoin(products, eq(ratings.productId, products.id))
    .where(eq(ratings.productId, id));
}

export async function getUserWorkShift() {
  return await db
    .select()
    .from(userWorkShifts);
}
