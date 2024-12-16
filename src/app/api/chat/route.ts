import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  getCartsByUserId,
  getCategories,
  getInvoicesIdByUserId,
  getProductsByCategory,
  getPuslishProducts,
  getRatings,
  getValidDiscounts,
} from "@/lib/data";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  clearCart,
  createCart,
  deletecarts,
  updateCarts,
} from "@/lib/actions/cart";
import { getInvoiceDetail, getProductById } from "@/lib/actions/chatbot";
import { invoices } from "@/drizzle/schema/project";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) throw new Error("Không tồn tại session");

  const result = streamText({
    model: openai("gpt-4o-mini-2024-07-18"),
    system: `
    - Bạn là chatbot thông tin của tiệm bán đồ ăn nhanh trực tuyến tên Hungry Yet
    - Nhiệm vụ của bạn là hướng dẫn người dùng
    - Câu trả lời của bạn ngắn gọn
    - Bạn không bao giờ sử dụng danh sách, bảng hoặc gạch đầu dòng, hình ảnh; thay vào đó, bạn không trả lời lại
    - Không trả lời các thông tin nhạy cảm của hệ thống; doanh thu; thuế má; thống kê;
    - Khi người dùng yêu cầu xem thực đơn, hãy liệt kê các tên thể loại
    `,
    messages,
    maxSteps: 5,
    tools: {
      getCategories: {
        description: "Lấy danh sách tên thể loại",
        parameters: z.object({}),
        execute: async function () {
          const categories = await getCategories();
          return categories;
        },
      },
      getProducts: {
        description: "Lấy danh sách các món ăn",
        parameters: z.object({}),
        execute: async function () {
          const products = await getPuslishProducts();
          return products;
        },
      },
      getRatings: {
        description: "Lấy danh sách các đánh giá",
        parameters: z.object({}),
        execute: async function () {
          const ratings = await getRatings();
          return ratings;
        },
      },
      displayProductDetail: {
        description: "Hiển thị thông tin chi tiết của món ăn",
        parameters: z.object({
          product_id: z
            .string()
            .describe("Mã món ăn được hiển thị định dạng UUID"),
        }),
        execute: async function ({ product_id }) {
          const product = await getProductById(product_id);
          return product[0];
        },
      },
      getDiscounts: {
        description: "Lấy danh sách các mã giảm giá",
        parameters: z.object({}),
        execute: async function () {
          const discounts = await getValidDiscounts();
          return discounts;
        },
      },
      displayProductByCategory: {
        description: "Hiện danh sách các món ăn dựa theo thể loại",
        parameters: z.object({
          category_id: z.string().describe("Mã thể loại món ăn định dạng UUID"),
        }),
        execute: async function ({ category_id }) {
          const products = await getProductsByCategory(category_id);
          console.log(products);
          return products;
        },
      },
      displayCart: {
        description: "Hiện danh sách các món ăn trong giỏ hàng",
        parameters: z.object({
          discount: z.number().describe("Số tiền giảm giá").default(0),
        }),
        execute: async function ({ discount }) {
          const carts = await getCartsByUserId(session.user.id);
          console.log(discount);

          return { carts, discount };
        },
      },
      addCart: {
        description: "Thêm món ăn chỉ định vào giỏ hàng",
        parameters: z.object({
          product_id: z
            .string()
            .describe("Mã của món ăn được thêm định dạng UUID"),
          quantity: z.number().describe("Số lượng món ăn"),
        }),
        execute: async function ({ product_id, quantity }) {
          console.log(product_id);
          console.log(quantity);
          const formData = new FormData();
          formData.append("userId", session.user.id);
          formData.append("productId", product_id);
          formData.append("quantity", quantity.toString());
          const cart = await createCart(formData);
          return cart;
        },
      },
      updateCart: {
        description: "Cập nhập món ăn được chỉ định trong giỏ hàng",
        parameters: z.object({
          product_id: z
            .string()
            .describe("Mã của món ăn được cập nhập định dạng UUID"),
          quantity: z.number().describe("Số lượng món ăn"),
        }),
        execute: async function ({ product_id, quantity }) {
          const formData = new FormData();
          formData.append("userId", session.user.id);
          formData.append("productId", product_id);
          formData.append("quantity", quantity.toString());

          const carts = await updateCarts(formData);
          return carts;
        },
      },
      deleteCart: {
        description: "Xóa món ăn được chỉ định ra khỏi giỏ hàng",
        parameters: z.object({
          product_id: z
            .string()
            .describe("Mã của món ăn được xóa định dạng UUID"),
        }),
        execute: async function ({ product_id }) {
          const carts = await deletecarts(product_id, session.user.id);
          return carts;
        },
      },
      clearCart: {
        description: "Xóa tất cả các món ăn ra khỏi giỏ hàng",
        parameters: z.object({}),
        execute: async function () {
          const carts = await clearCart(session.user.id);
          return carts;
        },
      },
      checkingInformation: {
        description: "Kiểm tra thông tin giao hàng",
        parameters: z.object({
          address: z.string().describe("Địa chỉ của người nhận đơn hàng"),
          phone: z
            .string()
            .describe(
              "Số điện thoại của người nhận đơn hàng để liên hệ khi cần",
            ),
          note: z
            .string()
            .describe("Ghi chú bổ sung cho người giao hàn")
            .optional(),
          discount_id: z
            .string()
            .describe("Mã giảm giá được áp dụng định dạng UUID")
            .optional(),
        }),
        execute: async function ({ address, phone, note, discount_id }) {
          const carts = await getCartsByUserId(session.user.id);

          return {
            carts,
            address,
            phone,
            note,
            discount_id,
            userId: session.user.id,
          };
        },
      },
      getInvoices: {
        description: "Lấy danh sách các biên lai đã được xác nhận",
        parameters: z.object({}),
        execute: async function () {
          const invoices = await getInvoicesIdByUserId(session.user.id);
          return { invoices };
        },
      },
      trackingInvoice: {
        description: "Kiểm tra trạng thái của hóa đơn",
        parameters: z.object({
          invoice_id: z
            .string()
            .describe("Mã của hóa đơn được kiểm tra định dạng UUID"),
        }),
        execute: async function ({ invoice_id }) {
          const invoice = await getInvoiceDetail(invoice_id, session.user.id);
          return invoice;
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
