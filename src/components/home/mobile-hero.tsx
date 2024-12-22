import { Charm } from "next/font/google";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const img = {
  name: "banhmi",
  src: "/images/food/banhmi.jpg",
  alt: "Banh Mi Viet Nam",
};

const charm = Charm({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
});

export const MobileHero = () => {
  return (
    <header className="relative flex h-[500px] w-full flex-col items-center justify-center space-y-8 bg-black py-8 text-white sm:hidden">
      <Image
        src={img.src}
        alt={img.name}
        fill
        style={{ objectFit: "cover" }}
        sizes="100%"
        className="absolute opacity-40"
        priority
      ></Image>
      <h1
        className={`${charm.className} z-10 text-center text-7xl md:text-8xl`}
      >
        Hungry Yet?
      </h1>
      <p className="z-10 text-center text-xl md:text-2xl">
        Chọn hương vị, nhận yêu thương - chỉ từ một cú CLICK!
      </p>
      <div className="z-10 flex min-w-36 justify-around gap-x-3">
        <Button asChild className="rounded-3xl bg-amber-500 hover:bg-red-500">
          <Link href={"/menu/cart"}>Đặt hàng ngay</Link>
        </Button>
      </div>
    </header>
  );
};
