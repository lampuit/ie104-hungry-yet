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
  getAllCategory
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
  await deleteFavorite(
    "PqEEV28ZywjNXbhRsZ-r_",
    "07cb15c6-92c6-48ae-b963-7fa28fcf8004",
  );
}

// testDeleteFavorite()

async function testGetProductByCategoryId() {
  const response = await getProductByCategoryId(
    "020bdc7a-9264-4b9a-a2cb-ecb56dd8160b"
  );
  console.log("Product Data:", response);
}

// testGetProductByCategoryId();

async function testGetAllCategory(){
  const response = await getAllCategory();
  console.log("All Category Data:", response);
}

testGetAllCategory()