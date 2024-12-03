import { Suspense } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProductDetail from "@/components/detail/product-detail";
import { Rating } from "@/components/detail/rating";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Detail() {
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

            <Suspense fallback={<LoadingSpinner />}>
                <ProductDetail />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
                <Rating />
            </Suspense>
        </main>
    )
}

