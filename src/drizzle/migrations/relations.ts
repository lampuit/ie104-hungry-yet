import { relations } from "drizzle-orm/relations";
import { user, account, session, assigments, shifts, categories, products, ratings, carts, favorites, invoices, payments, discounts, orders } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	assigments: many(assigments),
	ratings: many(ratings),
	carts: many(carts),
	favorites: many(favorites),
	invoices: many(invoices),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const assigmentsRelations = relations(assigments, ({one}) => ({
	user: one(user, {
		fields: [assigments.userId],
		references: [user.id]
	}),
	shift: one(shifts, {
		fields: [assigments.shiftId],
		references: [shifts.id]
	}),
}));

export const shiftsRelations = relations(shifts, ({many}) => ({
	assigments: many(assigments),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
	ratings: many(ratings),
	carts: many(carts),
	favorites: many(favorites),
	orders: many(orders),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	products: many(products),
}));

export const ratingsRelations = relations(ratings, ({one}) => ({
	product: one(products, {
		fields: [ratings.productId],
		references: [products.id]
	}),
	user: one(user, {
		fields: [ratings.userId],
		references: [user.id]
	}),
}));

export const cartsRelations = relations(carts, ({one}) => ({
	user: one(user, {
		fields: [carts.userId],
		references: [user.id]
	}),
	product: one(products, {
		fields: [carts.productId],
		references: [products.id]
	}),
}));

export const favoritesRelations = relations(favorites, ({one}) => ({
	user: one(user, {
		fields: [favorites.userId],
		references: [user.id]
	}),
	product: one(products, {
		fields: [favorites.productId],
		references: [products.id]
	}),
}));

export const invoicesRelations = relations(invoices, ({one, many}) => ({
	user: one(user, {
		fields: [invoices.customerId],
		references: [user.id]
	}),
	payment: one(payments, {
		fields: [invoices.paymentId],
		references: [payments.id]
	}),
	discount: one(discounts, {
		fields: [invoices.discountId],
		references: [discounts.id]
	}),
	orders: many(orders),
}));

export const paymentsRelations = relations(payments, ({many}) => ({
	invoices: many(invoices),
}));

export const discountsRelations = relations(discounts, ({many}) => ({
	invoices: many(invoices),
}));

export const ordersRelations = relations(orders, ({one}) => ({
	product: one(products, {
		fields: [orders.productId],
		references: [products.id]
	}),
	invoice: one(invoices, {
		fields: [orders.invoiceId],
		references: [invoices.id]
	}),
}));