"use client";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/data";
import Image from "next/image";
import useSWR from "swr";
import { Charm } from "next/font/google";
import { useRouter } from "next/navigation";
import { HorizontalLine } from "@/components/home/intro";

const charm = Charm({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
});

const productsFetcher = async () => {
  return await getAllProducts();
};

export default function ExhibitionPage() {
  const router = useRouter();
  const { data: products, error } = useSWR("products", productsFetcher);
  const handleButtonOnClick = (productId: string) => {
    router.push(`/detail?id=${productId}`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-screen w-full flex-col justify-between bg-black">
        <Image
          src={"/images/exhibition.jpg"}
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          className="absolute opacity-40"
        ></Image>
        <div className="relative top-1/3 z-10 flex max-h-64 flex-col items-center justify-between gap-8 text-white">
          <h1 className={`${charm.className} text-center text-7xl md:text-8xl`}>
            Hungry Yet?
          </h1>
          <p className="text-center text-2xl md:text-3xl">
            Mang hương vị Việt Nam đến từng bữa ăn của bạn.
          </p>
        </div>
      </div>

      <div className="my-16 w-4/5 space-y-8">
        <h1 className="text-4xl font-semibold italic sm:text-5xl">
          Món ăn nổi bật
        </h1>
        <HorizontalLine />
        <p className="">
          Hương vị ẩm thực Việt Nam là sự kết hợp tinh tế giữa các nguyên liệu
          tự nhiên và gia vị đặc trưng, mang đến những món ăn vừa ngon mắt vừa
          đậm đà. Từ vị thanh mát của phở, cái ngọt bùi của bún chả, đến độ giòn
          rụm của nem rán, mỗi món ăn đều phản ánh một phần của nền văn hóa và
          tình yêu dành cho ẩm thực quê nhà. Với sự cân bằng hoàn hảo giữa ngọt,
          mặn, chua, cay, ẩm thực Việt Nam không chỉ là trải nghiệm vị giác mà
          còn là hành trình khám phá văn hóa, gắn kết người với người qua từng
          món ăn.
        </p>
      </div>

      <div className="flex w-4/5 flex-wrap items-center justify-center gap-3">
        {products?.map((product, index) => {
          return (
            <div
              key={index}
              className="group relative h-[200px] w-[300px] overflow-clip bg-black"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width="0"
                height="0"
                sizes="100vw"
                className="absolute h-auto w-full transform transition duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
              ></Image>
              <div className="relative z-10 hidden h-full flex-col items-center justify-center gap-4 text-white group-hover:flex">
                <h1 className="text-xl font-semibold">{product.name}</h1>
                <Button
                  variant={"outline"}
                  className="bg-transparent"
                  onClick={() => handleButtonOnClick(product.id)}
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="my-8 w-4/5 space-y-8">
        <HorizontalLine />
        <p className="">
          HungryYet – nơi mang đến những món ăn ngon và chất lượng, sẵn sàng
          phục vụ bạn mọi lúc, mọi nơi! Hãy cùng khám phá thế giới ẩm thực đa
          dạng, tiện lợi đặt hàng và giao tận nơi, để mỗi bữa ăn đều trở thành
          niềm vui trọn vẹn. Chọn món yêu thích và để chúng tôi chăm sóc bữa ăn
          của bạn!
        </p>
      </div>
    </div>
  );
}
