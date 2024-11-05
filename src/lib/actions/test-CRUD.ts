import {
  createShoppingCart,
  deleteShoppingCart,
  getShoppingCartByUserId,
  updateShoppingCart,
} from "./shopping-cart";

import {
  getFavoriteByUserId,
  createFavorite,
  deleteFavorite,
} from "./favorite";

//sucessfull
async function testCreate() {
  const formData = new FormData();
  formData.append("userId", "PqEEV28ZywjNXbhRsZ-r_");
  formData.append("productId", "1bbb39b5-99f5-4826-a5fd-0747d3c0ad5c");
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
  formData.append("productId", "07cb15c6-92c6-48ae-b963-7fa28fcf8004");
  formData.append("quantity", "5");

  console.log(formData);
  await updateShoppingCart(formData);
}
// testUpdate()

//successfull
async function testDelete() {
  const response = await deleteShoppingCart(
    "3b17329e-6285-47c7-9f3e-11986e03d7dd",
  );
  console.log("Response:", response);
}
// testDelete();

async function testCreateFavorite() {
  const formData = new FormData();
  formData.append("userId", "PqEEV28ZywjNXbhRsZ-r_");
  formData.append("productId", "07cb15c6-92c6-48ae-b963-7fa28fcf8004");
  console.log(formData);
  await createFavorite(formData);
}

// testCreateFavorite();

import { useSession, getSession } from "@/lib/auth-client"



