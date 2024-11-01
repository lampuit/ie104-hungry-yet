
export function Benefit() {
    return (
        <div className="flex flex-row justify-center align-center gap-16">
            <div className="flex flex-col justify-around items-center text-center h-56 lg:w-60 md:w-36 sm:w-24">
                <Circle1 />
                <h2 className="font-semibold text-2xl">AI chatbot</h2>
                <p className="font-normal text-xs text-center max-w-64">Giải pháp tư vấn 24/7, hỗ trợ khách hàng nhanh chóng và chính xác mọi lúc mọi nơi!</p>
            </div>
            <Line />
            <div className="flex flex-col justify-around items-center text-center h-56 lg:w-60 md:w-36 sm:w-24">
                <Circle2 />
                <h2 className="font-semibold text-2xl">Giao hàng nhanh</h2>
                <p className="font-normal text-xs text-center max-w-64">Thảnh thơi chọn món, giao hàng tận nơi đến từng ngõ ngách!</p>
            </div>
            <Line />
            <div className="flex flex-col justify-around items-center text-center h-56 lg:w-60 md:w-36 sm:w-24">
                <Circle3 />
                <h2 className="font-semibold text-2xl">Ưu đãi hấp dẫn</h2>
                <p className="font-normal text-xs text-center max-w-64">Khuyến mãi ngập tràn, giá siêu hời chỉ trong hôm nay!</p>
            </div>
        </div>
    )
}

export const Circle1 = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50.0011" r="50" fill="#E3793F" />
    </svg>
)

export const Circle2 = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50.0011" r="50" fill="#F1C964" />
    </svg>
)

export const Circle3 = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50.0011" r="50" fill="#99BD76" />
    </svg>
)

export const Line = () => (
    <svg width="3" height="220" viewBox="0 0 3 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1.5" x2="1.5" y2="220.002" stroke="#D5D5D5" stroke-width="2" />
    </svg>
)
