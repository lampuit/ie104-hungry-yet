import {
  createShoppingCart,
  deleteShoppingCart,
  getShoppingCartByUserId,
  updateShoppingCart,
} from "./shopping-cart";

//sucessfull
async function testCreate() {
  const formData = new FormData();
  formData.append("userId", "PqEEV28ZywjNXbhRsZ-r_");
  formData.append("productId", "69822ad5-aa2d-4a3d-8419-6331b0453876");
  formData.append("quantity", "10");

  console.log(formData);
  await createShoppingCart(formData);
}
// testCreate()

//successfull
async function testGetShoppingCartByUserId() {
  const result = await getShoppingCartByUserId("PqEEV28ZywjNXbhRsZ-r_");
  console.log("Shopping Cart Data:", result);
}
// testGetShoppingCartByUserId();

//successfull
async function testUpdate() {
  const formData = new FormData();
  formData.append("userId", "PqEEV28ZywjNXbhRsZ-r_");
  formData.append("productId", "3cc5fcea-4349-4efc-b3f7-5e50e395b90a");
  formData.append("quantity", "5");

  console.log(formData);
  await updateShoppingCart(formData);
}
// testUpdate()


//successfull
async function testDelete() {
  const response = await deleteShoppingCart("3b17329e-6285-47c7-9f3e-11986e03d7dd");
  console.log("Response:", response);
}
// testDelete();
