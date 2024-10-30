"use server";

import { db } from "@/drizzle/db";
import { insertProductSchema, products } from "@/drizzle/schema/project";

const CreateProduct = insertProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function createProduct(formData: FormData) {
  const data = CreateProduct.parse({
    imageUrl: formData.get("imageUrl"),
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    category: formData.get("category"),
  });

  console.log(data);

  await db.insert(products).values(data);
}
