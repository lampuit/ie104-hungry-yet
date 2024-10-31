import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema/project";

async function seed() {
  await db.insert(categories).values({ name: "Đồ ăn", imageUrl: null });
  await db.insert(categories).values({ name: "Đồ uống", imageUrl: null });
}

seed();
