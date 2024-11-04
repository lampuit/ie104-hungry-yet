"use server";

import { db } from "@/drizzle/db";
import { insertProductSchema, products } from "@/drizzle/schema/project";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";

const CreateProduct = insertProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function createProduct(formData: FormData) {
  const data = CreateProduct.parse({
    imageUrl: formData.get("imageUrl") as File,
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    categoryId: formData.get("category"),
  });

  try {
    await db.insert(products).values(data);
  } catch (error) {
    return {
      message: "Lỗi cơ sở dữ liệu: Không thể tạo sản phẩm mới.",
    };
  }

  revalidatePath("/dashboard/product");
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
    return {
      message: "Lỗi cơ sở dữ liệu: Không thể chỉnh sửa sản phẩm.",
    };
  }

  revalidatePath("/dashboard/product");
  redirect("/dashboard/product");
}

export async function deleteProduct(id: string, imageUrl: string) {
  try {
    await del(imageUrl);

    await db.delete(products).where(eq(products.id, id));
  } catch (error) {
    return {
      message: "Lỗi cơ sở dữ liệu: Không thể xóa sản phẩm.",
    };
  }

  revalidatePath("/dashboard/product");
}
