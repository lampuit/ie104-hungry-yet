import { relations } from "drizzle-orm/relations";
import { user, shoppingCart, products, account, userWorkShifts, shifts, session, ratings, favorite, categories, orders, payments, discounts, orderProducts } from "./schema";

export const shoppingCartRelations = relations(shoppingCart, ({one}) => ({
	user: one(user, {
		fields: [shoppingCart.userId],
		references: [user.id]
	}),
	product: one(products, {
		fields: [shoppingCart.productId],
		references: [products.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	shoppingCarts: many(shoppingCart),
	accounts: many(account),
	userWorkShifts: many(userWorkShifts),
	sessions: many(session),
	ratings: many(ratings),
	favorites: many(favorite),
	orders_userId: many(orders, {
		relationName: "orders_userId_user_id"
	}),
	orders_userShipId: many(orders, {
		relationName: "orders_userShipId_user_id"
	}),
	orders_userCookId: many(orders, {
		relationName: "orders_userCookId_user_id"
	}),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	shoppingCarts: many(shoppingCart),
	ratings: many(ratings),
	favorites: many(favorite),
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
	orderProducts: many(orderProducts),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userWorkShiftsRelations = relations(userWorkShifts, ({one}) => ({
	user: one(user, {
		fields: [userWorkShifts.userId],
		references: [user.id]
	}),
	shift: one(shifts, {
		fields: [userWorkShifts.shiftId],
		references: [shifts.id]
	}),
}));

export const shiftsRelations = relations(shifts, ({many}) => ({
	userWorkShifts: many(userWorkShifts),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
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

export const favoriteRelations = relations(favorite, ({one}) => ({
	user: one(user, {
		fields: [favorite.userId],
		references: [user.id]
	}),
	product: one(products, {
		fields: [favorite.productId],
		references: [products.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	products: many(products),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	user_userId: one(user, {
		fields: [orders.userId],
		references: [user.id],
		relationName: "orders_userId_user_id"
	}),
	user_userShipId: one(user, {
		fields: [orders.userShipId],
		references: [user.id],
		relationName: "orders_userShipId_user_id"
	}),
	user_userCookId: one(user, {
		fields: [orders.userCookId],
		references: [user.id],
		relationName: "orders_userCookId_user_id"
	}),
	payment: one(payments, {
		fields: [orders.paymentId],
		references: [payments.id]
	}),
	discount: one(discounts, {
		fields: [orders.discountCode],
		references: [discounts.discountCode]
	}),
	orderProducts: many(orderProducts),
}));

export const paymentsRelations = relations(payments, ({many}) => ({
	orders: many(orders),
}));

export const discountsRelations = relations(discounts, ({many}) => ({
	orders: many(orders),
}));

export const orderProductsRelations = relations(orderProducts, ({one}) => ({
	order: one(orders, {
		fields: [orderProducts.orderId],
		references: [orders.id]
	}),
	product: one(products, {
		fields: [orderProducts.productId],
		references: [products.id]
	}),
}));