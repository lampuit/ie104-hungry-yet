"use server";

import { db } from "@/drizzle/db";
import { insertOrderSchema, orders } from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";

const CreateOrderProduct = insertOrderSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export async function createOrderProduct(formData: FormData) {
  const data = CreateOrderProduct.parse({
    orderId: formData.get("orderId"),
    productId: formData.get("productId"),
    quantity: Number(formData.get("quantity")),
  });

  await db.insert(orders).values(data);
}

export async function updateOrderProduct(formData: FormData) {
  await db
    .update(orders)
    .set({ quantity: Number(formData.get("quantity")) })
    .where(
      and(
        eq(orders.productId, formData.get("productId") as string),
        eq(orders.invoiceId, formData.get("invoiceId") as string),
      ),
    );
}

export async function deleteOrderProduct(productId: string, invoiceId: string) {
  await db
    .delete(orders)
    .where(
      and(eq(orders.productId, productId), eq(orders.invoiceId, invoiceId)),
    );
}
