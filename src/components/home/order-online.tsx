import { Button } from "@/components/ui/button"
import Image from "next/image"

export function OrderOnline() {
    return (
        <div className="relative flex flex-col justify-center items-center py-16 bg-black">
            <div className="absolute inset-0 w-full h-full opacity-40">
                <Image
                    src={"/images/small-bg.jpg"}
                    alt={"small-bg"}
                    layout="fill"
                    objectFit="cover">
                </Image>
            </div>
            <div className="hidden lg:block">
                <div className="flex flex-col justify-between items-center gap-4 w-60 py-4 px-4 bg-white rounded-3xl text-center z-10">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className='italic text-3xl text-black'>Order Online</h2>
                        <ShortHorizontalLine />
                    </div>
                    <p className="px-4">Bạn muốn hương vị tươi mới? Đặt ngay để thưởng thức ẩm thực Việt Nam tại nhà - giao tận nơi, ngon tuyệt vời!</p>
                    <div>
                        <Button asChild className="bg-amber-500 hover:bg-red-500 rounded-3xl">
                            <a href={"/menu"}>Đặt ngay</a>
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export const ShortHorizontalLine = () => (
    <svg width="124" height="2" viewBox="0 0 124 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 1C0.5 0.447715 0.947715 0 1.5 0H122.5C123.052 0 123.5 0.447715 123.5 1C123.5 1.55228 123.052 2 122.5 2H1.5C0.947714 2 0.5 1.55228 0.5 1Z" fill="#99BD76" />
    </svg>
)