"use server";

import { db } from "@/drizzle/db";
import { insertOrderProductSchema, orderProducts } from "@/drizzle/schema/project";
import { eq,sql } from "drizzle-orm";

const CreateOrderProduct = insertOrderProductSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export async function createOrderProduct(formData: FormData) {
  const data = CreateOrderProduct.parse({
    orderId: formData.get('orderId'),
    productId: formData.get("productId"),
    quantity: Number(formData.get("quantity")),
  });

  console.log(data);

  await db.insert(orderProducts).values(data);
}

export async function updateOrderProduct(formData: FormData) {
    await db.update(orderProducts)
        .set({ quantity: Number(formData.get("quantity"))})
        .where(eq(orderProducts.orderId, formData.get("orderId") as string));
}

export async function deleteOrderProduct(orderId: string) {
  await db.delete(orderProducts).where(eq(orderProducts.orderId, orderId));
}



