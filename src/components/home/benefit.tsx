
export function Benefit() {
    return (
        <div className="flex flex-row justify-center w-screen align-center gap-8 bg-neutral-100 py-6">
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
        <circle cx="50" cy="50" r="50" fill="#E3793F" />
        <path d="M41.1666 53.3325C38.4052 53.3325 36.1666 55.5711 36.1666 58.3325C36.1666 61.0939 38.4052 63.3325 41.1666 63.3325C41.751 63.3325 42.312 63.2323 42.8333 63.048" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M36.6062 56.0067C34.3735 54.9293 32.8331 52.644 32.8331 49.999C32.8331 47.9795 33.731 46.1698 35.1493 44.9473" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M35.2005 44.8129C34.7578 44.151 34.4997 43.3552 34.4997 42.4992C34.4997 40.198 36.3652 38.3325 38.6663 38.3325C39.6045 38.3325 40.4703 38.6426 41.1667 39.1659" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M41.5628 39.2747C41.3087 38.7361 41.1667 38.1342 41.1667 37.4992C41.1667 35.198 43.0321 33.3325 45.3333 33.3325C47.6345 33.3325 49.5 35.198 49.5 37.4992V63.3325" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M42.8333 63.3325C42.8333 65.1735 44.3257 66.6659 46.1667 66.6659C48.0076 66.6659 49.5 65.1735 49.5 63.3325" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M49.5 41.6655C49.5 44.427 51.7386 46.6655 54.5 46.6655" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M63.8489 44.9473C65.2672 46.1698 66.1651 47.9795 66.1651 49.999C66.1651 51.1708 65.8628 52.272 65.3318 53.2289" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M63.7992 44.8129C64.2419 44.151 64.5001 43.3552 64.5001 42.4992C64.5001 40.198 62.6346 38.3325 60.3334 38.3325C59.3952 38.3325 58.5295 38.6426 57.833 39.1659" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M49.5 37.4992C49.5 35.198 51.3655 33.3325 53.6667 33.3325C55.9679 33.3325 57.8333 35.198 57.8333 37.4992C57.8333 38.1342 57.6913 38.7361 57.4372 39.2747" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M52.8333 66.6659C50.9924 66.6659 49.5 65.1735 49.5 63.3325" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M63.6667 64.1655L66.1667 66.6655" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M56.1667 60.8322C56.1667 63.1334 58.0322 64.9989 60.3334 64.9989C61.486 64.9989 62.5293 64.5309 63.2836 63.7746C64.0353 63.0208 64.5001 61.9808 64.5001 60.8322C64.5001 58.531 62.6346 56.6655 60.3334 56.6655C58.0322 56.6655 56.1667 58.531 56.1667 60.8322Z" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

)

export const Circle2 = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="#F1C964" />
        <path d="M34.5 40.8325L49.5 47.4992M64.5 40.8325L49.5 47.4992M49.5 65.8325V47.4992" stroke="#131927" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M34.5 58.7756V41.2221C34.5 40.985 34.6396 40.7701 34.8563 40.6738L49.2563 34.2738C49.4115 34.2049 49.5885 34.2049 49.7437 34.2738L64.1437 40.6738C64.3604 40.7701 64.5 40.985 64.5 41.2221V58.7756C64.5 59.0127 64.3604 59.2276 64.1437 59.3239L49.7437 65.7239C49.5885 65.7928 49.4115 65.7928 49.2563 65.7239L34.8563 59.3239C34.6396 59.2276 34.5 59.0127 34.5 58.7756Z" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M42 37.499L56.6437 44.0073C56.8604 44.1036 57 44.3185 57 44.5556V50.8324" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

)

export const Circle3 = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="#99BD76" />
        <path d="M62 66.6655C63.3807 66.6655 64.5 65.5462 64.5 64.1655C64.5 62.7848 63.3807 61.6655 62 61.6655C60.6193 61.6655 59.5 62.7848 59.5 64.1655C59.5 65.5462 60.6193 66.6655 62 66.6655Z" fill="#131927" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M45.3333 66.6655C46.714 66.6655 47.8333 65.5462 47.8333 64.1655C47.8333 62.7848 46.714 61.6655 45.3333 61.6655C43.9525 61.6655 42.8333 62.7848 42.8333 64.1655C42.8333 65.5462 43.9525 66.6655 45.3333 66.6655Z" fill="#131927" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M37.8333 36.6659H66.1666L62.8333 54.9992H41.1666L37.8333 36.6659ZM37.8333 36.6659C37.5555 35.5547 36.1666 33.3325 32.8333 33.3325" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M62.8334 54.999H41.1667H38.218C35.2442 54.999 33.6667 56.3011 33.6667 58.3324C33.6667 60.3636 35.2442 61.6657 38.218 61.6657H62.0001" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

export const Line = () => (
    <svg width="3" height="220" viewBox="0 0 3 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1.5" x2="1.5" y2="220.002" stroke="#D5D5D5" strokeWidth="2" />
    </svg>
)
