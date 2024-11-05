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

//sucessfull SHOPPING CART
async function testCreateShoppingCart() {
  const formData = new FormData();
  formData.append("userId", "PqEEV28ZywjNXbhRsZ-r_");
  formData.append("productId", "1bbb39b5-99f5-4826-a5fd-0747d3c0ad5c");
  formData.append("quantity", "10");

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




