"use server";

import { db } from "@/drizzle/db";
import { insertProductSchema, products } from "@/drizzle/schema/project";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

const CreateProduct = insertProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function createProduct(formData: FormData) {
  try {
    const data = CreateProduct.parse({
      imageUrl: formData.get("imageUrl"),
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      categoryId: formData.get("category"),
    });

    await db.insert(products).values(data);
  } catch (error) {}
}
