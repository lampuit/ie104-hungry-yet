import { BrainCircuit, Package, ShoppingBasket } from "lucide-react"

export function MobileBenefit() {
    return (
        <div className="flex flex-col sm:hidden justify-center items-center w-screen align-center bg-neutral-100 mt-8 gap-8 py-6">
            <div className="flex flex-col justify-around items-center text-center h-56 w-64 border-b-black">
                <BrainCircuit size={96} className="bg-orange-400 rounded-full p-6 stroke-1"/>
                <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">AI chatbot</h2>
                <p className="font-normal text-xs text-center max-w-64">Giải pháp tư vấn 24/7, hỗ trợ khách hàng nhanh chóng và chính xác mọi lúc mọi nơi!</p>
            </div>
            <div className="flex flex-col justify-around items-center text-center h-56 w-64 ">
                <Package size={96} className="bg-amber-300 rounded-full p-6 stroke-1"/>
                <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">Giao hàng nhanh</h2>
                <p className="font-normal text-xs text-center max-w-64">Thảnh thơi chọn món, giao hàng tận nơi đến từng ngõ ngách!</p>
            </div>
            <div className="flex flex-col justify-around items-center text-center h-56 w-64 border-t-black">
                <ShoppingBasket size={96} className="bg-[#99BD76] rounded-full p-6 stroke-1"/>
                <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">Ưu đãi hấp dẫn</h2>
                <p className="font-normal text-xs text-center max-w-64">Khuyến mãi ngập tràn, giá siêu hời chỉ trong hôm nay!</p>
            </div>
        </div>
    )
}

export const Line = () => (
    <svg width="3" height="220" viewBox="0 0 3 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1.5" x2="1.5" y2="220.002" stroke="#D5D5D5" strokeWidth="2" />
    </svg>
)
