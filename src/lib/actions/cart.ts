"use server";

import { db } from "@/drizzle/db";
import { revalidatePath } from "next/cache";
import { inserCartSchema, carts } from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";

const createCarts = inserCartSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export async function createCart(formData: FormData) {
  const data = createCarts.parse({
    userId: formData.get("userId"),
    productId: formData.get("productId"),
    quantity: Number(formData.get("quantity")),
  });

  const existingCartItem = await db
    .select()
    .from(carts)
    .where(
      and(eq(carts.userId, data.userId), eq(carts.productId, data.productId)),
    )
    .limit(1)
    .then((rows) => rows[0]);

  if (existingCartItem) {
    // Nếu sản phẩm đã tồn tại, tăng số lượng
    return await db
      .update(carts)
      .set({
        quantity: Number(formData.get("quantity")) + existingCartItem.quantity,
      })
      .where(
        and(eq(carts.userId, data.userId), eq(carts.productId, data.productId)),
      )
      .returning();
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới
    return await db.insert(carts).values(data).returning();
  }
}

export async function updateCarts(formData: FormData) {
  return await db
    .update(carts)
    .set({ quantity: Number(formData.get("quantity")) })
    .where(
      and(
        eq(carts.userId, formData.get("userId") as string),
        eq(carts.productId, formData.get("productId") as string),
      ),
    )
    .returning();
}

export async function deletecarts(productId: string, userId: string) {
  try {
    return await db
      .delete(carts)
      .where(and(eq(carts.productId, productId), eq(carts.userId, userId)))
      .returning();
  } catch (error) {
    console.error("Error deleting shopping cart", error);
  }
  revalidatePath("/menu/cart");
  redirect("/menu/cart");
}

export async function clearCart(userId: string) {
  try {
    // Xóa tất cả các mục trong giỏ hàng có userId trùng với giá trị truyền vào
    return await db.delete(carts).where(eq(carts.userId, userId));
  } catch (error) {
    console.error("Lỗi khi xóa giỏ hàng:", error);
  }
}
