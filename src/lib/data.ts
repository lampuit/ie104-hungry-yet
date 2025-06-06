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
import {
  eq,
  and,
  getTableColumns,
  lte,
  gte,
  isNull,
  or,
  notInArray,
  desc,
  sql,
  SQL,
} from "drizzle-orm";
import { unstable_noStore } from "next/cache";

// Hóa đơn (invoices)

export async function getAllInvoices() {
  return await db.query.invoices.findMany({
    with: {
      orders: {
        with: {
          products: {
            with: {
              category: true,
            },
          },
        },
      },
    },
  });
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

export async function getInvoicesIdByUserId(userId: string) {
  try {
    return await db.query.invoices.findMany({
      with: {
        orders: true,
        payment: true,
      },
      where: and(
        eq(invoices.customerId, userId),
        notInArray(invoices.status, ["cancelled"]),
      ),
    });
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu danh sách hóa đơn xác nhận.");
  }
}

export async function getInvoices() {
  try {
    return await db
      .select({
        date: sql`DATE(${invoices.createdAt})`,
        invoices: sql<number>`count(${invoices.id})`.mapWith(Number),
      })
      .from(invoices)
      .groupBy(sql`DATE(${invoices.createdAt})`)
      .orderBy(desc(sql`DATE(${invoices.createdAt})`));
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu danh sách hóa đơn.");
  }
}

export async function getRevenues() {
  try {
    return await db
      .select({
        monthYear: sql`TO_CHAR(DATE_TRUNC('month', ${invoices.createdAt}), 'YYYY-MM')`,
        revenues: sql<number>`SUM(${invoices.totalAmount})`,
      })
      .from(invoices)
      .where(eq(invoices.status, "delivered"))
      .groupBy(sql`DATE_TRUNC('month', ${invoices.createdAt})`)
      .orderBy(desc(sql`DATE_TRUNC('month', ${invoices.createdAt})`));
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu danh sách hóa đơn.");
  }
}

export async function getInvoicesByStatus(status: string) {
  try {
    return await db
      .select()
      .from(invoices)
      .where(
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
      );
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu danh sách hóa đơn.");
  }
}

// Phân loại (Categories)

export async function getAllCategory() {
  const response = await db
    .select({
      ...getTableColumns(categories),
    })
    .from(categories);
  return response;
}

export async function getCategories() {
  try {
    return await db.query.categories.findMany();
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu danh sách thể loại.");
  }
}

export async function getPuslishProducts() {
  try {
    return await db.query.products.findMany({
      columns: {
        id: true,
        name: true,
        price: true,
      },
    });
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu danh sách sản phẩm.");
  }
}

// Sản phẩm (Products)

export async function getAllProducts() {
  return await db.query.products.findMany({
    with: {
      category: true,
    },
  });
}

export async function getProductByCategoryId(
  id: string,
  page: number,
  pageSize: number,
) {
  // Count total records for the specified category ID
  const totalRecords = await db.$count(products, eq(products.categoryId, id));

  // Retrieve the paginated records with average star rating
  const records = await db
    .select({
      ...getTableColumns(products),
      averageRating: sql<number>`COALESCE(AVG(${ratings.star}), 0)`.as(
        "averageRating",
      ),
    })
    .from(products)
    .leftJoin(ratings, eq(products.id, ratings.productId))
    .where(eq(products.categoryId, id))
    .groupBy(products.id)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
  // Return both totalRecords and the records for the current page
  return { totalRecords, records };
}

export async function getProductsByCategory(category_id: string) {
  try {
    return await db.query.categories.findFirst({
      columns: {
        name: true,
      },
      where: eq(categories.id, category_id),
      with: {
        products: {
          columns: {
            id: true,
            name: true,
            imageUrl: true,
            price: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu danh sách sản phẩm theo thể loại.");
  }
}

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

// Đánh giá (Ratings)

export async function getRatings() {
  try {
    return await db.query.ratings.findMany();
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu danh sách đánh giá.");
  }
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

// Ưu đãi (Discounts)

export async function fetchDiscounts() {
  try {
    return await db.query.discounts.findMany();
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu mã ưu đãi.");
  }
}

export async function getValidDiscounts() {
  try {
    const now = new Date();
    const discount = await db.query.discounts.findMany({
      columns: {
        id: true,
        code: true,
        discount: true,
      },
      where: and(
        or(isNull(discounts.fromDate), lte(discounts.fromDate, now)),
        or(isNull(discounts.toDate), gte(discounts.toDate, now)),
      ),
    });
    return discount;
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu mã ưu đãi.");
  }
}

export async function fetchValidDiscount(code: string) {
  try {
    const now = new Date();
    return await db.query.discounts.findFirst({
      where: and(
        eq(discounts.code, code),
        or(isNull(discounts.fromDate), lte(discounts.fromDate, now)),
        or(isNull(discounts.toDate), gte(discounts.toDate, now)),
      ),
    });
  } catch (error) {
    throw new Error("Không thể lấy dữ liệu mã ưu đãi.");
  }
}

// Giỏ hàng (Carts)

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

export async function getCartsByUserId(userId: string) {
  return await db.query.carts.findMany({
    where: eq(carts.userId, userId),
    with: {
      product: {
        with: {
          category: true,
        },
      },
    },
  });
}

// Người dùng (Users)

export async function getUserById(id: string) {
  return await db
    .select({
      ...getTableColumns(user),
    })
    .from(user)
    .where(eq(user.id, id));
}

export async function getAllEmployee() {
  return await db.select().from(user).where(eq(user.role, "staff"));
}

// Ca làm việc (Shifts)

export async function getAllShift() {
  return await db.select().from(shifts);
}

// Yêu thích (Favorites)

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

// Phân công (Assigments)

export async function getUserWorkShift() {
  return await db.select().from(assigments);
}

// Lọc và tìm kiếm sản phẩm

export async function filterAndSearch(formData: FormData) {
  const { categoryId, minPrice, maxPrice, rating, search, page, pageSize } =
    Object.fromEntries(formData);

  const pageNumber = Number(page) || 1;
  const itemsPerPage = Number(pageSize) || 10;

  let whereClause: SQL[] = [];

  if (categoryId) {
    whereClause.push(eq(products.categoryId, categoryId as string));
  }

  if (minPrice) {
    whereClause.push(gte(products.price, Number(minPrice)));
  }

  if (maxPrice) {
    whereClause.push(lte(products.price, Number(maxPrice)));
  }

  if (search) {
    whereClause.push(
      sql`LOWER(${products.name}) LIKE LOWER(${`%${search as string}%`})`,
    );
  }

  const averageRatingExpr = sql<number>`COALESCE(AVG(${ratings.star}), 0)`;

  const baseQuery = db
    .select({
      ...getTableColumns(products),
      averageRating: averageRatingExpr.as("averageRating"),
    })
    .from(products)
    .leftJoin(ratings, eq(products.id, ratings.productId))
    .where(and(...whereClause))
    .groupBy(products.id);

  // Apply rating filter after aggregation
  let query = baseQuery as any;
  if (rating) {
    query = query.having(sql`${averageRatingExpr} >= ${Number(rating)}`);
  }

  // Count total records
  const totalRecordsResult = await db
    .select({ count: sql<number>`COUNT(DISTINCT ${products.id})` })
    .from(query.as("filtered_products"));

  const totalRecords = totalRecordsResult[0]?.count || 0;

  // Retrieve the paginated records and sort by averageRating descending
  const records = await query
    .orderBy(sql`${averageRatingExpr} DESC`)
    .limit(itemsPerPage)
    .offset((pageNumber - 1) * itemsPerPage);

  // Return pagination information along with the records
  return {
    totalRecords,
    records,
  };
}
