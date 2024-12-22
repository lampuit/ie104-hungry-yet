import Image from "next/image";
import { getAllProducts } from "../../lib/data";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const fetcher = async () => {
  return await getAllProducts();
};

export function Exhibition() {
  const { data: listDishes, error } = useSWR("products", fetcher);
  const selectTopDishes = listDishes?.slice(1, 7);
  const router = useRouter();
  const handleButtonOnClick = (productId: string) => {
    router.push(`/detail?id=${productId}`);
  };

  return (
    <div className="grid w-full max-w-6xl grid-cols-2 gap-3 lg:px-10 xl:grid-cols-3 xl:px-20">
      <div className="group relative h-[200px] overflow-clip rounded-xl bg-black sm:h-[200px]">
        <Image
          src={
            selectTopDishes
              ? selectTopDishes[0]?.imageUrl
              : "/images/appetizers.jpg"
          }
          alt={"Top Dish 1"}
          fill
          sizes="100%"
          priority
          style={{ objectFit: "cover" }}
          className="absolute transform transition duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
        />
        <div className="relative z-10 hidden h-full flex-col items-center justify-center gap-4 text-white group-hover:flex">
          {selectTopDishes && (
            <>
              <h1 className="text-center text-xl font-semibold">
                {selectTopDishes[0]?.name}
              </h1>
              <Button
                variant={"outline"}
                className="bg-transparent"
                onClick={() => handleButtonOnClick(selectTopDishes[0]?.id)}
              >
                Xem chi tiết
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="group relative row-span-2 h-[400px] overflow-clip rounded-xl bg-black">
        <Image
          src={
            selectTopDishes ? selectTopDishes[1]?.imageUrl : "/images/long2.jpg"
          }
          alt={"Top Dish 2"}
          fill
          sizes="100%"
          priority
          style={{ objectFit: "cover" }}
          className="absolute transform transition duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
        />
        <div className="relative z-10 hidden h-full flex-col items-center justify-center gap-4 text-white group-hover:flex">
          {selectTopDishes && (
            <>
              <h1 className="text-center text-xl font-semibold">
                {selectTopDishes[1]?.name}
              </h1>
              <Button
                variant={"outline"}
                className="bg-transparent"
                onClick={() => handleButtonOnClick(selectTopDishes[1]?.id)}
              >
                Xem chi tiết
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="group relative h-[200px] overflow-clip rounded-xl bg-black sm:h-[200px]">
        <Image
          src={
            selectTopDishes
              ? selectTopDishes[2]?.imageUrl
              : "/images/appetizers.jpg"
          }
          alt={"Top Dish 3"}
          fill
          sizes="100%"
          priority
          style={{ objectFit: "cover" }}
          className="absolute transform transition duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
        />
        <div className="relative z-10 hidden h-full flex-col items-center justify-center gap-4 text-white group-hover:flex">
          {selectTopDishes && (
            <>
              <h1 className="text-center text-xl font-semibold">
                {selectTopDishes[2]?.name}
              </h1>
              <Button
                variant={"outline"}
                className="bg-transparent"
                onClick={() => handleButtonOnClick(selectTopDishes[2]?.id)}
              >
                Xem chi tiết
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="group relative row-span-2 h-[200px] overflow-clip rounded-xl bg-black xl:h-[400px]">
        <Image
          src={
            selectTopDishes ? selectTopDishes[3]?.imageUrl : "/images/long2.jpg"
          }
          alt={"Top Dish 4"}
          fill
          priority
          sizes="100%"
          style={{ objectFit: "cover" }}
          className="absolute transform transition duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
        />
        <div className="relative z-10 hidden h-full flex-col items-center justify-center gap-4 text-white group-hover:flex">
          {selectTopDishes && (
            <>
              <h1 className="text-center text-xl font-semibold">
                {selectTopDishes[3]?.name}
              </h1>
              <Button
                variant={"outline"}
                className="bg-transparent"
                onClick={() => handleButtonOnClick(selectTopDishes[3]?.id)}
              >
                Xem chi tiết
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="group relative row-span-2 h-[200px] overflow-clip rounded-xl bg-black xl:h-[400px]">
        <Image
          src={
            selectTopDishes ? selectTopDishes[4]?.imageUrl : "/images/long2.jpg"
          }
          alt={"Top Dish 5"}
          fill
          priority
          sizes="100%"
          style={{ objectFit: "cover" }}
          className="absolute transform transition duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
        />
        <div className="relative z-10 hidden h-full flex-col items-center justify-center gap-4 text-white group-hover:flex">
          {selectTopDishes && (
            <>
              <h1 className="text-center text-xl font-semibold">
                {selectTopDishes[4]?.name}
              </h1>
              <Button
                variant={"outline"}
                className="bg-transparent"
                onClick={() => handleButtonOnClick(selectTopDishes[4]?.id)}
              >
                Xem chi tiết
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="group relative hidden h-[200px] overflow-clip rounded-xl bg-black xl:inline-block">
        <Image
          src={
            selectTopDishes
              ? selectTopDishes[5]?.imageUrl
              : "/images/appetizers.jpg"
          }
          alt={"Top Dish 6"}
          fill
          sizes="100%"
          priority
          style={{ objectFit: "cover" }}
          className="absolute transform transition duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
        />
        <div className="relative z-10 hidden h-full flex-col items-center justify-center gap-4 text-white group-hover:flex">
          {selectTopDishes && (
            <>
              <h1 className="text-center text-xl font-semibold">
                {selectTopDishes[5]?.name}
              </h1>
              <Button
                variant={"outline"}
                className="bg-transparent"
                onClick={() => handleButtonOnClick(selectTopDishes[5]?.id)}
              >
                Xem chi tiết
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
