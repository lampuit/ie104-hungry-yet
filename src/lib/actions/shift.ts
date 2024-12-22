"use server";

import { insertAssigmentSchema } from "@/drizzle/schema/project";
import { db } from "@/drizzle/db";
import { assigments } from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CreateUserWorkShift = insertAssigmentSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export async function createUserWorkShift(formData: FormData) {
  const data = CreateUserWorkShift.parse({
    id: formData.get("id"),
    userId: formData.get("userId"),
    shiftId: formData.get("shiftId"),
    workDate: new Date(formData.get("workDate") as string),
  });

  console.log(formData);

  /* This code snippet is inside the `createUserWorkShift` function and it is responsible for creating
  a new user work shift record in the database. Here's what it does: */
  try {
    await db
      .insert(assigments)
      .values(data)
      .onConflictDoNothing({ target: assigments.id });
    console.log("User work shift created successfully");
  } catch (err) {
    console.error(err);
  }
  revalidatePath("/dashboard/shift");
}

export async function updateUserWorkShift(formData: FormData) {
  try {
    db.update(assigments)
      .set({
        shiftId: formData.get("shiftId") as string,
        workDate: new Date(formData.get("workDate") as string),
      })
      .where(
        and(
          eq(assigments.id, formData.get("id") as string),
          eq(assigments.userId, formData.get("userId") as string),
        ),
      );
  } catch (err) {
    console.error(err);
  }
}

export async function deleteUserWorkShift(id: string) {
  console.log(id);
  try {
    await db.delete(assigments).where(eq(assigments.id, id));
    console.log("Delete user work shift successfully");
  } catch (err) {
    console.error(err);
  }

  revalidatePath("/dashboard/shift");
}
