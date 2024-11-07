"use server";

import { db } from "@/drizzle/db";
import { insertProductSchema, products } from "@/drizzle/schema/project";
import { eq, mapColumnsInAliasedSQLToAlias } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { del, put } from "@vercel/blob";
import { updateOrderProduct } from "@/lib/actions/order";
import { z } from "zod";
import { Field } from "react-hook-form";

const CreateProduct = insertProductSchema
  .omit({
    id: true,
    imageUrl: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    file: z.instanceof(File),
  });

export async function createProduct(formData: FormData) {
  // console.log(formData);

  const { file, ...data } = CreateProduct.parse({
    file: formData.get("file") as File,
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    categoryId: formData.get("category"),
  });

  try {
    const { url } = await put(data.name, file, {
      access: "public",
    });

    await db.insert(products).values({ ...data, imageUrl: url });
  } catch (error) {
    throw new Error("Lỗi cơ sở dữ liệu: Không thể thêm sản phẩm.");
  }

  revalidateTag("products");
  redirect("/dashboard/product");
}

const EditProduct = insertProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function editProduct(id: string, formData: FormData) {
  const data = EditProduct.parse({
    imageUrl: formData.get("imageUrl"),
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    categoryId: formData.get("category"),
  });

  try {
    await db.update(products).set(data).where(eq(products.id, id));
  } catch (error) {
    throw new Error("Lỗi cơ sở dữ liệu: Không thể chỉnh sửa sản phẩm.");
  }

  revalidateTag("products");
  redirect("/dashboard/product");
}

export async function deleteProduct(id: string, imageUrl: string) {
  try {
    await del(imageUrl);

    await db.delete(products).where(eq(products.id, id));
  } catch (error) {
    throw new Error("Lỗi cơ sở dữ liệu: Không thể xóa sản phẩm.");
  }

  revalidateTag("products");
}
