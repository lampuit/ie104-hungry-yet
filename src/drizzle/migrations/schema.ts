import { pgTable, text, timestamp, foreignKey, uuid, integer, real, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const status = pgEnum("status", ['cooking', 'cooked', 'shopping', 'shipped'])



export const shifts = pgTable("shifts", {
	id: text().primaryKey().notNull(),
	shiftName: text().notNull(),
	startTime: timestamp({ mode: 'string' }),
	endTime: timestamp({ mode: 'string' }),
});

export const shoppingCart = pgTable("shoppingCart", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	productId: uuid().notNull(),
	quantity: integer().notNull(),
},
(table) => {
	return {
		shoppingCartUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "shoppingCart_userId_user_id_fk"
		}),
		shoppingCartProductIdProductsIdFk: foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "shoppingCart_productId_products_id_fk"
		}),
	}
});

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text().notNull(),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	expiresAt: timestamp({ mode: 'string' }),
	password: text(),
},
(table) => {
	return {
		accountUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}),
	}
});

export const userWorkShifts = pgTable("userWorkShifts", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	shiftId: text(),
	workDate: timestamp({ mode: 'string' }).notNull(),
},
(table) => {
	return {
		userWorkShiftsUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "userWorkShifts_userId_user_id_fk"
		}),
		userWorkShiftsShiftIdShiftsIdFk: foreignKey({
			columns: [table.shiftId],
			foreignColumns: [shifts.id],
			name: "userWorkShifts_shiftId_shifts_id_fk"
		}),
	}
});

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	ipAddress: text(),
	userAgent: text(),
	userId: text().notNull(),
},
(table) => {
	return {
		sessionUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}),
	}
});

export const ratings = pgTable("ratings", {
	productId: uuid().notNull(),
	userId: text().notNull(),
	star: integer().notNull(),
	review: text(),
},
(table) => {
	return {
		ratingsProductIdProductsIdFk: foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "ratings_productId_products_id_fk"
		}),
		ratingsUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "ratings_userId_user_id_fk"
		}),
	}
});

export const favorite = pgTable("favorite", {
	userId: text().notNull(),
	productId: uuid().notNull(),
},
(table) => {
	return {
		favoriteUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "favorite_userId_user_id_fk"
		}),
		favoriteProductIdProductsIdFk: foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "favorite_productId_products_id_fk"
		}),
	}
});

export const products = pgTable("products", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	description: text().notNull(),
	price: real().notNull(),
	imageUrl: text().notNull(),
	categoryId: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
},
(table) => {
	return {
		productsCategoryIdCategoriesIdFk: foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "products_categoryId_categories_id_fk"
		}),
	}
});

export const categories = pgTable("categories", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	imageUrl: text(),
});

export const orders = pgTable("orders", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	userShipId: text(),
	userCookId: text(),
	paymentId: text(),
	totalAmount: real(),
	status: status(),
	orderDate: timestamp({ mode: 'string' }).notNull(),
	deliveryAddress: text(),
	deliveryTime: timestamp({ mode: 'string' }),
	discountCode: text(),
},
(table) => {
	return {
		ordersUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "orders_userId_user_id_fk"
		}),
		ordersUserShipIdUserIdFk: foreignKey({
			columns: [table.userShipId],
			foreignColumns: [user.id],
			name: "orders_userShipId_user_id_fk"
		}),
		ordersUserCookIdUserIdFk: foreignKey({
			columns: [table.userCookId],
			foreignColumns: [user.id],
			name: "orders_userCookId_user_id_fk"
		}),
		ordersPaymentIdPaymentsIdFk: foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "orders_paymentId_payments_id_fk"
		}),
		ordersDiscountCodeDiscountsDiscountCodeFk: foreignKey({
			columns: [table.discountCode],
			foreignColumns: [discounts.discountCode],
			name: "orders_discountCode_discounts_discountCode_fk"
		}),
	}
});

export const payments = pgTable("payments", {
	id: text().primaryKey().notNull(),
	paymentName: text().notNull(),
});

export const discounts = pgTable("discounts", {
	discountCode: text().primaryKey().notNull(),
	discountName: text(),
	fromDate: timestamp({ mode: 'string' }),
	toDate: timestamp({ mode: 'string' }),
});

export const orderProducts = pgTable("orderProducts", {
	orderId: text().notNull(),
	productId: uuid().notNull(),
	quantity: integer().notNull(),
},
(table) => {
	return {
		orderProductsOrderIdOrdersIdFk: foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "orderProducts_orderId_orders_id_fk"
		}),
		orderProductsProductIdProductsIdFk: foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "orderProducts_productId_products_id_fk"
		}),
	}
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	userName: text(),
	password: text(),
	phone: text(),
	email: text(),
	address: text(),
	imageUrl: text(),
	role: text(),
	createdAt: timestamp({ mode: 'string' }),
});