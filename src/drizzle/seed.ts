import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema/project";

async function main() {
  await db.insert(categories).values([
    { name: "Đồ ăn", imageUrl: null },
    { name: "Đồ uống", imageUrl: null },
    { name: "Món chính", imageUrl: null },
    { name: "Khai vị", imageUrl: null },
  ]);
}

main();
