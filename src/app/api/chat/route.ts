import { streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { z } from "zod";
import {
  getCartsByUserId,
  getCategories,
  getInvoicesIdByUserId,
  getProductsByCategory,
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
import { formatDistanceStrict } from "date-fns";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) throw new Error("Không tồn tại session");

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: `
    - Bạn là một bot con bot của một tiệm bán đồ ăn tên Hungry Yet
    - Hãy phản hồi ngắn gọn
    - Khi thanh toán yêu cầu người dùng nhập đầy đủ thông tin
    `,
    messages,
    maxSteps: 5,
    tools: {
      getCategories: {
        description: "Danh sách các thể loại món ăn",
        parameters: z.object({}),
        execute: async function () {
          const categories = await getCategories();
          return categories;
        },
      },
      displayProducts: {
        description: "Hiện danh sách các món ăn dựa theo thể loại",
        parameters: z.object({
          category_id: z.string(),
        }),
        execute: async function ({ category_id }) {
          const products = await getProductsByCategory(category_id);
          return { ...products };
        },
      },
      displayCarts: {
        description: "Hiện danh sách món ăn trong giỏ hàng",
        parameters: z.object({}),
        execute: async function () {
          const carts = await getCartsByUserId(session.user.id);

          const subtotal: number = carts.reduce(
            (acc, cart) => acc + cart.product.price * cart.quantity,
            0,
          );

          return { carts, subtotal };
        },
      },
      getInvoices: {
        description: "Danh sách các hóa đơn đã được xác nhận",
        parameters: z.object({}),
        execute: async function () {
          const invoices = await getInvoicesIdByUserId(session.user.id);
          return { invoices };
        },
      },
      addCart: {
        description: "Thêm món ăn vào giỏ hàng",
        parameters: z.object({
          product_id: z.string(),
          quantity: z.number(),
        }),
        execute: async function ({ product_id, quantity }) {
          const formData = new FormData();
          formData.append("userId", session.user.id);
          formData.append("productId", product_id);
          formData.append("quantity", quantity);
          const cart = await createCart(formData);
          return { cart };
        },
      },
      updateCart: {
        description: "Cập nhập món ăn được chỉ định trong giỏ hàng",
        parameters: z.object({
          product_id: z.string(),
          quantity: z.number(),
        }),
        execute: async function ({ product_id, quantity }) {
          const formData = new FormData();
          formData.append("userId", session.user.id);
          formData.append("productId", product_id);
          formData.append("quantity", quantity);

          const carts = await updateCarts(formData);
          return { carts };
        },
      },
      deleteCart: {
        description: "Xóa món ăn được chỉ định ra khỏi giỏ hàng",
        parameters: z.object({
          product_id: z.string(),
        }),
        execute: async function ({ product_id }) {
          const carts = await deletecarts(product_id, session.user.id);
          return { carts };
        },
      },
      clearCart: {
        description: "Xóa tất cả món ăn ra khỏi giỏ hàng",
        parameters: z.object({}),
        execute: async function () {
          const carts = await clearCart(session.user.id);
          return { carts };
        },
      },
      getDiscount: {
        description: "Danh sách các mã giảm giá hợp lệ",
        parameters: z.object({}),
        execute: async function () {
          const discounts = await getValidDiscounts();
          return { discounts };
        },
      },
      checkout: {
        description: "Thanh toán hóa đơn",
        parameters: z.object({
          street: z
            .string()
            .describe("Tên đường và số nhà nơi đơn hàng cần được giao."),
          province: z
            .string()
            .describe("Tên tỉnh hoặc thành phố nơi đơn hàng được giao."),
          district: z
            .string()
            .describe("Tên quận/huyện nơi đơn hàng được giao."),
          ward: z.string().describe("Tên phường/xã nơi đơn hàng được giao."),
          phone: z
            .string()
            .describe(
              "Số điện thoại của người nhận đơn hàng để liên hệ khi cần.",
            ),
          note: z
            .string()
            .describe(
              "Ghi chú bổ sung cho người giao hàng, ví dụ: 'Gọi trước khi giao' hoặc 'Giao sau 18h'.",
            ),
        }),
        execute: async function ({
          street,
          province,
          district,
          ward,
          phone,
          note,
        }) {
          return { address: street + province + district + ward + phone, note };
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
