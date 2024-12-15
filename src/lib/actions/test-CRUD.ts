import {
  createCart,
  deletecarts,
  updateCarts,
} from "./cart";

import { createFavorite, deleteFavorite } from "./favorite";
import {
  getFavoriteByUserId,
  getProductByCategoryId,
  getAllCategory,
  getUserById,
  getUserWorkShift,
  getCartsByUserId,
  getRatingsByProductId,
  getInvoiceByUserId,
  getInvoiceDetail,
  filterAndSearch
} from "@/lib/data";

import { clearCart } from "./cart";

import { updateUser } from "./user";
import { createRatings, updateRating } from "./rating";
import { updateInvoiceStatus } from "./invoice";

//sucessfull SHOPPING CART
async function testcreateCart() {
  const formData = new FormData();
  formData.append("userId", "qWINSwQ1EN3wRZdMpDJS8");
  formData.append("productId", "b944c6f8-dbab-47b3-b4b8-4a52dd4eaf72");
  formData.append("quantity", "2");

  console.log(formData);
  await createCart(formData);
}
// testcreateCart()

//successfull
// async function testGetShoppingCartByUserId() {
//   const result = await getShoppingCartByUserId("ECiCT6IsnmOi7hm3zUBZe");
//   console.log("Shopping Cart Data:", result);
// }
// testGetShoppingCartByUserId();

//successfull
async function testUpdateShppingCart() {
  const formData = new FormData();
  formData.append("userId", "PqEEV28ZywjNXbhRsZ-r_");
  formData.append("productId", "07cb15c6-92c6-48ae-b963-7fa28fcf8004");
  formData.append("quantity", "5");

  console.log(formData);
  await updateCarts(formData);
}
// testUpdateShppingCart()

//successfull
async function testDeleteShoppingCart() {
  const response = await deletecarts(
    "07cb15c6-92c6-48ae-b963-7fa28fcf8004",
    ""
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

async function testGetProductByCategoryId(id: string) {
  const response = await getProductByCategoryId(
    id,
    1,
    10
  );
  console.log("Product Data:", response);
}

// testGetProductByCategoryId('fe02d3ff-f145-46b9-9714-5a18dbf4b5cc');

async function testGetAllCategory() {
  const response = await getAllCategory();
  console.log("All Category Data:", response);
}

// testGetAllCategory()

async function testGetUserById(id: string) {
  const response = await getUserById(id);
  console.log("User Data:", response);
}

// testGetUserById('_RDKyc9nUb-HmT9Y1jebj')

async function testGetAllUserWorkShift() {
  const response = await getUserWorkShift();
  console.log("All User Work Shift Data:", response);
}

// testGetAllUserWorkShift();

async function testUpdateUserInfo() {
  const formData = new FormData();
  formData.append("userId", "ECiCT6IsnmOi7hm3zUBZe");
  formData.append("name", "Phạm Thành Lam");
  formData.append("phone", "123456789");
  formData.append("address", "Hà Nội");
  formData.append("imageUrl", "https://www.google.com");
  formData.append("gender", "Nam");
  updateUser(formData);
}

// testUpdateUserInfo();


async function testClearCart() {
  await clearCart("ECiCT6IsnmOi7hm3zUBZe");
}

// testClearCart();


async function testGetCartByUserId() {
  const response = await getCartsByUserId("ECiCT6IsnmOi7hm3zUBZe");
  response.forEach(cart => {
    console.log("Cart Data:", cart);
  });
}

// testGetCartByUserId();


async function testUpdateRating() {
  const data = new FormData();
  data.append("userId", "2twIpHSepp6aENGIF-Zfq");
  data.append("productId", "ba959b90-66c9-4313-a97d-43818851f7b7");
  data.append("star", "4");
  data.append("review", "Good product updated");
  await updateRating(data);
}

// testUpdateRating()

async function testGetRatingByProduct() {
  const response = await getRatingsByProductId("ba959b90-66c9-4313-a97d-43818851f7b7");
  console.log("Rating Data:", response);
}
// testGetRatingByProduct();

async function testGetInvoiceByUserId() {
  const response = await getInvoiceByUserId("2twIpHSepp6aENGIF-Zfq", "pending");
  console.log("Invoice Data:", response);
}

// testGetInvoiceByUserId();

async function testGetInvoiceDetail() {
  const response = await getInvoiceDetail("28c7ece9-05b1-4cbe-a0a4-4175f8670265");
  console.log("Invoice Detail Data:", response?.orders);
}

// testGetInvoiceDetail()

async function testFilterAndSearch() {
  const formData = new FormData();
  formData.append("categoryId", "fe02d3ff-f145-46b9-9714-5a18dbf4b5cc");
  formData.append("minPrice", "");
  formData.append("maxPrice", "");
  formData.append("rating", "");
  formData.append("search", "");
  formData.append("page", "1");
  formData.append("pageSize", "10");
  const reespone = await filterAndSearch(formData);
  console.log("Filter And Search:", reespone);
}

// testFilterAndSearch();

async function testUpdateInVoice() {
  const response = await updateInvoiceStatus("e5b2733e-24c6-4161-b7ac-fa670e7bc5ef", "cancelled");
  console.log("Update Invoice Status:", response);
}

// testUpdateInVoice();


