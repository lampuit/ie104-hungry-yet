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
import { Relation, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

// Định nghĩa Invoice Status (Trạng thái đơn hàng)
export const invoiceStatusEnum = pgEnum("invoiceStatus", [
  "pending",
  "accepted",
  "cooking",
  "ready",
  "delivered",
  "cancelled",
]);

// Định nghĩa Payment Status (Trạng thái thanh toán)
export const paymentStatusEnum = pgEnum("paymentStatus", [
  "pending",
  "failed",
  "success",
  "cancelled",
]);

export const methodEnum = pgEnum("method", ["momo", "paylater"]);

// Relation: 1 user - n orders, 1 user - shifts, 1 user - n assigment, 1 user - n carts,
export const userRelations = relations(user, ({ many }) => ({
  orders: many(orders),
  assigments: many(shifts),
  ratings: many(ratings),
  carts: many(carts),
}));

// Bảng Categories (Thể loại)
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  imageUrl: text("imageUrl"),
});

// Relation: 1 category -> n products
export const categoryRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

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

// Relation: 1 product - 1 categorie, 1 product - n orders, 1 product - n carts, 1 product - n ratings
export const productRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orders: many(orders),
  carts: many(carts),
  ratings: many(ratings),
  favorites: many(favorites),
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
  isAnonymous: boolean("isAnonymous").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
});

// Relation: 1 product - n users && 1 user - n products
export const ratingsRelations = relations(ratings, ({ one }) => ({
  product: one(products, {
    fields: [ratings.productId],
    references: [products.id],
  }),
  user: one(user, {
    fields: [ratings.userId],
    references: [user.id],
  }),
}));

// Bảng Invoices (Hóa đơn)
export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  customerId: text("customerId")
    .notNull()
    .references(() => user.id, {
      onUpdate: "cascade",
    }), // Khóa ngoại
  shipperId: text("shipperId").references(() => user.id, {
    onUpdate: "cascade",
  }), // Khóa ngoại
  // cookId: text("cookId").references(() => user.id, {
  //   onUpdate: "cascade",
  // }), // Khóa ngoại
  paymentId: uuid("paymentId")
    .notNull()
    .references(() => payments.id, {
      onDelete: "cascade",
    }), // Khóa ngoại
  totalAmount: real("totalAmount"),
  status: invoiceStatusEnum("status"),
  reason: text("reason"),
  deliveryAddress: text("deliveryAddress"),
  deliveryTime: integer("deliveryTime"),
  phone: text("phone"),
  discountId: uuid("discountId").references(() => discounts.id), // Khóa ngoại
  note: text("note"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Relation: 1 invoice - 1 shipper,1 invoices - 1 customer, 1 invoice - payment, 1 invoice - discount, 1 invoice -> 1 cook
export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  customer: one(user, {
    fields: [invoices.customerId],
    references: [user.id],
  }),
  // cook: one(user, {
  //   fields: [invoices.cookId],
  //   references: [user.id],
  // }),
  shipper: one(user, {
    fields: [invoices.shipperId],
    references: [user.id],
  }),
  discount: one(discounts, {
    fields: [invoices.discountId],
    references: [discounts.id],
  }),
  payment: one(payments, {
    fields: [invoices.paymentId],
    references: [payments.id],
  }),
  orders: many(orders),
}));

// Bảng Orders (Đặt hàng)
export const orders = pgTable("orders", {
  invoiceId: uuid("invoiceId")
    .notNull()
    .references(() => invoices.id, { onDelete: "cascade" }), // Khóa ngoại
  productId: uuid("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }), // Khóa ngoại
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Relation: 1 user -> 1 order
export const ordersRelations = relations(orders, ({ one, many }) => ({
  invoice: one(invoices, {
    fields: [orders.invoiceId],
    references: [invoices.id],
  }),
  // invoices: one(invoices, {
  //   fields: [orders.invoiceId],
  //   references: [invoices.id],
  // }),
  products: one(products, {
    fields: [orders.productId],
    references: [products.id],
  }), // 1 order - 1 product
}));

// Bảng Payments (Thanh toán)
export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  method: methodEnum("method"),
  status: paymentStatusEnum("status"),
  payUrl: text("payUrl"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Relation: 1 payment - n invoices
export const paymentsRelations = relations(payments, ({ many }) => ({
  invoices: many(invoices),
}));

// Bảng Discounts (Giám giá)
export const discounts = pgTable("discounts", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  code: text("code"),
  discount: integer("discount"),
  fromDate: timestamp("fromDate"),
  toDate: timestamp("toDate"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Relation: 1 discount - n invoices
export const discountsRelations = relations(discounts, ({ many }) => ({
  invoices: many(invoices),
}));

// Bảng Shifts (Ca làm)
export const shifts = pgTable("shifts", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  startTime: integer("startTime"),
  endTime: integer("endTime"),
});

// Relation: 1 discount - n invoices
export const shiftsRelations = relations(shifts, ({ many }) => ({
  assigments: many(assigments),
}));

// Bảng Assigments (Phân công)
export const assigments = pgTable("assigments", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id), // Khóa ngoại
  shiftId: uuid("shiftId").references(() => shifts.id, { onDelete: "cascade" }), // Khóa ngoại
  workDate: timestamp("workDate").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
});

// Relation: 1 assigment - 1 user, 1 assigment - 1 shift
export const assigmentRelations = relations(assigments, ({ one }) => ({
  user: one(user, {
    fields: [assigments.userId],
    references: [user.id],
  }),
  shift: one(shifts, {
    fields: [assigments.shiftId],
    references: [shifts.id],
  }),
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
  (table) => {
    return [primaryKey({ columns: [table.userId, table.productId] })];
  },
);

// Relation: 1 cart - n products && 1 product - n carts
export const cartsRelations = relations(carts, ({ one }) => ({
  product: one(products, {
    fields: [carts.productId],
    references: [products.id],
  }),
  user: one(user, {
    fields: [carts.userId],
    references: [user.id],
  }),
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
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt")
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return [primaryKey({ columns: [table.userId, table.productId] })];
  },
);

//Relation: 1 user - n products && 1 product - n users
export const favoritesRelations = relations(favorites, ({ one }) => ({
  products: one(products, {
    fields: [favorites.productId],
    references: [products.id],
  }),
  user: one(user, {
    fields: [favorites.userId],
    references: [user.id],
  }),
}));

export const insertProductSchema = createInsertSchema(products);

export const insertCategorySchema = createInsertSchema(categories);

export const insertOrderSchema = createInsertSchema(orders);

export const inserCartSchema = createInsertSchema(carts);

export const insertFavouriteSchema = createInsertSchema(favorites);

export const insertDiscountSchema = createInsertSchema(discounts);

export const insertRatingSchema = createInsertSchema(ratings);

export const insertAssigmentSchema = createInsertSchema(assigments);

export const insertInvoiceSchema = createInsertSchema(invoices);
