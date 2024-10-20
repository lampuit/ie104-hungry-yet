import { pgTable, pgEnum, uuid, text, real, integer, timestamp } from "drizzle-orm/pg-core";

// Bảng Categories
export const categories = pgTable("categories", {
  categoryId: uuid("categoryId").defaultRandom().primaryKey(),
  categoryName: text("categoryName").notNull(),
  imageUrl: text("imageUrl"),
});

// Bảng Products
export const products = pgTable("products", {
  productId: uuid("productId").defaultRandom().primaryKey(),
  productName: text("productName").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
  imageUrl: text("imageUrl"),
  categoryId: uuid("categoryId").references(() => categories.categoryId), // Khóa ngoại
});

// Bảng Ratings
export const ratings = pgTable("ratings", {
  productId: uuid("productId").notNull().references(() => products.productId), // Khóa ngoại
  userId: uuid("userId").notNull().references(() => users.userId), // Khóa ngoại
  star: integer("star").notNull(),
  review: text("review"),
});

// Enum cho trạng thái đơn hàng
export const statusEnum = pgEnum('status', ['cooking', 'cooked', 'shopping', 'shipped']);

// Bảng Orders
export const orders = pgTable("orders", {
  orderId: uuid("orderId").defaultRandom().primaryKey(),
  userId: uuid("userId").notNull().references(()=> users.userId), // Khóa ngoại
  userShipId: uuid("userShipId").references(()=> users.userId), // Khóa ngoại
  userCookId: uuid("userCookId").references(()=> users.userId), // Khóa ngoại
  paymentId: uuid("paymentId").references(()=> payments.paymentId), // Khóa ngoại
  totalAmount: real("totalAmount"),
  status: statusEnum("status"),
  orderDate: timestamp("orderDate").notNull(),
  deliveryAddress: text("deliveryAddress"),
  deliveryTime: timestamp("deliveryTime"),
  discountCode: text("discountCode").references(() => discounts.discountCode), // Khóa ngoại
});

// Bảng OrderProducts
export const orderProducts = pgTable("orderProducts", {
  orderId: uuid("orderId").notNull().references(()=> orders.orderId), // Khóa ngoại
  productId: uuid("productId").notNull().references(() => products.productId), // Khóa ngoại
  quantity: integer("quantity").notNull(),
});

// Bảng Payments
export const payments = pgTable("payments", {
  paymentId: uuid("paymentId").primaryKey(),
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
  shiftId: uuid("shiftId").defaultRandom().primaryKey(),
  shiftName: text("shiftName").notNull(),
  startTime: timestamp("startTime"),
  endTime: timestamp("endTime"),
});

// Bảng userWorkSHifts
export const userWorkShifts = pgTable("userWorkShifts", {
  Id: uuid("Id").defaultRandom().primaryKey(),
  userId: uuid("userId").notNull().references(() => users.userId), // Khóa ngoại
  shiftId: uuid("shiftId").references(() => shifts.shiftId), // Khóa ngoại
  workDate: timestamp("workDate").notNull()
});

// Bảng Users
export const users = pgTable("users", {
  userId: uuid("userId").defaultRandom().primaryKey(),
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
  shoppingCartId: uuid("shoppingCartId").defaultRandom().primaryKey(),
  userId: uuid("userId").notNull().references(() => users.userId), // Khóa ngoại
  productId: uuid("productId").notNull().references(() => products.productId), // Khóa ngoại
  quantity: integer("quantity").notNull(),
});

// Bảng Favorite
export const favorite = pgTable("favorite", {
  userId: uuid("userId").notNull().references(() => users.userId), // Khóa ngoại
  productId: uuid("productId").notNull().references(() => products.productId), // Khóa ngoại
});
