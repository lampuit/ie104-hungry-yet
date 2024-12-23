import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { getSession } from "@/lib/auth-client";
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

export function Intro() {
  const { data: userId, error: userIdError } = useSWR("userId", fetcherUserId);

  return (
    <div className="flex w-screen flex-col items-center justify-between gap-y-16 overflow-clip lg:gap-y-52">
      {/* First Section */}
      <div className="relative mt-10 flex items-center justify-center px-8 sm:px-32 lg:gap-x-8 xl:gap-x-36">
        <div className="flex flex-col items-center justify-center gap-5 lg:items-start lg:gap-10">
          {/* Small Screen */}
          <div className="relative mb-4 h-64 w-full lg:hidden">
            <Image
              src="/images/intro-dish.jpg"
              fill
              sizes="100%"
              priority
              style={{ objectFit: "cover" }}
              alt="Intro dish"
              className="rounded-3xl"
            ></Image>
            <div className="absolute -top-4 start-1/2 -z-10 h-72 w-full overflow-clip rounded-s-3xl bg-[#99BD76] lg:hidden"></div>
          </div>

          <div className="flex flex-col items-start justify-center gap-y-4">
            <h2
              className={`${charm.className} text-center text-4xl font-semibold italic sm:text-5xl`}
            >
              Chào mừng
            </h2>
            <HorizontalLine />
            <p className="text-justify text-sm sm:text-base lg:max-w-xl lg:text-start">
              Chào mừng bạn đến với HungryYet – nơi mang đến những món ăn ngon
              và chất lượng, sẵn sàng phục vụ bạn mọi lúc, mọi nơi! Hãy cùng
              khám phá thế giới ẩm thực đa dạng, tiện lợi đặt hàng và giao tận
              nơi, để mỗi bữa ăn đều trở thành niềm vui trọn vẹn. Chọn món yêu
              thích và để chúng tôi chăm sóc bữa ăn của bạn!
            </p>
          </div>
          <Button
            asChild
            className="w-2/3 max-w-80 rounded-3xl bg-black hover:bg-red-500 sm:w-40"
          >
            <Link href={"/about"}>Về chúng tôi</Link>
          </Button>
        </div>
        <Image
          src="/images/intro-dish.jpg"
          priority
          width={400}
          height={280}
          alt="Intro dish"
          className="hidden rounded-3xl lg:inline-block"
        ></Image>
        <div className="absolute start-2/3 -z-10 hidden h-80 w-full overflow-clip rounded-s-3xl bg-[#99BD76] lg:inline-block"></div>
      </div>

      {/* Second Section */}
      <div className="relative flex items-center justify-center px-8 sm:px-32 lg:gap-x-8 xl:gap-x-36">
        <Image
          src="/images/intro-dish-2.jpg"
          width={400}
          height={280}
          alt="Intro dish"
          priority
          className="hidden rounded-3xl lg:inline-block"
        ></Image>
        <div className="absolute end-2/3 -z-10 hidden h-80 w-full overflow-clip rounded-e-3xl bg-amber-300 lg:inline-block"></div>
        <div className="flex flex-col items-center justify-center gap-5 lg:items-start lg:gap-10">
          {/* Small Screen */}
          <div className="relative mb-4 h-64 w-full lg:hidden">
            <Image
              src="/images/intro-dish-2.jpg"
              sizes="100%"
              priority
              fill
              style={{ objectFit: "cover" }}
              alt="Intro dish"
              className="rounded-3xl"
            ></Image>
            <div className="absolute -top-4 end-1/2 -z-10 h-72 w-full overflow-clip rounded-3xl bg-amber-300 lg:hidden"></div>
          </div>

          <div className="flex flex-col items-start justify-center gap-y-4">
            <h2
              className={`${charm.className} text-center text-4xl font-semibold italic sm:text-5xl`}
            >
              Hương vị Việt Nam
            </h2>
            <HorizontalLine />
            <p className="text-justify text-sm sm:text-base lg:max-w-xl lg:text-start">
              Hương vị ẩm thực Việt Nam là sự kết hợp tinh tế giữa các nguyên
              liệu tự nhiên và gia vị đặc trưng, mang đến những món ăn vừa ngon
              mắt vừa đậm đà. Từ vị thanh mát của phở, cái ngọt bùi của bún chả,
              đến độ giòn rụm của nem rán, mỗi món ăn đều phản ánh một phần của
              nền văn hóa và tình yêu dành cho ẩm thực quê nhà. Với sự cân bằng
              hoàn hảo giữa ngọt, mặn, chua, cay, ẩm thực Việt Nam không chỉ là
              trải nghiệm vị giác mà còn là hành trình khám phá văn hóa, gắn kết
              người với người qua từng món ăn.
            </p>
          </div>
          <Button
            asChild
            className="w-2/3 max-w-80 rounded-3xl bg-amber-500 hover:bg-red-500 sm:w-40"
          >
            <Link href={userId ? "/menu/cart" : "/login"}>Đặt hàng ngay</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const HorizontalLine = () => (
  <svg
    width="220"
    height="2"
    viewBox="0 0 220 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 1C0 0.447715 0.447715 0 1 0H219C219.552 0 220 0.447715 220 1C220 1.55228 219.552 2 219 2H0.999999C0.447714 2 0 1.55228 0 1Z"
      fill="#99BD76"
    />
  </svg>
);

export const Bg1 = () => (
  <svg
    width="600"
    height="357"
    viewBox="0 0 446 357"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 16C0 7.16344 7.16344 0 16 0H488C496.837 0 504 7.16344 504 16V341C504 349.837 496.837 357 488 357H16C7.16344 357 0 349.837 0 341V16Z"
      fill="#99BD76"
    />
  </svg>
);

export const Bg2 = () => (
  <svg
    width="600"
    height="357"
    viewBox="0 0 446 357"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M-58 16C-58 7.16344 -50.8366 0 -42 0H430C438.837 0 446 7.16344 446 16V341C446 349.837 438.837 357 430 357H-42C-50.8366 357 -58 349.837 -58 341V16Z"
      fill="#F1C964"
    />
  </svg>
);
