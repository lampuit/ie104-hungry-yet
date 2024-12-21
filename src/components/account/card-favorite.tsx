"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Eye, ShoppingCart, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LoadingSpinner from "../ui/loading-spinner";
import { createCart } from "@/lib/actions/cart";
import { useRouter } from "next/navigation";
import { deleteFavorite } from "@/lib/actions/favorite";
import { getSession } from "@/lib/auth-client";
import useSWR from "swr";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { Card, CardContent } from "@/components/ui/card";

//get userId from session
const fetcherUserId = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return userId;
};

function DongFormat(number: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

export function AccountFavorite({
  listFavorite,
  isLoading,
  mutate,
}: {
  listFavorite: any;
  isLoading: boolean;
  mutate: any;
}) {
  const { data: userId } = useSWR("userId", fetcherUserId);
  const router = useRouter();
  const { toast } = useToast();

  const convertToVND = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleDeleteFavorite = async (userId: string, productId: string) => {
    try {
      await deleteFavorite(userId, productId);
      toast({
        title: "Xoá yêu thích thành công!",
        description: "Sản phẩm đã được xoá khỏi danh mục yêu thích của bạn.",
      });
      // router.push("/account/favorite");
      mutate();
    } catch (error) {
      console.error("Error deleting favorite:", error);
      toast({
        variant: "destructive",
        title: "Xoá yêu thích thất bại!",
        description:
          "Uh oh, có lỗi xảy ra khi xoá sản phẩm khỏi danh mục yêu thích của bạn.",
      });
    }
  };
  return listFavorite?.map((item: any) =>
    isLoading ? (
      <LoadingSpinner key={item.id} />
    ) : (
      <Card key={item.products.id} className="overflow-hidden">
        <CardContent className="p-3">
          <div className="relative mb-3 aspect-square">
            <Image
              src={item.products.imageUrl}
              alt={item.products.name}
              sizes="100%"
              priority
              fill
              className="rounded-md object-cover"
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute right-2 top-2 bg-white/80 text-xs hover:bg-white"
              onClick={() =>
                handleDeleteFavorite(item?.userId, item?.productId)
              }
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="truncate font-semibold">{item.products.name}</h2>
          <p className="text-sm text-orange-500">
            {item.products.category.name}
          </p>
          <p className="mb-3 mt-1 font-semibold">
            Giá: {DongFormat(item.products.price)}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                console.log("Xem chi tiết");
                router.push(`/detail?id=${item?.productId}`);
              }}
            >
              <Eye className="mr-1 h-4 w-4" />
              Chi tiết
            </Button>
            <Button
              size="sm"
              className="w-full bg-amber-500 hover:bg-amber-500/90"
              onClick={async () => {
                try {
                  const data = new FormData();
                  if (userId) {
                    data.append("userId", userId);
                  }
                  data.append("productId", item?.productId);
                  data.append("quantity", "1");
                  await createCart(data);
                  toast({
                    title: "Thêm vào giỏ hàng thành công!",
                    description: "Sản phẩm đã duoc thêm vào giỏ hàng của bạn.",
                    action: (
                      <ToastAction
                        altText="Xem giỏ hàng"
                        onClick={() => router.push("/menu/cart")}
                      >
                        Xem
                      </ToastAction>
                    ),
                  });
                } catch (error) {
                  console.error(error);
                  toast({
                    variant: "destructive",
                    title: "Thêm vào giỏ hàng thất bại!",
                    description:
                      "Uh oh, có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng của bạn.",
                  });
                }
              }}
            >
              <ShoppingCart className="mr-1 h-4 w-4" />
              Thêm
            </Button>
          </div>
        </CardContent>
      </Card>
      // <div
      //   key={item.id}
      //   className="relative rounded border-b-2 bg-white p-4 shadow-md"
      // >
      //   <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-7">
      //     <div className="relative h-[180px] w-full max-w-[360px] sm:w-[120px]">
      //       <Image
      //         className="rounded"
      //         src={item?.products.imageUrl}
      //         alt="review"
      //         fill
      //         sizes="100%"
      //         priority
      //         style={{ objectFit: "cover" }}
      //       />
      //     </div>

      //     {/* Nội dung */}
      //     <div className="flex flex-1 flex-col gap-4 sm:gap-6">
      //       {/* Thông tin món ăn */}
      //       <div className="flex flex-col gap-2">
      //         <div className="flex flex-col">
      //           <div className="flex justify-between">
      //             <p className="text-lg font-semibold">
      //               {item?.products?.name}
      //             </p>
      //           </div>
      //           <p className="text-amber-500">{item.products.category.name}</p>
      //         </div>
      //         <p className="flex items-center gap-2 text-lg">
      //           Giá:{" "}
      //           <span className="text-2xl font-semibold text-red-500">
      //             {convertToVND(item?.products.price) || "0"}
      //           </span>
      //         </p>
      //       </div>

      //       {/* Nút hành động */}
      //       <div className="flex items-center justify-between gap-2 sm:justify-end sm:gap-4">
      //         <Button
      //           onClick={() => {
      //             console.log("Xem chi tiết");
      //             router.push(`/detail?id=${item?.productId}`);
      //           }}
      //           variant={"outline"}
      //           className="flex-grow text-xs sm:flex-grow-0"
      //         >
      //           <Eye />
      //           <span className="hidden sm:inline">Xem chi tiết</span>
      //         </Button>
      //         <Button
      //           className="flex-grow bg-amber-500 text-xs sm:flex-grow-0"
      //           onClick={async () => {
      //             try {
      //               const data = new FormData();
      //               if (userId) {
      //                 data.append("userId", userId);
      //               }
      //               data.append("productId", item?.productId);
      //               data.append("quantity", "1");
      //               await createCart(data);
      //               toast({
      //                 title: "Thêm vào giỏ hàng thành công!",
      //                 description:
      //                   "Sản phẩm đã duoc thêm vào giỏ hàng của bạn.",
      //                 action: (
      //                   <ToastAction
      //                     altText="Xem giỏ hàng"
      //                     onClick={() => router.push("/menu/cart")}
      //                   >
      //                     Xem
      //                   </ToastAction>
      //                 ),
      //               });
      //             } catch (error) {
      //               console.error(error);
      //               toast({
      //                 variant: "destructive",
      //                 title: "Thêm vào giỏ hàng thất bại!",
      //                 description:
      //                   "Uh oh, có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng của bạn.",
      //               });
      //             }
      //           }}
      //         >
      //           <ShoppingCart /> Thêm giỏ hàng
      //         </Button>
      //       </div>
      //     </div>
      //   </div>
      //   {/* Nút xóa yêu thích */}
      //   <div className="absolute right-1 top-1">
      //     <TooltipProvider delayDuration={200} skipDelayDuration={500}>
      //       <Tooltip>
      //         <TooltipTrigger asChild>
      //           <Button
      //             variant="ghost"
      //             size="icon"
      //             className="h-6 w-6 bg-gray-200 text-white hover:bg-red-500 hover:text-white"
      //             onClick={() =>
      //               handleDeleteFavorite(item?.userId, item?.productId)
      //             }
      //           >
      //             <X className="h-4 w-4" />
      //           </Button>
      //         </TooltipTrigger>
      //         <TooltipContent>
      //           <p>Bỏ yêu thích</p>
      //         </TooltipContent>
      //       </Tooltip>
      //     </TooltipProvider>
      //   </div>
      // </div>
    ),
  );
}
