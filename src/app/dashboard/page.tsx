'use client'

import Link from "next/link";
import Image from "next/image";

import { LogoSVG, IconSVG, GreenCircle, WhiteCircle } from "@/components/ui/svg";

const dishes = [
  { id: 1, name: "dish1", image: "/images/dish1.jfif" },
  { id: 2, name: "dish2", image: "/images/dish2.jfif" },
  { id: 3, name: "dish3", image: "/images/dish3.jfif" },
  { id: 4, name: "dish4", image: "/images/dish4.jfif" },
  { id: 5, name: "dish5", image: "/images/dish5.jfif" },
  { id: 6, name: "Pho Special", image: "/images/Pho.jpg" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">

      <div className="absolute flex items-center space-x-[10px]">
        <div className="absolute inset-0">
          <GreenCircle />
        </div>
        <div className="absolute inset-0">
          <WhiteCircle />
        </div>
        <div className="absolute">
          <IconSVG />
        </div>
      </div>

      <nav className="NavBar bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-[10px] drop-shadow-[-1px_4px_1px_#BFEA7C]">
            <LogoSVG />
            <h1 className="text-3xl font-bold text-gray-900">Hungry Yet?</h1>
          </div>
          <div className="flex items-center justify-between space-x-[10px]">
            <div className="flex items-center space-x-[24px] border border-[#D9D9D9] drop-shadow-[0px_4px_4px_#00000040] rounded-[28px] py-[var(--sds-size-space-200)] px-[var(--sds-size-space-400)] shadow-[-4px_4px_4px_0px_rgba(0,0,0,0.25)]">
              <Link href="/dashboard">
                <button  className="px-4 py-2 font-semibold text-[#9BCF53] hover:text-gray-900">
                  Trang chủ
                </button>
              </Link>
              <Link href="/shop">
                <button className="px-4 py-2 font-semibold text-[#B3B3B3] hover:text-gray-900">
                  Cửa hàng
                </button>
              </Link>
              <Link href="/about">
                <button  className="px-4 py-2 font-semibold text-[#B3B3B3] hover:text-gray-900">
                  Về chúng tôi
                </button>
              </Link>
            </div>
            <Link href="/login">
              <button className="rounded-[28px] bg-[#BFEA7C] px-[18px] py-[8px] space-x-[10px] font-semibold text-black shadow-[0px_4px_4px_0px_#00000040] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Đăng ký
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="mx-10 flex items-center justify-between p-10">
          <div className="Dishes_IMG">
            IMG
          </div>
          <div className="flex-col items-start justify-between p-10">
            <p className="font-bold text-7xl">Hungry Yet ?</p>
            <p className="my-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aenean tristique turpis lobortis, aliquet purus in, pellentesque odio.
              Aliquam erat volutpat. Quisque sit amet condimentum nulla.
            </p>
            <Link href="/login">
              <button className="rounded-[28px] bg-[#BFEA7C] px-[18px] py-[8px] space-x-[10px] font-semibold text-black shadow-[0px_4px_4px_0px_#00000040]">
                Đặt hàng ngay
              </button>

            </Link>

          </div>
        </section>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="overflow-hidden rounded-lg bg-white shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {dish.name}
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>
                        Delicious {dish.name.toLowerCase()} prepared with fresh
                        ingredients.
                      </p>
                    </div>
                    <div className="mt-3 text-sm">
                      <button
                        className="font-medium text-indigo-600 hover:text-indigo-500 focus:underline focus:outline-none"
                        aria-label={`View details for ${dish.name}`}
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
