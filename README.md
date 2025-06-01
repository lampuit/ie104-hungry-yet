## 🌟 "Hungry Yet?" : Website đặt đồ ăn trực tuyến

"Hungry Yet?" là một ứng dụng web hiện đại cho phép người dùng đặt đồ ăn trực tuyến với các tính năng tối ưu, giao diện đẹp mắt và trải nghiệm mượt mà. Đồ án sử dụng các công nghệ tiên tiến trong ngành phát triển web nhằm mang lại hiệu năng và khả năng mở rộng tốt.🤟

## 🚀 Tính Năng Chính

- **Quản lý món ăn, đơn hàng và khuyến mãi**: Hỗ trợ quản lý danh sách món ăn, theo dõi đơn hàng, cập nhật khuyến mãi.
- **Quản lý ca làm việc và nhân viên**: Phân bổ ca làm và quản lý thông tin nhân viên hiệu quả.
- **Thống kê và báo cáo**: Theo dõi doanh thu, báo cáo hoạt động kinh doanh của cửa hàng.
- **Tích hợp thanh toán MoMo**: Thanh toán trực tuyến thông qua ví điện tử MoMo.
- **Hỗ trợ AI Chatbot**: Trợ lý AI thông minh hỗ trợ người dùng tìm kiếm món ăn, gợi ý món ăn, đặt hàng, thanh toán và kiểm tra hóa đơn.
- **Giao diện người dùng hiện đại**: Giao diện trực quan, thân thiện với người dùng, đáp ứng đầy đủ chức năng của một website bán hàng trực tuyến.

## 🛠️ Công Nghệ Sử Dụng

- **Next.js**: Framework React tối ưu SEO và hiệu năng.
- **Tailwind CSS**: Framework CSS hiện đại giúp xây dựng giao diện nhanh chóng và đẹp mắt.
- **Drizzle ORM**: Quản lý cơ sở dữ liệu đơn giản và mạnh mẽ.
- **PNPM**: Trình quản lý package nhanh và tiết kiệm tài nguyên.
- **Prettier & ESLint**: Công cụ định dạng và kiểm tra mã nguồn.
- **Better Auth**: Quản lý xác thực bảo mật cho ứng dụng.
- **Vercel Blob**: Lưu trữ file và hình ảnh từ Vercel.
- **Neon PostgreSQL**: Dịch vụ cơ sở dữ liệu PostgreSQL hiệu suất cao trên đám mây.
- **Vercel AI SDK**: Tích hợp AI chatbot thông minh vào ứng dụng.
- **Shadcn**: Tạo giao diện UI hiện đại và tinh tế.
- **Motion**: Thư viện tạo hiệu ứng animation mượt mà.

## 📂 Cấu Trúc Thư Mục

```plaintext
.
├── public/              # Thư mục chứa hình ảnh và các tài nguyên tĩnh
├── src/                 # Mã nguồn chính của dự án
|   ├── app/             # Các trang của ứng dụng
│   ├── components/      # Các thành phần React
│   ├── lib/             # Các thư viện và hàm tiện ích
│   ├── drizzle/         # Cấu trúc ORM Drizzle
|   ├── hooks/           # Các hooks tùy chỉnh
│   ├── styles/          # Các file CSS và Tailwind
│   └── utils/           # Các hàm tiện ích
├── .env.local           # File cấu hình môi trường local
├── .eslint.json         # Cấu hình ESLint
├── .prettierrc          # Cấu hình Prettier
├── drizzle.config.ts    # Cấu hình ORM Drizzle
├── next.config.mjs      # Cấu hình Next.js
├── package.json         # File quản lý dependencies
├── pnpm-lock.yaml       # File lock cho PNPM
├── tailwind.config.ts   # Cấu hình Tailwind CSS
├── tsconfig.json        # Cấu hình TypeScript
└── README.md            # Tài liệu hướng dẫn (file hiện tại)
```

## ⚙️ Cài Đặt và Chạy Dự Án

1. **Clone Repository**

   ```bash
   git clone <link-repository>
   cd <tên-thư-mục>
   ```

2. **Cài Đặt Package**

   ```bash
   npm i
   # or
   yarn i
   # or
   pnpm i
   # or
   bun i
   ```

3. **Tạo File .env.local**
   Sao chép cấu trúc file .env.local và điền các thông tin cần thiết:

   ```plaintext
   # DATABASE
   DATABASE_URL=<Link kết nối cơ sở dữ liệu>

   # AUTHENTICATION
   BETTER_AUTH_SECRET=<Secret Key cho Better Auth>
   BETTER_AUTH_URL=http://localhost:3000

   # BLOB STORAGE
   BLOB_READ_WRITE_TOKEN=<Token kết nối với Vercel Blob>

   # MOMO PAYMENT
   MOMO_ACCESS_KEY=F8BBA842ECF85
   MOMO_SECRET_KEY=K951B6PE1waDMi640xX08PD3vg6EkVlz
   MOMO_PARTNER_CODE=MOMO

   # OPENAI
   OPENAI_API_KEY=<API Key của OpenAI>
   ```

4. **Chạy Đồ Án**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
   Ứng dụng sẽ chạy tại: [http://localhost:3000](http://localhost:3000)

## 🧩 Phát Triển và Build

- **Build Production**
  ```bash
  pnpm build
  ```
- **Kiểm Tra Lỗi Code**
  ```bash
  pnpm lint
  ```
- **Format Code**
  ```bash
  pnpm format
  ```
- **Cập nhật cơ sở dữ liệu**
  ```bash
  pnpm db:generate
  pnpm db:push
  pnpm db:migrate
  pnpm db:seed
  ```

## 💡 Góp Ý và Phát Triển

Chúng tôi luôn chào đón các đóng góp từ cộng đồng. Nếu bạn phát hiện lỗi hoặc có ý tưởng cải thiện, hãy mở Issues hoặc gửi Pull Request (PR) để cùng phát triển đồ án. Mọi ý kiến đóng góp đều được hoan nghênh!

## 🎉 Chúc bạn trải nghiệm tốt với dự án này! 🚀
