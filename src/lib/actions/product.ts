"use server";

import { db } from "@/drizzle/db";
import { insertProductSchema, products } from "@/drizzle/schema/project";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

const CreateProduct = insertProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function createProduct(values: any) {
  const newProduct = CreateProduct.parse(values);

  try {
    await db.insert(products).values(newProduct);
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Lỗi cơ sở dữ liệu: Không thể thêm sản phẩm.");
  }

  revalidatePath("/dashboard/product");
  redirect("/dashboard/product");
}

const EditProduct = insertProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function editProduct(id: string, values: any) {
  const newProduct = EditProduct.parse(values);
  try {
    await db.update(products).set(newProduct).where(eq(products.id, id));
  } catch (error) {
    throw new Error("Lỗi cơ sở dữ liệu: Không thể chỉnh sửa sản phẩm.");
  }
  revalidatePath("/dashboard/product");
  redirect("/dashboard/product");
}

export async function deleteProduct(id: string) {
  throw new Error("Lỗi cơ sở dữ liệu: Không thể xóa sản phẩm.");
  try {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/dashboard/product");
  } catch (error) {}
}
