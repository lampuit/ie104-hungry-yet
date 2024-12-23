"use client";

import { Heart, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { createFavorite, deleteFavorite } from "@/lib/actions/favorite";
import { useState } from "react";

function DongFormat(number: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

export default function ProductDetailCard({
  id,
  name,
  price,
  averageRating,
  description,
  imageUrl,
  append,
  userId,
  favorite,
}: {
  id: string;
  name: string;
  price: number;
  averageRating: number;
  description: string;
  imageUrl: string;
  append: any;
  userId: string;
  favorite: any[];
}) {
  const { toast } = useToast();

  const filterFavorite = favorite.filter((item) => id === item.productId);

  const [isFavorite, setIsFavorite] = useState<boolean>(
    !!filterFavorite.length,
  );
  const [isPending, setIsPending] = useState(false);

  const handleFavoriteOnClick = async () => {
    if (!isFavorite) {
      console.log(userId);
      console.log(favorite);
      const formData = new FormData();
      formData.append("userId", userId || "");
      formData.append("productId", id);
      try {
        setIsPending(true);
        await createFavorite(formData);
        toast({
          description: `Đã thêm ${name.toLowerCase()} vào mục yêu thích`,
        });
        setIsFavorite(true);
        setIsPending(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: `KHÔNG thể thêm ${name.toUpperCase()}.`,
          description: "Có lỗi gì đó đã xảy ra",
        });
      }
    } else {
      try {
        setIsPending(true);
        await deleteFavorite(userId || "", id);
        toast({
          description: `Đã xóa ${name.toLowerCase()} khỏi mục yêu thích`,
        });
        setIsFavorite(false);
        setIsPending(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: `KHÔNG thể xóa ${name.toUpperCase()}.`,
          description: "Có lỗi gì đó đã xảy ra",
        });
      }
    }
  };

  return (
    <Card className="relative w-full max-w-md overflow-hidden">
      <Image
        src={imageUrl}
        alt={name}
        width={500}
        height={500}
        className="h-full w-full object-cover"
      />{" "}
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-2 top-2 bg-white/80 text-xs hover:bg-white"
        onClick={handleFavoriteOnClick}
        disabled={isPending}
      >
        <Heart
          className={`stroke-amber-500 ${isFavorite ? "fill-amber-500" : ""}`}
        />
      </Button>
      <Link href={`/detail?id=${id}`} passHref legacyBehavior>
        <a target="_blank">
          <CardContent className="p-4">
            <div className="mb-2 flex items-start justify-between">
              <h2 className="line-clamp-2 text-xl font-semibold">{name}</h2>
              <Badge className="bg bg-green-700 text-lg font-bold">
                {DongFormat(price)}
              </Badge>
            </div>
            <div className="mb-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <p className="line-clamp-3 text-gray-600">{description}</p>
          </CardContent>
        </a>
      </Link>
      <CardFooter className="p-4">
        <Button
          onClick={() =>
            append({
              role: "assistant",
              content: `Người dùng gọi món ${id}`,
              appear: false,
            })
          }
          className="z-40 w-full"
        >
          Thêm Giỏ Hàng
        </Button>
      </CardFooter>
    </Card>
  );
}
