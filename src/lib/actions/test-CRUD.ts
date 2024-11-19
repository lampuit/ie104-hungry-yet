import {
  createShoppingCart,
  deleteShoppingCart,
  updateShoppingCart,
} from "./shopping-cart";

import { createFavorite, deleteFavorite } from "./favorite";
import {
  getFavoriteByUserId,
  getShoppingCartByUserId,
  getProductByCategoryId,
  getAllCategory,
  getUserById
} from "@/lib/data";

//sucessfull SHOPPING CART
async function testCreateShoppingCart() {
  const formData = new FormData();
  formData.append("userId", "qWINSwQ1EN3wRZdMpDJS8");
  formData.append("productId", "b944c6f8-dbab-47b3-b4b8-4a52dd4eaf72");
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
  formData.append("userId", "0ygURwyW1JQw274gSmiDV");
  formData.append("productId", "a1b2513f-f3ed-4e27-822e-ec4ac4fceccf");
  console.log(formData);
  await createFavorite(formData);
}

testCreateFavorite();

async function testGetFavoriteByUserId() {
  const result = await getFavoriteByUserId("PqEEV28ZywjNXbhRsZ-r_");
  console.log("Favorite Data:", result);
}

// testGetFavoriteByUserId()

async function testDeleteFavorite() {
  await deleteFavorite(
    "PqEEV28ZywjNXbhRsZ-r_",
    "07cb15c6-92c6-48ae-b963-7fa28fcf8004",
  );
}

// testDeleteFavorite()

async function testGetProductByCategoryId() {
  const response = await getProductByCategoryId(
    "1cf9e139-8bb0-4c78-8357-f813588f11ca"
  );
  console.log("Product Data:", response);
}

testGetProductByCategoryId();

async function testGetAllCategory(){
  const response = await getAllCategory();
  console.log("All Category Data:", response);
}

// testGetAllCategory()

async function testGetUserById (id: string){
  const response = await getUserById(id);
  console.log("User Data:", response);
}

// testGetUserById('_RDKyc9nUb-HmT9Y1jebj')