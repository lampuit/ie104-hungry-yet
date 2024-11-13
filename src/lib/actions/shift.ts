"use server";

import { insertUserWorkShiftSchema } from "@/drizzle/schema/project";
import { db } from "@/drizzle/db";
import { userWorkShifts } from "@/drizzle/schema/project";
import { eq, and } from "drizzle-orm";

const CreateUserWorkShift = insertUserWorkShiftSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function createUserWorkShift(formData: FormData) {
  const data = CreateUserWorkShift.parse({
    userId: formData.get("userId"),
    shiftId: formData.get("shiftId"),
    workDate: new Date(formData.get("workDate") as string),
  });

  try {
    await db.insert(userWorkShifts).values(data);
    console.log("User work shift created successfully");
  } catch (err) {
    console.error(err);
  }
}

export async function updateUserWorkShift(formData: FormData) {
  try {
    db.update(userWorkShifts)
      .set({
        shiftId: formData.get("shiftId") as string,
        workDate: new Date(formData.get("workDate") as string),
      })
      .where(
        and(
          eq(userWorkShifts.id, formData.get("id") as string),
          eq(userWorkShifts.userId, formData.get("userId") as string),
        ),
      );
  } catch (err) {
    console.error(err);
  }
}

export async function deleteUserWorkShift(id: string) {
  try {
    db.delete(userWorkShifts).where(eq(userWorkShifts.id, id));
    console.log("Delete user work shift successfully");
  } catch (err) {
    console.error(err);
  }
}
