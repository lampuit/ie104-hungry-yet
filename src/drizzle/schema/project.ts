import {
  pgTable,
  pgEnum,
  text,
  real,
  integer,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { primaryKey } from "drizzle-orm/mysql-core";

// Bảng Categories
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  imageUrl: text("imageUrl"),
});

// Bảng Products
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  imageUrl: text("imageUrl").notNull(),
  categoryId: uuid("categoryId").references(() => categories.id), // Khóa ngoại
  isPublish: boolean("isPublish").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Relation: 1 category -> n products
export const categoryRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

// Relation: 1 product -> 1 category
export const productRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
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
  imageURL: text("imageURL"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
});

//Relation: 1 product -> n rating
export const productRatingRelation = relations(products, ({ many }) => ({
  ratings: many(ratings),
}));

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
  discountId: uuid("discountId").references(() => discounts.id), // Khóa ngoại
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
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name"),
  fromDate: timestamp("fromDate"),
  toDate: timestamp("toDate"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Bảng Shifts
export const shifts = pgTable("shifts", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  startTime: text("startTime"),
  endTime: text("endTime"),
});

// Bảng userWorkShifts
export const userWorkShifts = pgTable("userWorkShifts", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id), // Khóa ngoại
  shiftId: uuid("shiftId").references(() => shifts.id), // Khóa ngoại
  workDate: timestamp("workDate").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .$onUpdate(() => new Date()),
});

//Relation: 1 user -> n userworkshift
export const userWorkShiftRelation = relations(user, ({many}) => ({
  userWorkShifts: many(userWorkShifts),
}))

//Relation: 1 shift -> n userworkshift
export const shiftUserRelation = relations(shifts, ({many})=> ({
  userWorkShifts: many(userWorkShifts),
}))

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

// Relation: 1 product -> n shoppingcart
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

//Relation: 1 user -> n favorites
export const favoriteRelations = relations(user, ({ many }) => ({
  favorite: many(favorite),
}));

export const userfavoriteRelations = relations(favorite, ({ many }) => ({
  user: many(user),
}));

export const insertProductSchema = createInsertSchema(products);
export const insertCategorySchema = createInsertSchema(products);
export const insertOrderProductSchema = createInsertSchema(orderProducts);
export const inserShoppingCartSchema = createInsertSchema(shoppingCart);
export const insertFavouriteSchema = createInsertSchema(favorite);
export const insertDiscountSchema = createInsertSchema(discounts);
export const insertRatingsSchema = createInsertSchema(ratings);
export const insertUserWorkShiftSchema = createInsertSchema(userWorkShifts);
