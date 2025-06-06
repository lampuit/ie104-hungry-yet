"use client";
import { ChevronRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import LoadingSpinner from "../ui/loading-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { useState } from "react";
import { getRatingsByProductId } from "@/lib/data";

const ratingFetcher = async (id: string) => {
  return await getRatingsByProductId(id);
};

export const Rating = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const { data: ratingData, error: ratingError } = useSWR(`product-${id}`, () =>
    ratingFetcher(id),
  );
  const [starFilter, setStarFilter] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState<{
    [key: number]: boolean;
  }>({});

  if (ratingError) return <div>Error loading data.</div>;
  if (!ratingData) {
    return <LoadingSpinner />;
  }

  const averageRating =
    ratingData.length > 0
      ? ratingData.reduce(
          (acc: number, item: any) => acc + (item.star || 0),
          0,
        ) / ratingData.length
      : 0;

  const splitName = (name: string) => {
    const array = name.split(" ");
    return (
      (array[array.length - 2]?.at(0) || "").toUpperCase() +
      (array[array.length - 1]?.at(0) || "").toUpperCase()
    );
  };

  const handleStarFilterOnClick = (star: number) => {
    setStarFilter(star);
  };

  const handleFilter = (star: number, ratingData: any) => {
    if (star === 0) {
      return ratingData;
    } else {
      const filtered = ratingData.filter(
        (review: { star: number }) => review.star === star,
      );
      return filtered;
    }
  };
  const toggleExpandReview = (index: number) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="mx-5 space-y-10 px-5 sm:mx-10">
      <h1 className="text-xl font-semibold sm:text-2xl">Nhận xét & Đánh giá</h1>
      <div className="flex flex-col items-center justify-center gap-8 rounded-md bg-amber-400 bg-opacity-20 px-4 py-4 md:flex-row md:gap-12 md:px-20 md:py-16 lg:gap-20 xl:gap-32">
        <div className="space-y-2">
          <h1 className="text-5xl font-semibold text-red-500">
            {averageRating.toFixed(1)}
          </h1>
          <div className="flex gap-2">
            <Star
              className={`size-6 stroke-red-500 lg:size-8 ${averageRating < 0.5 ? "" : "fill-red-500"}`}
            />
            <Star
              className={`size-6 stroke-red-500 lg:size-8 ${averageRating < 1.5 ? "" : "fill-red-500"}`}
            />
            <Star
              className={`size-6 stroke-red-500 lg:size-8 ${averageRating < 2.5 ? "" : "fill-red-500"}`}
            />
            <Star
              className={`size-6 stroke-red-500 lg:size-8 ${averageRating < 3.5 ? "" : "fill-red-500"}`}
            />
            <Star
              className={`size-6 stroke-red-500 lg:size-8 ${averageRating < 4.5 ? "" : "fill-red-500"}`}
            />
          </div>
        </div>
        <div className="flex grow flex-wrap justify-center gap-8 lg:flex-nowrap">
          <Button
            className={`border-2 border-black bg-white text-black ${
              starFilter === 0
                ? "border-amber-500 text-amber-500 shadow hover:bg-white"
                : "hover:bg-amber-500 hover:bg-opacity-20"
            } h-10 w-20 text-xs md:text-sm`}
            onClick={() => handleStarFilterOnClick(0)}
          >
            Tất cả
          </Button>

          <Button
            className={`border-2 border-black bg-white text-black ${
              starFilter === 5
                ? "border-amber-500 text-amber-500 shadow hover:bg-white"
                : "hover:bg-amber-500 hover:bg-opacity-20"
            } h-10 w-20 text-xs md:text-sm`}
            onClick={() => handleStarFilterOnClick(5)}
          >
            5
            <Star className="size-2 fill-amber-400 stroke-amber-400 md:size-5" />
          </Button>

          <Button
            className={`border-2 border-black bg-white text-black ${
              starFilter === 4
                ? "border-amber-500 text-amber-500 shadow hover:bg-white"
                : "hover:bg-amber-500 hover:bg-opacity-20"
            } h-10 w-20 text-xs md:text-sm`}
            onClick={() => handleStarFilterOnClick(4)}
          >
            4
            <Star className="size-5 fill-amber-400 stroke-amber-400" />
          </Button>

          <Button
            className={`border-2 border-black bg-white text-black ${
              starFilter === 3
                ? "border-amber-500 text-amber-500 shadow hover:bg-white"
                : "hover:bg-amber-500 hover:bg-opacity-20"
            } h-10 w-20 text-xs md:text-sm`}
            onClick={() => handleStarFilterOnClick(3)}
          >
            3
            <Star className="size-5 fill-amber-400 stroke-amber-400" />
          </Button>

          <Button
            className={`border-2 border-black bg-white text-black ${
              starFilter === 2
                ? "border-amber-500 text-amber-500 shadow hover:bg-white"
                : "hover:bg-amber-500 hover:bg-opacity-20"
            } h-10 w-20 text-xs md:text-sm`}
            onClick={() => handleStarFilterOnClick(2)}
          >
            2
            <Star className="size-5 fill-amber-400 stroke-amber-400" />
          </Button>

          <Button
            className={`border-2 border-black bg-white text-black ${
              starFilter === 1
                ? "border-amber-500 text-amber-500 shadow hover:bg-white"
                : "hover:bg-amber-500 hover:bg-opacity-20"
            } h-10 w-20 text-xs md:text-sm`}
            onClick={() => handleStarFilterOnClick(1)}
          >
            1
            <Star className="size-5 fill-amber-400 stroke-amber-400" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl space-y-6">
          {handleFilter(starFilter, ratingData)?.map(
            (review: any, index: any) => (
              <div
                key={index}
                className="w-full space-y-6 border-b border-b-gray-400 px-2 py-3"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={review.user.imageUrl} />
                    <AvatarFallback>
                      {splitName(review.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 p-4">
                    <h6 className="font-semibold">
                      {!review.isAnonymous
                        ? review.user.name
                        : `${review.user.name.slice(0, 2)}***`}
                    </h6>
                    <div className="flex gap-2">
                      <Star className="size-5 fill-amber-400 stroke-amber-400" />
                      <Star
                        className={`size-5 fill-amber-400 stroke-amber-400 ${review.star < 2 ? "hidden" : ""}`}
                      />
                      <Star
                        className={`size-5 fill-amber-400 stroke-amber-400 ${review.star < 3 ? "hidden" : ""}`}
                      />
                      <Star
                        className={`size-5 fill-amber-400 stroke-amber-400 ${review.star < 4 ? "hidden" : ""}`}
                      />
                      <Star
                        className={`size-5 fill-amber-400 stroke-amber-400 ${review.star < 5 ? "hidden" : ""}`}
                      />
                    </div>
                  </div>
                </div>
                <p>{review.review}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex flex-wrap gap-4">
                    <Image
                      className="rounded-md object-cover"
                      src={review.product.imageUrl || "/images/square.jpg"}
                      alt="review"
                      width={100}
                      height={100}
                    />
                    {expandedReviews[index] && (
                      <>
                        <Image
                          className="rounded-md object-cover"
                          src="/images/square.jpg"
                          alt="additional review 1"
                          width={100}
                          height={100}
                        />
                        <Image
                          className="rounded-md object-cover"
                          src="/images/intro-dish-2.jpg"
                          alt="additional review 2"
                          width={100}
                          height={100}
                        />
                        <Image
                          className="rounded-md object-cover"
                          src="/images/long2.jpg"
                          alt="additional review 3"
                          width={100}
                          height={100}
                        />
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      className="hover:bg-amber-400 hover:bg-opacity-20"
                      variant={"ghost"}
                      onClick={() => toggleExpandReview(index)}
                    >
                      {expandedReviews[index] ? "Ẩn bớt" : "Xem thêm"}
                    </Button>
                    <ChevronRight
                      className={expandedReviews[index] ? "rotate-90" : ""}
                    />
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
