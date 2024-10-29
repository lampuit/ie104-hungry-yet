import { db } from "@/drizzle/db";
import { InsertUser, user, SelectUser } from "@/drizzle/schema/auth";
import { asc, between, count, eq, getTableColumns, sql } from "drizzle-orm";

export async function createUser(data: InsertUser) {
  await db.insert(user).values(data);
}

export async function getUserById(id: SelectUser["id"]): Promise<
  Array<{
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }>
> {
  return db.select().from(user).where(eq(user.id, id));
}
