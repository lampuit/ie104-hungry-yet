import { pgTable, text, timestamp, foreignKey, uuid, real, boolean, integer, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const gender = pgEnum("gender", ['Nam', 'Nữ', 'Khác'])
export const invoiceStatus = pgEnum("invoiceStatus", ['pending', 'accepted', 'cooking', 'ready', 'delivered', 'cancelled'])
export const method = pgEnum("method", ['momo', 'paylater'])
export const paymentStatus = pgEnum("paymentStatus", ['pending', 'failed', 'success', 'cancelled'])
export const role = pgEnum("role", ['admin', 'staff', 'customer'])


export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text(),
	phone: text(),
	email: text(),
	gender: gender(),
	address: text(),
	imageUrl: text(),
	birthday: timestamp({ mode: 'string' }),
	role: role(),
	createdAt: timestamp({ mode: 'string' }),
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
}, (table) => {
	return {
		accountUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}),
	}
});

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	ipAddress: text(),
	userAgent: text(),
	userId: text().notNull(),
}, (table) => {
	return {
		sessionUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}),
	}
});

export const assigments = pgTable("assigments", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	shiftId: uuid(),
	workDate: timestamp({ mode: 'string' }).notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }),
}, (table) => {
	return {
		assigmentsUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "assigments_userId_user_id_fk"
		}),
		assigmentsShiftIdShiftsIdFk: foreignKey({
			columns: [table.shiftId],
			foreignColumns: [shifts.id],
			name: "assigments_shiftId_shifts_id_fk"
		}).onDelete("cascade"),
	}
});

export const shifts = pgTable("shifts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	startTime: text(),
	endTime: text(),
});

export const products = pgTable("products", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	description: text().notNull(),
	price: real().notNull(),
	imageUrl: text().notNull(),
	categoryId: uuid(),
	isPublish: boolean().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
}, (table) => {
	return {
		productsCategoryIdCategoriesIdFk: foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "products_categoryId_categories_id_fk"
		}),
	}
});

export const discounts = pgTable("discounts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	code: text(),
	discount: integer(),
	fromDate: timestamp({ mode: 'string' }),
	toDate: timestamp({ mode: 'string' }),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
});

export const categories = pgTable("categories", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	imageUrl: text(),
});

export const ratings = pgTable("ratings", {
	productId: uuid().notNull(),
	userId: text().notNull(),
	star: integer().notNull(),
	review: text(),
	imageUrl: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }),
}, (table) => {
	return {
		ratingsProductIdProductsIdFk: foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "ratings_productId_products_id_fk"
		}).onDelete("cascade"),
		ratingsUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "ratings_userId_user_id_fk"
		}).onDelete("cascade"),
	}
});

export const carts = pgTable("carts", {
	userId: text().notNull(),
	productId: uuid().notNull(),
	quantity: integer().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
}, (table) => {
	return {
		cartsUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "carts_userId_user_id_fk"
		}).onDelete("cascade"),
		cartsProductIdProductsIdFk: foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "carts_productId_products_id_fk"
		}).onDelete("cascade"),
	}
});

export const favorites = pgTable("favorites", {
	userId: text().notNull(),
	productId: uuid().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
}, (table) => {
	return {
		favoritesUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "favorites_userId_user_id_fk"
		}).onDelete("cascade"),
		favoritesProductIdProductsIdFk: foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "favorites_productId_products_id_fk"
		}).onDelete("cascade"),
	}
});

export const payments = pgTable("payments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	method: method(),
	status: paymentStatus(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
});

export const invoices = pgTable("invoices", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	customerId: text().notNull(),
	paymentId: uuid().notNull(),
	totalAmount: real(),
	status: invoiceStatus(),
	deliveryAddress: text(),
	deliveryTime: timestamp({ mode: 'string' }),
	discountId: uuid(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
}, (table) => {
	return {
		invoicesCustomerIdUserIdFk: foreignKey({
			columns: [table.customerId],
			foreignColumns: [user.id],
			name: "invoices_customerId_user_id_fk"
		}).onUpdate("cascade"),
		invoicesPaymentIdPaymentsIdFk: foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "invoices_paymentId_payments_id_fk"
		}).onDelete("cascade"),
		invoicesDiscountIdDiscountsIdFk: foreignKey({
			columns: [table.discountId],
			foreignColumns: [discounts.id],
			name: "invoices_discountId_discounts_id_fk"
		}),
	}
});

export const orders = pgTable("orders", {
	invoiceId: uuid().notNull(),
	productId: uuid().notNull(),
	quantity: integer().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
}, (table) => {
	return {
		ordersProductIdProductsIdFk: foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "orders_productId_products_id_fk"
		}).onDelete("cascade"),
		ordersInvoiceIdInvoicesIdFk: foreignKey({
			columns: [table.invoiceId],
			foreignColumns: [invoices.id],
			name: "orders_invoiceId_invoices_id_fk"
		}).onDelete("cascade"),
	}
});
