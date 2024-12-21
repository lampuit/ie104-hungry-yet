"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getSession } from "@/lib/auth-client";
import useSWR from "swr";
import { Charm } from "next/font/google";
const charm = Charm({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
});

// Lấy userId từ session
const fetcherUserId = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return userId;
};

export function OrderOnline() {
  const { data: userId, error: userIdError } = useSWR("userId", fetcherUserId);

  return (
    <div className="relative flex w-screen items-center justify-center bg-black py-16">
      <div className="absolute z-0 h-full w-full opacity-40">
        <Image
          src={"/images/small-bg.jpg"}
          alt={"small-bg"}
          fill
          sizes="100%"
          priority
          style={{ objectFit: "cover" }}
        ></Image>
      </div>
      <div className="z-0 flex w-64 flex-col items-center justify-between gap-y-7 rounded-3xl bg-white px-2 py-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className={`${charm.className} text-3xl italic text-black`}>
            Order Online
          </h2>
          <ShortHorizontalLine />
        </div>
        <p className="px-4">
          Bạn muốn hương vị tươi mới? Đặt ngay để thưởng thức ẩm thực Việt Nam
          tại nhà - giao tận nơi, ngon tuyệt vời!
        </p>
        <div>
          <Button asChild className="rounded-3xl bg-amber-500 hover:bg-red-500">
            <a href={userId ? "/menu/cart" : "/menu"}>Đặt ngay</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const ShortHorizontalLine = () => (
  <svg
    width="124"
    height="2"
    viewBox="0 0 124 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.5 1C0.5 0.447715 0.947715 0 1.5 0H122.5C123.052 0 123.5 0.447715 123.5 1C123.5 1.55228 123.052 2 122.5 2H1.5C0.947714 2 0.5 1.55228 0.5 1Z"
      fill="#99BD76"
    />
  </svg>
);
