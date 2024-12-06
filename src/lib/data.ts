"use server";

import { db } from "@/drizzle/db";
import {
  favorites,
  products,
  carts,
  categories,
  ratings,
  shifts,
  assigments,
  discounts,
  invoices,
  orders,
} from "@/drizzle/schema/project";
import { user } from "@/drizzle/schema/auth";
import { eq, and, getTableColumns, lte, gte, isNull, or } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { ca } from "date-fns/locale";
import { truncate } from "fs/promises";

export async function fetchProducts() {
  try {
    return await db
      .select({
        ...getTableColumns(products),
        categoryName: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu danh sách sản phẩm.");
  }
}

export async function fetchDiscounts() {
  try {
    return await db.query.discounts.findMany();
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu mã ưu đãi.");
  }
}

export async function fetchValidDiscount(code: string) {
  try {
    const now = new Date();
    const discount = await db.query.discounts.findFirst({
      where: and(
        eq(discounts.code, code),
        or(isNull(discounts.fromDate), lte(discounts.fromDate, now)),
        or(isNull(discounts.toDate), gte(discounts.toDate, now)),
      ),
    });
    return discount;
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu mã ưu đãi.");
  }
}

export async function fetchProductId(id: string) {
  try {
    unstable_noStore();
    return await Promise.all([
      db.query.categories.findMany(),
      db.query.products.findFirst({
        where: eq(products.id, id),
      }),
    ]);
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu sản phẩm.");
  }
}

export async function fetchCarts() {
  try {
    return db.query.carts.findMany({
      with: {
        product: {
          with: { category: true },
        },
      },
    });
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu mã ưu đãi.");
  }
}

export async function getUserById(id: string) {
  return await db
    .select({
      ...getTableColumns(user),
    })
    .from(user)
    .where(eq(user.id, id));
}

export async function getAllShift() {
  return await db.select().from(shifts);
}

export async function getAllEmployee() {
  return await db.select().from(user).where(eq(user.role, "staff"));
}

export async function getAllProducts() {
  return await db.query.products.findMany({
    with: {
      category: true,
    },
  });
}

export async function getProductById({ id }: { id: string }) {
  return await db
    .select({
      ...getTableColumns(products),
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.id, id));
}

export async function getAllCategory() {
  const response = await db
    .select({
      ...getTableColumns(categories),
    })
    .from(categories);
  return response;
}

export async function getProductByCategoryId(
  id: string,
  page: number,
  pageSize: number,
) {
  // Count total records for the specified category ID
  const totalRecords = await db.$count(products, eq(products.categoryId, id));

  // Retrieve the paginated records
  const records = await db
    .select({
      ...getTableColumns(products),
    })
    .from(products)
    .where(eq(products.categoryId, id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
  // Return both totalRecords and the records for the current page
  return { totalRecords, records };
}

export async function getFavoriteByUserId(userId: string) {
  return await db.query.favorites.findMany({
    where: eq(favorites.userId, userId),
    with: {
      products: {
        with: {
          category: true,
        },
      },
    },
  });
}

export async function getCartsByUserId(userId: string) {
  return await db.query.carts.findMany({
    where: eq(carts.userId, userId),
    with: {
      product: {
        with: {
          category: true,
          favorites: {
            where: eq(favorites.userId, userId),
          },
        },
      },
    },
  });
}

export async function getAllRatings() {
  return await db.query.ratings.findMany({
    with: {
      product: {
        with: {
          category: true,
        },
      },
    },
  });
}

export async function getRatingsByProductId(id: string) {
  return await db.query.ratings.findMany({
    where: eq(ratings.productId, id),
    with: {
      user: true,
      product: {
        with: {
          category: true,
        },
      },
    },
  });
}

export async function getUserWorkShift() {
  return await db.select().from(assigments);
}

export async function getInvoiceByUserId(userId: string, status: string) {
  return await db
    .select()
    .from(invoices)
    .where(
      and(
        eq(invoices.customerId, userId),
        eq(
          invoices.status,
          status as
            | "pending"
            | "accepted"
            | "cooking"
            | "ready"
            | "delivered"
            | "cancelled",
        ),
      ),
    );
}

export async function getInvoiceDetail(id: string) {
  return await db.query.invoices.findFirst({
    where: eq(invoices.id, id),
    with: {
      orders: {
        where: eq(orders.invoiceId, id),
        with: {
          products: {
            with: {
              category: true,
            },
          },
        },
      },
      discount: true,
    },
  });
}
