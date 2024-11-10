"use server";

import { db } from "@/drizzle/db";
import { insertDiscountSchema, discounts } from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";

//remove some attributes created automatically
const CreateDiscount = insertDiscountSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

//create a new discount
export async function createDiscount(formData: FormData) {
  // return object if data is available else error
  const data = CreateDiscount.parse({
    discountCode: formData.get("discountCode"),
    discountName: formData.get("discountName") as string,
    fromDate: new Date(formData.get("fromDate") as string),
    toDate: new Date(formData.get("toDate") as string),
  });
  console.log(data);
  await db.insert(discounts).values(data);
}


//update an existing discount
export async function updateDiscount(formData: FormData) {
  try {
    await db
      .update(discounts)
      .set({
        name: formData.get("name") as string | undefined,
        fromDate: new Date(formData.get("fromDate") as string),
        toDate: new Date(formData.get("toDate") as string),
      })
      .where(eq(discounts.id, formData.get("id") as string));
  } catch (error) {
    console.error("Error updating discount:", error);
    throw error;
  }
}

//delete a discount
export async function deleteFavorite(id: string) {
  try {
    await db.delete(discounts).where(and(eq(discounts.id, id)));

    console.log(`Discount with id ${id} has been deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting discount with id ${id}:`, error);
    throw error;
  }
}
