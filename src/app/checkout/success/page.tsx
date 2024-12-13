export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="mx-auto mb-4 h-16 w-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m8 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Thanh toán thành công!
        </h1>
        <p className="mb-6 text-gray-600">
          Cảm ơn bạn đã đặt đồ ăn. Hóa đơn và thông tin chi tiết sẽ được hiển
          thị trong phần thông tin đơn hàng.
        </p>
        <a
          href="/"
          className="inline-block rounded-lg bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600"
        >
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
}
