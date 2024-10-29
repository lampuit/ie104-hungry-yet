import {
  pgTable,
  pgEnum,
  text,
  real,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { relations } from "drizzle-orm";

// Bảng Categories
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("imageUrl"),
});

// Relation: 1 category -> n products
export const usersRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

// Bảng Products
export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
  imageUrl: text("imageUrl"),
  categoryId: text("categoryId").references(() => categories.id), // Khóa ngoại
});

//Relation: 1 product -> 1 category
export const productRalation = relations(products, ({ one }) => ({
  categoieries: one(categories),
}));

// Bảng Ratings
export const ratings = pgTable("ratings", {
  productId: text("productId")
    .notNull()
    .references(() => products.id), // Khóa ngoại
  userId: text("userId")
    .notNull()
    .references(() => user.id), // Khóa ngoại
  star: integer("star").notNull(),
  review: text("review"),
});

// Enum cho trạng thái đơn hàng
export const statusEnum = pgEnum("status", [
  "cooking",
  "cooked",
  "shopping",
  "shipped",
]);

// Bảng Orders
export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id), // Khóa ngoại
  userShipId: text("userShipId").references(() => user.id), // Khóa ngoại
  userCookId: text("userCookId").references(() => user.id), // Khóa ngoại
  paymentId: text("paymentId").references(() => payments.paymentId), // Khóa ngoại
  totalAmount: real("totalAmount"),
  status: statusEnum("status"),
  orderDate: timestamp("orderDate").notNull(),
  deliveryAddress: text("deliveryAddress"),
  deliveryTime: timestamp("deliveryTime"),
  discountCode: text("discountCode").references(() => discounts.discountCode), // Khóa ngoại
});

// Bảng OrderProducts
export const orderProducts = pgTable("orderProducts", {
  orderId: text("orderId")
    .notNull()
    .references(() => orders.id), // Khóa ngoại
  productId: text("productId")
    .notNull()
    .references(() => products.id), // Khóa ngoại
  quantity: integer("quantity").notNull(),
});

// Bảng Payments
export const payments = pgTable("payments", {
  paymentId: text("id").primaryKey(),
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
  id: text("id").primaryKey(),
  shiftName: text("shiftName").notNull(),
  startTime: timestamp("startTime"),
  endTime: timestamp("endTime"),
});

// Bảng userWorkSHifts
export const userWorkShifts = pgTable("userWorkShifts", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id), // Khóa ngoại
  shiftId: text("shiftId").references(() => shifts.id), // Khóa ngoại
  workDate: timestamp("workDate").notNull(),
});

// Bảng user
// export const user = pgTable("user", {
//   userId: text("userId")..primaryKey(),
//   userName: text("userName"),
//   password: text("password"),
//   phone: text("phone"),
//   email: text("email"),
//   address: text("address"),
//   imageUrl: text("imageUrl"),
//   role: text("role"),
//   createdDate: timestamp("createdDate"),
// });

// Bảng ShoppingCart
export const shoppingCart = pgTable("shoppingCart", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id), // Khóa ngoại
  productId: text("productId")
    .notNull()
    .references(() => products.id), // Khóa ngoại
  quantity: integer("quantity").notNull(),
});

// Bảng Favorite
export const favorite = pgTable("favorite", {
  userId: text("userId")
    .notNull()
    .references(() => user.id), // Khóa ngoại
  productId: text("productId")
    .notNull()
    .references(() => products.id), // Khóa ngoại
});
