export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-16 h-16 mx-auto mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m8 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã đặt đồ ăn. Hóa đơn và thông tin chi tiết sẽ được hiển thị trong phần thông tin đơn hàng.
        </p>
        <a
          href="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
}
