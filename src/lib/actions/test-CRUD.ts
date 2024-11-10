import {
  createShoppingCart,
  deleteShoppingCart,
  updateShoppingCart,
} from "./shopping-cart";

import {
  createFavorite,
  deleteFavorite,
} from "./favorite";
import { getFavoriteByUserId, getShoppingCartByUserId }from "@/lib/data"

//sucessfull SHOPPING CART
async function testCreateShoppingCart() {
  const formData = new FormData();
  formData.append("userId", "PqEEV28ZywjNXbhRsZ-r_");
  formData.append("productId", "88a7b29b-2b3b-4d42-acca-a6f4460c36f9");
  formData.append("quantity", "2");

  console.log(formData);
  await createShoppingCart(formData);
}
// testCreateShoppingCart()

//successfull
async function testGetShoppingCartByUserId() {
  const result = await getShoppingCartByUserId("PqEEV28ZywjNXbhRsZ-r_");
  console.log("Shopping Cart Data:", result);
}
// testGetShoppingCartByUserId();

//successfull
async function testUpdateShppingCart() {
  const formData = new FormData();
  formData.append("userId", "PqEEV28ZywjNXbhRsZ-r_");
  formData.append("productId", "07cb15c6-92c6-48ae-b963-7fa28fcf8004");
  formData.append("quantity", "5");

  console.log(formData);
  await updateShoppingCart(formData);
}
// testUpdateShppingCart()

//successfull
async function testDeleteShoppingCart() {
  const response = await deleteShoppingCart(
    "07cb15c6-92c6-48ae-b963-7fa28fcf8004",
  );
  console.log("Response:", response);
}
// testDeleteShoppingCart();


//sucessfull FAVORITE
async function testCreateFavorite() {
  const formData = new FormData();
  formData.append("userId", "PqEEV28ZywjNXbhRsZ-r_");
  formData.append("productId", "07cb15c6-92c6-48ae-b963-7fa28fcf8004");
  console.log(formData);
  await createFavorite(formData);
}

// testCreateFavorite();

async function testGetFavoriteByUserId() {
  const result = await getFavoriteByUserId("PqEEV28ZywjNXbhRsZ-r_");
  console.log("Favorite Data:", result);
}

// testGetFavoriteByUserId()

async function testDeleteFavorite() {
  await deleteFavorite('PqEEV28ZywjNXbhRsZ-r_', '07cb15c6-92c6-48ae-b963-7fa28fcf8004')
}

// testDeleteFavorite()







