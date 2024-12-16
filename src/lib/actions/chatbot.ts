"use server";

import { db } from "@/drizzle/db";
import { carts, invoices, products, ratings } from "@/drizzle/schema/project";
import { eq, and, getTableColumns, sql, notInArray } from "drizzle-orm";

export async function createCart(values: any) {
  const existingCartItem = await db
    .select()
    .from(carts)
    .where(
      and(
        eq(carts.userId, values.userId),
        eq(carts.productId, values.productId),
      ),
    )
    .limit(1)
    .then((rows) => rows[0]);

  if (existingCartItem) {
    await db
      .update(carts)
      .set({
        quantity: values.quantity + existingCartItem.quantity,
      })
      .where(
        and(
          eq(carts.userId, values.userId),
          eq(carts.productId, values.productId),
        ),
      )
      .returning();
  } else {
    await db.insert(carts).values(values).returning();
  }
}

export async function updateCart(values: any) {
  await db
    .update(carts)
    .set({ quantity: values.quantity })
    .where(
      and(
        eq(carts.userId, values.userId),
        eq(carts.productId, values.productId),
      ),
    );
}

export async function deleteCart(values: any) {
  await db
    .delete(carts)
    .where(
      and(
        eq(carts.productId, values.productId),
        eq(carts.userId, values.userId),
      ),
    );
}

export async function clearCart(userId: string) {
  await db.delete(carts).where(eq(carts.userId, userId));
}

export async function getProductById(id: string) {
  return await db
    .select({
      ...getTableColumns(products),
      averageRating: sql<number>`COALESCE(AVG(${ratings.star}), 0)`.mapWith(
        Number,
      ),
    })
    .from(products)
    .leftJoin(ratings, eq(products.id, ratings.productId))
    .where(and(eq(products.id, id), eq(products.isPublish, true)))
    .groupBy(products.id);
}

export async function getInvoiceDetail(invoiceId: string, userId: string) {
  return await db.query.invoices.findFirst({
    with: {
      payment: true,
    },
    where: and(
      eq(invoices.id, invoiceId),
      eq(invoices.customerId, userId),
      notInArray(invoices.status, ["cancelled"]),
    ),
  });
}
