import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import Image from "next/image"

import { DetailHeader } from "@/components/detail/detail-header"
import { Badge } from "@/components/ui/badge"
import { Bookmark, MessageCircle, MessageCircleMore, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
export default function Detail() {
    return (
        <main>
            <DetailHeader />
            <section className="my-10 mx-10 w-80 text-base font-semibold">
                <Breadcrumb>
                    <BreadcrumbList className="text-black">
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-amber-500" href="/">Trang chủ</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-amber-500" href="/menu">Thực đơn</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold text-amber-500">Chi tiết món ăn</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>
            <section className="flex justify-center mx-auto">
                <div className="flex border p-5 gap-12 items-center justify-between mx-auto max-w-5xl rounded-md">
                    <Image src={"/images/square.jpg"} alt="..." width={320} height={320} className="rounded-md"></Image>
                    <div>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <div className="flex gap-52 items-center">
                                    <div className="flex gap-7 items-center">
                                        <h1 className="font-semibold text-4xl">Nem nướng</h1>
                                        <Badge variant="outline" className="rounded-md bg-amber-400">Món ăn</Badge>
                                    </div>
                                    <Bookmark size={32} />
                                </div>
                                <div className="space-x-24">
                                    <div className="inline-flex gap-2">
                                        <Star className="fill-amber-400 stroke-amber-400" />
                                        <span>4.9</span>
                                    </div>
                                    <div className="inline-flex gap-2">
                                        <MessageCircleMore className="stroke-red-500" />
                                        <span>50</span>
                                    </div>
                                </div>
                                <h1 className="font-bold text-4xl text-red-500">45.000 <span className="font-normal">đ</span></h1>
                            </div>
                            <div className="flex items-center gap-8">
                                <Button variant={"outline"}
                                    className="font-semibold border-amber-500 border-2 text-amber-500 
                                    hover:bg-amber-500 hover:bg-opacity-20 hover:text-amber-500 gap-2">
                                    <ShoppingCart /> <span>Thêm giỏ hàng</span>
                                </Button>
                                <Button
                                    className="font-semibold border-red-500 bg-red-500 border-2
                                    hover:bg-red-500 hover:shadow-md hover:text-white">Mua ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
