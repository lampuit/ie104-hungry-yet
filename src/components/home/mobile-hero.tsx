import { Charm } from "next/font/google";
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

const img = { name: 'banhmi', src: '/images/food/banhmi.jpg', alt: 'Banh Mi Viet Nam' }

const charm = Charm({
    subsets: ["vietnamese"],
    weight: ["400", "700"],
});


export const MobileHero = () => {
    return (
        <header className="flex flex-col items-center justify-center relative sm:hidden w-full h-[500px] py-8 space-y-8 text-white bg-black">
            <Image
                src={img.src}
                alt={img.name}
                layout="fill"
                objectFit="cover"
                className="absolute opacity-40"
            >
            </Image>
            <h1 className={`${charm.className} text-7xl md:text-8xl text-center z-10`}>Hungry Yet?</h1>
            <p className="text-xl md:text-2xl text-center z-10">Chọn hương vị, nhận yêu thương - chỉ từ một cú CLICK!</p>
            <div className="flex justify-around min-w-36 gap-x-3 z-10">
                <Button asChild className="bg-amber-500 rounded-3xl hover:bg-red-500">
                    <Link href={"/menu/cart"}>Đặt hàng ngay</Link>
                </Button>
            </div>
        </header>
    )
}