import {
  pgTable,
  pgEnum,
  text,
  real,
  integer,
  timestamp,
  uuid,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

// Định nghĩa Enum Status (Trạng thái đơn hàng)
export const statusEnum = pgEnum("status", [
  "cooking",
  "cooked",
  "shopping",
  "shipped",
]);

// Bảng Categories (Thể loại)
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  imageUrl: text("imageUrl"),
});

// Bảng Products (Sản phẩm)
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

// Relation: 1 product -> 1 categories
export const productRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

// Bảng Ratings (Đánh giá)
export const ratings = pgTable("ratings", {
  productId: uuid("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }), // Khóa ngoại
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }), // Khóa ngoại
  star: integer("star").notNull(),
  review: text("review"),
  imageURL: text("imageURL"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
});

// Relation: 1 product -> n users && 1 user -> n products
export const ratingsRelations = relations(ratings, ({ one }) => ({
  products: one(products),
  users: one(user),
}));

// Bảng Invoices (Hóa đơn)
export const invoices = pgTable("invoices", {
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

// Bảng Orders (Đặt hàng)
export const orders = pgTable("orders", {
  orderId: uuid("orderId")
    .notNull()
    .references(() => invoices.id, { onDelete: "cascade" }), // Khóa ngoại
  productId: uuid("productId")
    .notNull()
    .references(() => products.id), // Khóa ngoại
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Bảng Payments (Thanh toán)
export const payments = pgTable("payments", {
  id: text("id").primaryKey(),
  paymentName: text("paymentName").notNull(),
});

// Bảng Discounts (Giám giá)
export const discounts = pgTable("discounts", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name"),
  discount: integer("discount"),
  fromDate: timestamp("fromDate"),
  toDate: timestamp("toDate"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Bảng Shifts (Ca làm)
export const shifts = pgTable("shifts", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  startTime: text("startTime"),
  endTime: text("endTime"),
});

// Bảng Assigments (Phân công)
export const assigments = pgTable("assigments", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id), // Khóa ngoại
  shiftId: uuid("shiftId").references(() => shifts.id), // Khóa ngoại
  workDate: timestamp("workDate").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
});

//Relation: 1 user -> n userworkshift
export const userWorkShiftRelation = relations(user, ({ many }) => ({
  userWorkShifts: many(assigments),
}));

//Relation: 1 shift -> n userworkshift
export const shiftUserRelation = relations(shifts, ({ many }) => ({
  userWorkShifts: many(assigments),
}));

// Bảng Carts (Giỏ hàng)
export const carts = pgTable(
  "carts",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // Khóa ngoại
    productId: uuid("productId")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }), // Khóa ngoại
    quantity: integer("quantity").notNull(),

    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt")
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.productId] }),
  }),
);

// Relation: 1 cart -> n products && 1 product -> n carts
export const cartsRelations = relations(carts, ({ one }) => ({
  products: one(products),
  carts: one(carts),
}));

// Bảng Favorites (Yêu thích)
export const favorites = pgTable(
  "favorites",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // Khóa ngoại
    productId: uuid("productId")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }), // Khóa ngoại
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.productId] }),
  }),
);

//Relation: 1 user -> n products && 1 product -> n users
export const favoritesRelations = relations(favorites, ({ one }) => ({
  products: one(products),
  carts: one(carts),
}));

export const insertProductSchema = createInsertSchema(products);

export const insertCategorySchema = createInsertSchema(categories);

export const insertOrderSchema = createInsertSchema(orders);

export const inserCartSchema = createInsertSchema(carts);

export const insertFavouriteSchema = createInsertSchema(favorites);

export const insertDiscountSchema = createInsertSchema(discounts);

export const insertRatingSchema = createInsertSchema(ratings);

export const insertAssigmentSchema = createInsertSchema(assigments);
