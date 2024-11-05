import { HorizontalLine } from "./intro"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const categories = [
    { name: 'Khai vị', src: '/images/appetizers.jpg', alt: 'Appetizers Image' },
    { name: 'Món chính', src: '/images/main-dishes.jpg', alt: 'Main Dishes Image' },
    { name: 'Tráng miệng', src: '/images/desserts.jpg', alt: 'Deserts Image' },
    { name: 'Đồ uống', src: '/images/drinks.jpg', alt: 'Drinks Image' },
  ];

export function Menu() {
    return (
        <div className="mx-10 px-10 flex flex-col justify-center items-center gap-y-8 ">
            <div className="flex flex-row justify-between items-center w-full max-w-screen-2xl">
                <div className="flex flex-col justify-start gap-y-4">
                    <h2 className='italic font-semibold text-5xl'>Thực đơn</h2>
                    <HorizontalLine />
                </div>
                <Button asChild className="bg-black hover:bg-red-500 rounded-3xl">
                    <Link href={"/menu"}>Xem thực đơn</Link>
                </Button>
            </div>
            <div className="grid grid-cols-4 gap-x-6">
                {categories.map((category) => (
                    <div key={category.name} className="text-start">
                        <div className="overflow-hidden rounded-lg">
                            <Image
                                src={category.src}
                                alt={category.alt}
                                width={300}
                                height={200}
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <p className="mt-2 text-2xl font-semibold">{category.name}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}