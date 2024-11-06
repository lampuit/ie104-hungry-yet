"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { init } from "next/dist/compiled/webpack/webpack";
import { getShoppingCartByUserId } from "@/lib/data";
import { getSession } from "@/lib/auth-client";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/loading-spinner";

// Fetch function dùng cho SWR
const fetcher = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return getShoppingCartByUserId(userId);
};

export function ProductList() {
  const { data, error } = useSWR("shoppingCartData", fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [dishes, setDishes] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const formattedData = data.map((item: any) => ({
        id: item.cartId || undefined,
        img: item.image || "/images/fallback.jpg",
        name: item.name,
        des: item.description || "",
        cost: item.price,
        amount: item.quantity,
        isFavorite: item.isFavorite || false,
      }));
      setDishes(formattedData);
    }
  }, [data]);

  if (error) return <div>Error loading data.</div>;
  if (!data) {
    return <LoadingSpinner />;
  }

  // Function handle when favorite btn is clicked
  const handleFavoriteClick = (id: number) => {
    setDishes(
      dishes.map((dish) =>
        dish.id === id ? { ...dish, favorited: !dish.favorited } : dish,
      ),
    );
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-2 flex max-w-6xl flex-row items-center justify-start">
        <div className="w-96 text-center">Giỏ hàng</div>
        <div className="w-36 text-center">Giá tiền</div>
        <div className="w-40 text-center">Số lượng</div>
        <div className="w-36 text-center">Thành tiền</div>
        <div className="w-32 text-center"></div>
        <div className="w-32 text-center"></div>
      </div>
      <div className="flex flex-row items-center justify-start">
        <ScrollArea className="h-96 max-w-6xl">
          <Table>
            <TableBody>
              {dishes.map((dish) => (
                <TableRow className="mx-0 px-0" key={dish.id}>
                  <TableCell className="flex w-96 flex-row items-center justify-start gap-4 text-start">
                    <Image
                      src={dish.img}
                      alt={dish.name}
                      width={128}
                      height={128}
                    />
                    <div className="flex flex-col items-start justify-center gap-4">
                      <p className="font-bold">{dish.name}</p>
                      <p>{dish.des}</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-36 text-center">
                    {dish.cost}
                  </TableCell>
                  <TableCell className="w-40 text-center">
                    <div className="flex flex-row items-center justify-center gap-4">
                      <Button
                        variant={"outline"}
                        className="h-8 w-8 border-amber-500 text-amber-500 hover:bg-orange-200"
                      >
                        -
                      </Button>
                      <div>{dish.amount}</div>
                      <Button className="h-8 w-8 bg-amber-500 hover:bg-red-500">
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="w-36 text-center">
                    {dish.amount * dish.cost}
                  </TableCell>
                  <TableCell className="w-32 text-center">
                    {dish.isFavorite ? (
                      <FilledHeartIcon
                        onClick={() => handleFavoriteClick(dish.id)}
                      />
                    ) : (
                      <HeartIcon onClick={() => handleFavoriteClick(dish.id)} />
                    )}
                  </TableCell>
                  <TableCell className="w-32 text-center">
                    <TrashIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}

interface HeartIconProps {
  onClick: () => void;
}

interface FilledHeartIconProps {
  onClick: () => void;
}

export const HeartIcon: React.FC<HeartIconProps> = ({ onClick }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z"
      stroke="#E99B3F"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
);

export const FilledHeartIcon: React.FC<FilledHeartIconProps> = ({
  onClick,
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#f59e0b"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z"
      fill="#E99B3F"
      stroke="#E99B3F"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
);

export const TrashIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9"
      stroke="#E99B3F"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21 6H15.375M3 6H8.625M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6H15.375"
      stroke="#E99B3F"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
