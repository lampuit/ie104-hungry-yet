## 🌟 Đồ án môn học "Hungry Yet?" : Website đặt đồ ăn trực tuyến

Đồ án "Hungry Yet?" là một ứng dụng web hiện đại cho phép người dùng đặt đồ ăn trực tuyến với các tính năng tối ưu, giao diện đẹp mắt và trải nghiệm mượt mà. Đồ án sử dụng các công nghệ tiên tiến trong ngành phát triển web nhằm mang lại hiệu năng và khả năng mở rộng tốt. Cùng với sự hỗ trợ của thầy Khoa chúng em đã có được kết quả như này, cảm ơn thầy nhiều 🤟

## Lớp: IE104.P11

**GVHD**: ThS. Võ Tấn Khoa  
**Nhóm sinh viên thực hiện**:

1. **Phạm Thành Lam** - MSSV: 22520743
2. **Trần Ngô Thanh Bình** - MSSV: 22520138
3. **Đỗ Thanh Liêm** - MSSV: 22520751
4. **Trần Minh Tùng** - MSSV: 22521622
5. **Ngô Tuấn Kiệt** - MSSV: 22520719

## 🚀 Tính Năng Chính

- **Quản lý món ăn, đơn hàng và khuyến mãi**: Hỗ trợ quản lý danh sách món ăn, theo dõi đơn hàng, cập nhật khuyến mãi.
- **Quản lý ca làm việc và nhân viên**: Phân bổ ca làm và quản lý thông tin nhân viên hiệu quả.
- **Thống kê vàÁn

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

Chúng tôi luôn chào đón các đóng góp từ lớp học và cộng đồng. Nếu bạn phát hiện lỗi hoặc có ý tưởng cải thiện, hãy mở Issues hoặc gửi Pull Request (PR) để cùng phát triển đồ án. Mọi ý kiến đóng góp đều được hoan nghênh!

## 🎉 Chúc bạn trải nghiệm tốt với dự án này! 🚀
