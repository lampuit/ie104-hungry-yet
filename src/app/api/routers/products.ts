import { products } from "@/drizzle/schema/project";
import { db } from "@/drizzle/db";
async function main() {
  const product: typeof products.$inferInsert = {
    id: "123-3455-3423847",
    name: "bún bò",
    price: 20,
    quantity: 2,
    description: "ngon",
    categoryId: null,
  };

  // Insert a new product into the database
  await db.insert(products).values(product);
  console.log("New product created!");
}
main();
