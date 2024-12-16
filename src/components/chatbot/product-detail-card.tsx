import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
}: {
  id: string;
  name: string;
  price: number;
  averageRating: number;
  description: string;
  imageUrl: string;
  append: any;
}) {
  return (
    <Card className="relative w-full max-w-md overflow-hidden">
      <Link className="z-30" href={`/detail?id=${id}`} passHref legacyBehavior>
        <a target="_blank">
          <Image
            src={imageUrl}
            alt={name}
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
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
