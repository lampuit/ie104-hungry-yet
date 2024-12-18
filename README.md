## 🌟 Dự án "Hungry Yet?" : Website đặt đồ ăn trực tuyến
Dự án "Hungry Yet?" là một ứng dụng web hiện đại cho phép người dùng đặt đồ ăn trực tuyến với các tính năng tối ưu, giao diện đẹp mắt và trải nghiệm mượt mà. Dự án sử dụng các công nghệ mới nhất trong ngành phát triển web nhằm mang lại hiệu năng và khả năng mở rộng tốt.

## 🚀 Tính Năng Chính
- Quản lý món ăn, đơn hàng, khuyến mãi, ca làm của nhân viên, thống kê báo cáo của cửa hàng.
- Tích hợp với cổng thanh toán của ví điện tử MoMo.
- Đặt đô ăn nhanh chóng với giao diện dễ sử dụng, đáp ứng đầy đủ chức năng của một website bán hàng trực tuyến.
- Chatbot AI hỗ trợ người dùng tìm kiếm món ăn, gợi ý món ăn, đặt hàng, thanh toán và kiểm tra hóa đơn một cách nhanh chóng.
## 🛠️ Công Nghệ Sử Dụng
- Next.js: Framework React tối ưu hiệu năng và SEO.
- Tailwind CSS: Framework CSS tiện lợi cho việc xây dựng giao diện.
- Drizzle ORM: Quản lý cơ sở dữ liệu đơn giản và mạnh mẽ.
- PNPM: Trình quản lý package tối ưu tốc độ cài đặt.
- Prettier & ESLint: Công cụ định dạng và kiểm tra code.
- Better Auth: Quản lý xác thực bảo mật cho ứng dụng.
- Vercel Blob: Dịch vụ lưu trữ file và hình ảnh từ Vercel.
- Neon PostgreSQL: Dịch vụ PostgreSQL trên cloud hiệu suất cao.
- Vercel AI SDK: Xây dựng tính năng AI chatbot.
- Shadcn: Tạo giao diện UI đơn giản và hiện đại.
- Momo Payment API
- Motion: Thư viện tạo hiệu ứng animation.

## 📂 Cấu Trúc Thư Mục
```plaintext
.
├── public/              # Thư mục chứa hình ảnh và các tài nguyên tĩnh
├── src/                 # Mã nguồn chính của dự án
|   ├── app/             # Các trang của ứng dụng
│   ├── components/      # Các thành phần React
│   ├── lib/             # Các thư viện và hàm tiện ích
│   ├── drizzle/         # Các thư viện và hàm tiện ích
|   ├── hooks/           # Các thư mục và file khác
│   ├── lib/             # Các file CSS và Tailwind
│   └── styles/          # Các thư mục và file khác
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
1. Clone Repository
   ```plaintext
   git clone <link-repository>
   cd <tên-thư-mục>
2. Cài Đặt Package
    ```plaintext
   pnpm install
3. Tạo File .env.local
   Sao chép cấu trúc .env.local và chỉnh sửa thông tin:
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

4. Chạy Dự Án
   Khởi chạy dự án trên localhost:
   ```plaintext
   pnpm dev
  Ứng dụng sẽ chạy tại: [http://localhost:3000](http://localhost:3000)

## 🧩 Phát Triển và Build
- Build Production
   ```plaintext
   pnpm build
- Kiểm Tra Lỗi Code
   ```plaintext
   pnpm lint
- Format Code
   ```plaintext
   pnpm format

## 💡 Góp Ý và Phát Triển
Mọi ý kiến đóng góp hoặc vấn đề gặp phải, vui lòng mở Issues hoặc gửi Pull Request (PR) để cùng phát triển dự án.
Chúng tôi luôn hoan nghênh các ý tưởng mới và cải tiến từ cộng đồng.

##🎉 Chúc bạn trải nghiệm tốt với dự án này! 🚀

