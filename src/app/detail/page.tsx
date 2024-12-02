"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DetailReview } from "@/components/detail/review"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation";
import { ProductDetail } from "@/components/detail/detail";



export default function Detail() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "";
    const userId = sessionStorage.getItem("userId") || "";

    return (
        <main>
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

            <ProductDetail />

            <section className="space-y-10 mx-10 px-5">
                <h1 className="font-semibold text-2xl">Nhận xét & Đánh giá</h1>
                <div className="flex gap-32 justify-center items-center bg-amber-400 bg-opacity-20 rounded-md px-20 py-16">
                    <div className="gap-4">
                        <h1 className="font-semibold text-5xl text-red-500">4.9</h1>
                        <div className="flex gap-2"><Star className="fill-red-500 stroke-red-500 size-8" />
                            <Star className="fill-red-500 stroke-red-500 size-8" />
                            <Star className="fill-red-500 stroke-red-500 size-8" />
                            <Star className="fill-red-500 stroke-red-500 size-8" />
                            <Star className="fill-red-500 stroke-red-500 size-8" /></div>
                    </div>
                    <div className="flex gap-8">
                        <Button className="bg-white text-black border-2 border-black hover:bg-amber-500 hover:bg-opacity-20">Tất cả</Button>
                        <Button className="bg-white text-black border-2 border-black
                         hover:bg-amber-500 hover:bg-opacity-20">5  <Star className="fill-amber-400 stroke-amber-400 size-5" /></Button>
                        <Button className="bg-white text-black border-2 border-black
                         hover:bg-amber-500 hover:bg-opacity-20">4  <Star className="fill-amber-400 stroke-amber-400 size-5" /></Button>
                        <Button className="bg-white text-black border-2 border-black
                         hover:bg-amber-500 hover:bg-opacity-20">3  <Star className="fill-amber-400 stroke-amber-400 size-5" /></Button>
                        <Button className="bg-white text-black border-2 border-black
                         hover:bg-amber-500 hover:bg-opacity-20">2  <Star className="fill-amber-400 stroke-amber-400 size-5" /></Button>
                        <Button className="bg-white text-black border-2 border-black
                         hover:bg-amber-500 hover:bg-opacity-20">1  <Star className="fill-amber-400 stroke-amber-400 size-5" /></Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="max-w-5xl space-y-6">
                        <DetailReview />
                        <DetailReview />
                        <DetailReview />
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">2</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </section>
        </main>
    )
}

