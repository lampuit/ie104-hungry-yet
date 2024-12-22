import { BrainCircuit, Package, ShoppingBasket } from "lucide-react";

export function MobileBenefit() {
  return (
    <div className="align-center mt-8 flex w-screen flex-col items-center justify-center gap-8 bg-neutral-100 py-6 sm:hidden">
      <div className="flex h-56 w-64 flex-col items-center justify-around border-b-black text-center">
        <BrainCircuit
          size={96}
          className="rounded-full bg-orange-400 stroke-1 p-6"
        />
        <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
          AI chatbot
        </h2>
        <p className="max-w-64 text-center text-xs font-normal">
          Giải pháp tư vấn 24/7, hỗ trợ khách hàng nhanh chóng và chính xác mọi
          lúc mọi nơi!
        </p>
      </div>
      <div className="flex h-56 w-64 flex-col items-center justify-around text-center">
        <Package size={96} className="rounded-full bg-amber-300 stroke-1 p-6" />
        <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
          Giao hàng nhanh
        </h2>
        <p className="max-w-64 text-center text-xs font-normal">
          Thảnh thơi chọn món, giao hàng tận nơi đến từng ngõ ngách!
        </p>
      </div>
      <div className="flex h-56 w-64 flex-col items-center justify-around border-t-black text-center">
        <ShoppingBasket
          size={96}
          className="rounded-full bg-[#99BD76] stroke-1 p-6"
        />
        <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
          Ưu đãi hấp dẫn
        </h2>
        <p className="max-w-64 text-center text-xs font-normal">
          Khuyến mãi ngập tràn, giá siêu hời chỉ trong hôm nay!
        </p>
      </div>
    </div>
  );
}

export const Line = () => (
  <svg
    width="3"
    height="220"
    viewBox="0 0 3 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="1.5" x2="1.5" y2="220.002" stroke="#D5D5D5" strokeWidth="2" />
  </svg>
);
