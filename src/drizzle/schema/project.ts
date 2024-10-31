import {
  pgTable,
  pgEnum,
  text,
  real,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Bảng Categories
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  imageUrl: text("imageUrl"),
});

// Relation: 1 category -> n products
export const usersRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

// Bảng Products
export const products = pgTable("products", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  imageUrl: text("imageUrl").notNull(),
  categoryId: uuid("categoryId").references(() => categories.id), // Khóa ngoại
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

//Relation: 1 product -> 1 category
export const productRalation = relations(products, ({ one }) => ({
  categoieries: one(categories),
}));

// Bảng Ratings
export const ratings = pgTable("ratings", {
  productId: uuid("productId")
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
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: text("userId")
    .notNull()
    .references(() => user.id), // Khóa ngoại
  userShipId: text("userShipId").references(() => user.id), // Khóa ngoại
  userCookId: text("userCookId").references(() => user.id), // Khóa ngoại
  paymentId: text("paymentId").references(() => payments.id), // Khóa ngoại
  totalAmount: real("totalAmount"),
  status: statusEnum("status"),
  orderDate: timestamp("orderDate").notNull(),
  deliveryAddress: text("deliveryAddress"),
  deliveryTime: timestamp("deliveryTime"),
  discountCode: text("discountCode").references(() => discounts.discountCode), // Khóa ngoại
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Bảng OrderProducts
export const orderProducts = pgTable("orderProducts", {
  orderId: uuid("orderId")
    .notNull()
    .references(() => orders.id), // Khóa ngoại
  productId: uuid("productId")
    .notNull()
    .references(() => products.id), // Khóa ngoại
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Bảng Payments
export const payments = pgTable("payments", {
  id: text("id").primaryKey(),
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
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("userId")
    .notNull()
    .references(() => user.id), // Khóa ngoại
  productId: uuid("productId")
    .notNull()
    .references(() => products.id), // Khóa ngoại
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Relation: 1 shoppingcart -> n products
export const shoppingCartRelations = relations(shoppingCart, ({ many }) => ({
  products: many(products),
}));

export const productShoppingCartRelation = relations(products, ({ many }) => ({
  shoppingCart: many(shoppingCart),
}));

// Bảng Favorite
export const favorite = pgTable("favorite", {
  userId: text("userId")
    .notNull()
    .references(() => user.id), // Khóa ngoại
  productId: uuid("productId")
    .notNull()
    .references(() => products.id), // Khóa ngoại
});

export const insertProductSchema = createInsertSchema(products);

export const insertOrderProductSchema = createInsertSchema(orderProducts);

export const inserShoppingCartSchema = createInsertSchema(shoppingCart);
