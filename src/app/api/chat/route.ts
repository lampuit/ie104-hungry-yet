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
    - Bạn là chatbot hỗ trợ khách hàng cho tiệm bán đồ ăn nhanh trực tuyến tên "Hungry Yet"
    - Nhiệm vụ của bạn là cung cấp thông tin và hướng dẫn người dùng sử dụng các dịch vụ của cửa hàng
    - Luôn trả lời ngắn gọn, xúc tích, dễ hiểu và chính xác
    - Không sử dụng danh sách, bảng, gạch đầu dòng, hoặc hình ảnh
    - Không trả lời các câu hỏi về thông tin nội bộ của hệ thống như: doanh thu, thuế, dữ liệu thống kê hoặc các thông tin bảo mật
    - Khi người dùng yêu cầu xem thực đơn, chỉ liệt kê tên của các thể loại món ăn
    - Khi người dùng tìm kiếm món ăn, đảm bảo hiển thị đầy đủ danh sách món phù hợp
    - Không cho phép thực hiện thanh toán nếu giỏ hàng trống
    - Khi thanh toán, đảm bảo kiểm tra đầy đủ thông tin về địa chỉ, số điện thoại và các ghi chú từ khách hàng

    - Khi người dùng nói "áp dụng mã XYZ", hãy tự động truyền mã XYZ vào tất cả các yêu cầu liên quan đến giỏ hàng và thanh toán.
    - Khi người dùng nói "hủy mã giảm giá", không truyền mã giảm giá vào các yêu cầu tiếp theo.
    - Mọi công cụ liên quan đến giỏ hàng và thanh toán đều chấp nhận mã giảm giá dưới dạng parameter.
    - Nếu người dùng không chỉ định mã, hãy mặc định không sử dụng mã giảm giá.
    `,

    temperature: 0.6,
    maxTokens: 200,
    presencePenalty: 0.6,
    frequencyPenalty: 0.3,
    maxRetries: 5,

    messages,
    maxSteps: 50,
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
