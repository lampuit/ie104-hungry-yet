import {
  integer,
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
  real
} from "drizzle-orm/pg-core";

export const Users = pgTable("Users", {
  UserId: serial("UserId").primaryKey(),
  Name: text("Name").notNull(), // Supports Unicode for Vietnamese characters
  Age: integer("Age").notNull(), // Changed UserName to Age as it was named incorrectly
  UserName: text("UserName").notNull(), // Should be text type for usernames
  Password: text("Password").notNull(), // Password should be text
  Phone: text("Phone").notNull().unique(),
  Email: text("Email").notNull().unique(), // Ensure this is unique and not optional
  Address: text("Address"), // Supports Unicode for Vietnamese characters
  ImageUrl: text("ImageUrl"),
  IsCustomer: boolean("IsCustomer"),
  CreatedDate: timestamp("CreatedDate").defaultNow().notNull(),
});

export const Orders = pgTable("Orders", {
  OrderId: serial("OrderId").primaryKey(),
  UserId: integer("UserId").notNull().references(() => Users.UserId), 
  TotalAmount: integer("TotalAmount").notNull(), 
  Status: text("Status"),
  OrderDate: timestamp("OrderDate").notNull(),
  DeliveryAddress: text("DeliveryAddress").notNull(), 
  DeliveryTime: timestamp("DeliveryTime").notNull(),
  Distance: real("Distance").notNull(),
  Rating: integer("Rating"),
  Review: text("Review"),
});

export const Products = pgTable("Products", {
  ProductId: serial("ProductId").primaryKey(),
  Name: text("Name").notNull(), // Product name, which can handle Unicode characters
  Description: text("Description"), // Description can be long, so using text
  Price: real("Price").notNull(), // Real is used for floating point numbers in PostgreSQL
  Quantity: integer("Quantity").notNull(), // Integer for quantity
  ImageUrl: text("ImageUrl"), // Text for storing the image URL
  CategoryId: integer("CategoryId").notNull().references(()=> Categories.CategoryId) // Text for the category ID
});


export const Categories = pgTable("Categories", {
  CategoryId: serial("ProductId").primaryKey(), // Text type for category ID (can be alphanumeric)
  Name: text("Name").notNull(), // Name of the category
  ImageUrl: text("ImageUrl"), // URL for the category image
  CreatedDate: timestamp("CreatedDate").defaultNow().notNull()
});

export const OrderDetail = pgTable("OrderDetail", {
  OrderId: integer("OrderId").notNull(), // Order ID
  UserId: integer("UserId").notNull().references(() => Users.UserId), // User ID as a text/varchar
  ProductId: integer("ProductId").notNull().references(()=> Products.ProductId), // Product ID as an integer
  Quantity: integer("Quantity").notNull(), // Quantity as an integer
}, () => {
  return {
    primaryKey: ['OrderId', 'UserId', 'ProductId'] // Composite primary key
  };
});

export const FoodStall = pgTable("FoodStall", {
  Id: serial("Id").primaryKey(), // Auto-incrementing primary key
  UserId: integer("UserId").notNull().references(() => Users.UserId), // User ID as a text/varchar
  ProductId: integer("ProductId").notNull().references(()=> Products.ProductId), // Product ID as an integer
  Address: text("Address").notNull()
});


export type InsertUser = typeof Users.$inferInsert;
export type SelectUser = typeof Users.$inferSelect;
export type InsertFoodStall = typeof FoodStall.$inferInsert;
export type SelectFoodStall = typeof FoodStall.$inferSelect;
export type SelectOrder = typeof Orders.$inferSelect;
export type InsertOrder = typeof Orders.$inferInsert;
export type InsertProduct = typeof Products.$inferInsert;
export type SelectProduct = typeof Products.$inferSelect;
export type InsertOrderDetail = typeof OrderDetail.$inferInsert;
export type SelectOrderDetail = typeof OrderDetail.$inferSelect;
export type InsertCategory = typeof Categories.$inferInsert;
export type SelectCategory = typeof Categories.$inferSelect;

 

