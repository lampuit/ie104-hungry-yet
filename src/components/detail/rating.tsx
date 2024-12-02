import { ChevronRight, Star } from "lucide-react"
import { Button } from "../ui/button"
import { ratingFetcher } from "./detail"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import LoadingSpinner from "../ui/loading-spinner"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Image from "next/image"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"

export const Rating = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "";
    const { data: ratingData, error: ratingError } = useSWR(`product-${id}`, () => ratingFetcher(id));

    if (ratingError) return <div>Error loading data.</div>;
    if (!ratingData) {
        return <LoadingSpinner />;
    }

    const averageRating = ratingData.reduce((acc: number, item: any) => acc + item.star, 0) / ratingData.length;

    const splitName = (name: string) => {
        const array = name.split(" ");
        return (array[array.length - 2]?.at(0) || '').toUpperCase() + (array[array.length - 1]?.at(0) || '').toUpperCase();
    }

    const handleStarFilterOnClick = (star: number) => {

    }

    return (
        <section className="space-y-10 mx-10 px-5">
            <h1 className="font-semibold text-2xl">Nhận xét & Đánh giá</h1>
            <div className="flex gap-32 justify-center items-center bg-amber-400 bg-opacity-20 rounded-md px-20 py-16">
                <div className="gap-4">
                    <h1 className="font-semibold text-5xl text-red-500">{averageRating.toFixed(1)}</h1>
                    <div className="flex gap-2">
                        <Star className={`fill-red-500 stroke-red-500 size-8 ${averageRating < 0.5 ? "hidden" : ""}`} />
                        <Star className={`fill-red-500 stroke-red-500 size-8 ${averageRating < 1.5 ? "hidden" : ""}`} />
                        <Star className={`fill-red-500 stroke-red-500 size-8 ${averageRating < 2.5 ? "hidden" : ""}`} />
                        <Star className={`fill-red-500 stroke-red-500 size-8 ${averageRating < 3.5 ? "hidden" : ""}`} />
                        <Star className={`fill-red-500 stroke-red-500 size-8 ${averageRating < 4.5 ? "hidden" : ""}`} />
                    </div>
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
                <div className="w-full max-w-5xl space-y-6">
                    {ratingData?.map((review: any, index: any) => (
                        <div className="space-y-6 px-2 py-3 border-b border-b-gray-400 w-full">
                            <div className="flex gap-2 items-center">
                                <Avatar className="w-14 h-14">
                                    <AvatarImage src={review.user.imageUrl} />
                                    <AvatarFallback>{splitName(review.user.name)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2 p-4">
                                    <h6 className="font-semibold">{review.user.name}</h6>
                                    <div className="flex gap-2">
                                        <Star className="fill-amber-400 stroke-amber-400 size-5" />
                                        <Star className={`fill-amber-400 stroke-amber-400 size-5 ${review.star < 2 ? "hidden" : ""}`} />
                                        <Star className={`fill-amber-400 stroke-amber-400 size-5 ${review.star < 3 ? "hidden" : ""}`} />
                                        <Star className={`fill-amber-400 stroke-amber-400 size-5 ${review.star < 4 ? "hidden" : ""}`} />
                                        <Star className={`fill-amber-400 stroke-amber-400 size-5 ${review.star < 5 ? "hidden" : ""}`} />
                                    </div>
                                </div>
                            </div>
                            <p>{review.review}</p>
                            <div className="flex items-center gap-4">
                                <Image className="rounded-md" src={review.imageUrl || "/images/square.jpg"} alt="review" width={100} height={100}></Image>
                                <div className="flex items-center gap-1">
                                    <Button className="hover:bg-amber-400 hover:bg-opacity-20" variant={"ghost"}>Xem thêm</Button>
                                    <ChevronRight />
                                </div>
                            </div>
                        </div>
                    ))}
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
    )
}