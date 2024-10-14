import { pgTable, pgEnum, serial, text, real, integer, timestamp } from "drizzle-orm/pg-core";

// Bảng Categories
export const categories = pgTable("categories", {
  categoryId: serial("categoryId").primaryKey(),
  categoryName: text("categoryName").notNull(),
  imageUrl: text("imageUrl"),
});

// Bảng Products
export const products = pgTable("products", {
  productId: serial("productId").primaryKey(),
  productName: text("productName").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
  imageUrl: text("imageUrl"),
  categoryId: integer("categoryId").references(() => categories.categoryId), // Khóa ngoại
});

// Bảng Ratings
export const ratings = pgTable("ratings", {
  productId: integer("productId").notNull().references(() => products.productId), // Khóa ngoại
  userId: text("userId").notNull().references(() => users.userId), // Khóa ngoại
  star: integer("star").notNull(),
  review: text("review"),
});

// Enum cho trạng thái đơn hàng
export const statusEnum = pgEnum('status', ['cooking', 'cooked', 'shopping', 'shipped']);

// Bảng Orders
export const orders = pgTable("orders", {
  orderId: serial("orderId").primaryKey(),
  userId: text("userId").notNull().references(()=> users.userId), // Khóa ngoại
  userShipId: text("userShipId").references(()=> users.userId), // Khóa ngoại
  userCookId: text("userCookId").references(()=> users.userId), // Khóa ngoại
  paymentId: integer("paymentId").references(()=> payments.paymentId), // Khóa ngoại
  totalAmount: real("totalAmount"),
  status: statusEnum("status"),
  orderDate: timestamp("orderDate").notNull(),
  deliveryAddress: text("deliveryAddress"),
  deliveryTime: timestamp("deliveryTime"),
  discountCode: text("discountCode").references(() => discounts.discountCode), // Khóa ngoại
});

// Bảng OrderProducts
export const orderProducts = pgTable("orderProducts", {
  orderId: integer("orderId").notNull().references(()=> orders.orderId), // Khóa ngoại
  productId: integer("productId").notNull().references(() => products.productId), // Khóa ngoại
  quantity: integer("quantity").notNull(),
});

// Bảng Payments
export const payments = pgTable("payments", {
  paymentId: serial("paymentId").primaryKey(),
  paymentName: text("paymentName").notNull(),
});

// Bảng Discounts
export const discounts = pgTable("discounts", {
  discountCode: text("discountCode").primaryKey(),
  discountName: text("discountName"),
  fromDate: timestamp("fromDate"),
  toDate: timestamp("toDate"),
});

// Bảng Shifts
export const shifts = pgTable("shifts", {
  shiftId: serial("shiftId").primaryKey(),
  shiftName: text("shiftName").notNull(),
  startTime: timestamp("startTime"),
  endTime: timestamp("endTime"),
  userWorkShift: text("userWorkShift").references(() => users.userId), // Khóa ngoại
});

// Bảng Users
export const users = pgTable("users", {
  userId: text("userId").primaryKey(),
  userName: text("userName"),
  password: text("password"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  imageUrl: text("imageUrl"),
  role: text("role"),
  createdDate: timestamp("createdDate"),
});

// Bảng ShoppingCart
export const shoppingCart = pgTable("shoppingCart", {
  shoppingCartId: serial("shoppingCartId").primaryKey(),
  userId: text("userId").notNull().references(() => users.userId), // Khóa ngoại
  productId: integer("productId").notNull().references(() => products.productId), // Khóa ngoại
  quantity: integer("quantity").notNull(),
});

// Bảng Favorite
export const favorite = pgTable("favorite", {
  userId: text("userId").notNull().references(() => users.userId), // Khóa ngoại
  productId: integer("productId").notNull().references(() => products.productId), // Khóa ngoại
});
