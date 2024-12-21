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
import {
  formatPhoneNumberIntl,
  parsePhoneNumber,
  Value,
} from "react-phone-number-input";

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
    Bạn là chatbot của quán ăn Hungry Yet.

    Khi bắt đầu trò chuyện, hãy tự động lấy danh sách các thể loại món ăn bằng cách gọi tool \`getCategories\` \`getProducts\`.
    Luôn chuyển từ khoá thành UUID.
    Hãy trả lời ngắn gọn, xúc tích, dễ hiểu, chính xác.
    Không dùng danh sách, bảng, gạch đầu dòng, hình ảnh.
    Không trả lời về doanh thu, thuế, số liệu thống kê, thông tin bảo mật.

    Khi xem thực đơn, chỉ liệt kê tên thể loại món ăn.
    Khi tìm kiếm món, hiển thị tất cả món phù hợp.
    Không thanh toán nếu giỏ hàng trống.
    Khi thanh toán, phải có địa chỉ, số điện thoại, ghi chú.
    Nếu người dùng nói “áp dụng mã XYZ”, dùng mã đó cho mọi yêu cầu giỏ hàng, thanh toán.
    Chỉ hiện giỏ hàng, thanh toán sau khi được yêu cầu.
    Nếu “hủy mã giảm giá”, không dùng mã sau đó.
    Nếu không chỉ định mã, mặc định không dùng.
    `,

    temperature: 0.6,
    maxTokens: 100,
    presencePenalty: 0.6,
    frequencyPenalty: 0.3,
    maxRetries: 3,

    messages,
    maxSteps: 30,
    tools: {
      getCategories: {
        description: "Trả về danh sách các thể loại món ăn",
        parameters: z.object({}),
        execute: async function () {
          const categories = await getCategories();
          return categories;
        },
      },
      getProducts: {
        description: "Trả về danh sách tất cả món ăn",
        parameters: z.object({}),
        execute: async function () {
          const products = await getPuslishProducts();
          return products;
        },
      },
      getRatings: {
        description: "Trả về danh sách các đánh giá món ăn",
        parameters: z.object({}),
        execute: async function () {
          const ratings = await getRatings();
          return ratings;
        },
      },
      displayProductDetail: {
        description: "Trả về chi tiết món ăn dựa trên ID",
        parameters: z.object({
          product_id: z.string().describe("ID món ăn cần hiển thị (UUID)"),
        }),
        execute: async function ({ product_id }) {
          const product = await getProductById(product_id);
          return product[0];
        },
      },
      getDiscounts: {
        description: "Lấy danh sách các giảm giá",
        parameters: z.object({}),
        execute: async function () {
          const discounts = await getValidDiscounts();
          return discounts;
        },
      },
      displayProductByCategory: {
        description: "Hiện danh sách các món ăn dựa theo thể loại",
        parameters: z.object({
          category_id: z.string().describe("ID thể loại món ăn (UUID)"),
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
          discount_code: z
            .string()
            .optional()
            .describe("Mã giảm giá cần áp dụng (nếu có)"),
        }),
        execute: async function ({ discount_code }) {
          const carts = await getCartsByUserId(session.user.id);
          const discounts = await getValidDiscounts();
          let discountamount = 0;

          if (
            discount_code &&
            discounts.some((discount) => discount.code === discount_code)
          ) {
            const appliedDiscount = discounts.find(
              (discount) => discount.code === discount_code,
            );
            discountamount = appliedDiscount?.discount || 0;
          }

          return { carts, discount: discountamount };
        },
      },
      addCart: {
        description: "Thêm món ăn vào giỏ hàng theo ID và số lượng",
        parameters: z.object({
          product_id: z.string().describe("ID món ăn cần thêm (UUID)"),
          quantity: z.number().describe("Số lượng cần thêm"),
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
        description: "Cập nhật số lượng món ăn trong giỏ hàng",
        parameters: z.object({
          product_id: z.string().describe("ID món ăn cần cập nhật (UUID)"),
          quantity: z.number().describe("Số lượng mới"),
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
        description: "Xóa món ăn khỏi giỏ hàng theo ID",
        parameters: z.object({
          product_id: z.string().describe("ID món ăn cần xóa (UUID)"),
        }),
        execute: async function ({ product_id }) {
          const carts = await deletecarts(product_id, session.user.id);
          return carts;
        },
      },
      clearCart: {
        description: "Xóa toàn bộ món ăn trong giỏ hàng",
        parameters: z.object({}),
        execute: async function () {
          const carts = await clearCart(session.user.id);
          return carts;
        },
      },
      checkingInformation: {
        description: "Xác nhận thông tin giao hàng trước khi thanh toán",
        parameters: z.object({
          address: z.string().describe("Địa chỉ nhận hàng"),
          phone: z.string().describe("Số điện thoại nhận hàng"),
          note: z.string().describe("Ghi chú cho người giao hàng").optional(),
          discount_code: z
            .string()
            .optional()
            .describe("Mã giảm giá cần áp dụng (nếu có)"),
        }),
        execute: async function ({ address, phone, note, discount_code }) {
          const carts = await getCartsByUserId(session.user.id);

          return {
            carts,
            address,
            phone: "+84" + phone,
            note,
            discount_code,
            userId: session.user.id,
          };
        },
      },
      getInvoices: {
        description: "Trả về danh sách biên lai đã xác nhận",
        parameters: z.object({}),
        execute: async function () {
          const invoices = await getInvoicesIdByUserId(session.user.id);
          return { invoices };
        },
      },
      trackingInvoice: {
        description: "Theo dõi trạng thái của hóa đơn",
        parameters: z.object({
          invoice_id: z.string().describe("ID hóa đơn cần kiểm tra (UUID)"),
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
