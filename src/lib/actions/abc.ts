import { createProduct } from "./product";

async function main() {
  const formData = new FormData();

  formData.append("imageUrl", "abc");
  formData.append("name", "abc");
  formData.append("description", "abc");
  formData.append("category", "abc");
  formData.append("price", "000");

  await createProduct(formData);
}

main();
