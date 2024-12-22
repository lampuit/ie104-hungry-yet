export default function DashboardPrompt() {
  return (
    <div className="flex h-[4/5] w-4/5 items-center justify-center">
      <div className="relative mx-auto max-w-md rounded border border-red-400 bg-red-100 px-4 py-3 text-center text-red-700">
        <strong className="font-bold">Thông báo: </strong>
        <span className="block sm:inline">
          Vui lòng đăng nhập để truy cập trang này !!!
        </span>
      </div>
    </div>
  );
}
