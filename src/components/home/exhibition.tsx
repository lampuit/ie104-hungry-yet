import Image from "next/image"
import { getAllProducts } from "../../lib/data"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

const fetcher = async () => {
    return await getAllProducts()
}

export function Exhibition() {

    const { data: listDishes, error } = useSWR("products", fetcher)
    const selectTopDishes = listDishes?.slice(1, 7)
    const router = useRouter();
    const handleButtonOnClick = (productId: string) => {
        router.push(`/detail?id=${productId}`);
    }

    return (
        <div className="grid grid-cols-3 gap-3 px-20">
            <div className="overflow-clip rounded-xl w-[300px] h-[200px] relative bg-black group">
                <Image
                    src={selectTopDishes ? selectTopDishes[0]?.imageUrl : "/images/appetizers.jpg"}
                    alt={"Top Dish 1"}
                    layout="fill"
                    objectFit="cover"
                    className="absolute transition transform duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
                />
                <div className='relative hidden group-hover:flex flex-col justify-center items-center gap-4 h-full text-white z-10'>
                    {selectTopDishes && (
                        <>
                            <h1 className='text-xl font-semibold'>{selectTopDishes[0]?.name}</h1>
                            <Button variant={"outline"} className='bg-transparent'
                                onClick={() => handleButtonOnClick(selectTopDishes[0]?.id)}>Xem chi tiết</Button>
                        </>
                    )}
                </div>
            </div>

            <div className="row-span-2 overflow-clip rounded-xl w-[300px] h-[400px] relative bg-black group">
                <Image
                    src={selectTopDishes ? selectTopDishes[1]?.imageUrl : "/images/long2.jpg"}
                    alt={"Top Dish 2"}
                    layout="fill"
                    objectFit="cover"
                    className="absolute transition transform duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
                />
                <div className='relative hidden group-hover:flex flex-col justify-center items-center gap-4 h-full text-white z-10'>
                    {selectTopDishes && (
                        <>
                            <h1 className='text-xl font-semibold'>{selectTopDishes[1]?.name}</h1>
                            <Button variant={"outline"} className='bg-transparent'
                                onClick={() => handleButtonOnClick(selectTopDishes[1]?.id)}>Xem chi tiết</Button>
                        </>
                    )}
                </div>
            </div>

            <div className="overflow-clip rounded-xl w-[300px] h-[200px] relative bg-black group">
                <Image
                    src={selectTopDishes ? selectTopDishes[2]?.imageUrl : "/images/appetizers.jpg"}
                    alt={"Top Dish 3"}
                    layout="fill"
                    objectFit="cover"
                    className="absolute transition transform duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
                />
                <div className='relative hidden group-hover:flex flex-col justify-center items-center gap-4 h-full text-white z-10'>
                    {selectTopDishes && (
                        <>
                            <h1 className='text-xl font-semibold'>{selectTopDishes[2]?.name}</h1>
                            <Button variant={"outline"} className='bg-transparent'
                                onClick={() => handleButtonOnClick(selectTopDishes[2]?.id)}>Xem chi tiết</Button>
                        </>
                    )}
                </div>
            </div>

            <div className="row-span-2 overflow-clip rounded-xl w-[300px] h-[400px] relative bg-black group">
                <Image
                    src={selectTopDishes ? selectTopDishes[3]?.imageUrl : "/images/long2.jpg"}
                    alt={"Top Dish 4"}
                    layout="fill"
                    objectFit="cover"
                    className="absolute transition transform duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
                />
                <div className='relative hidden group-hover:flex flex-col justify-center items-center gap-4 h-full text-white z-10'>
                    {selectTopDishes && (
                        <>
                            <h1 className='text-xl font-semibold'>{selectTopDishes[3]?.name}</h1>
                            <Button variant={"outline"} className='bg-transparent'
                                onClick={() => handleButtonOnClick(selectTopDishes[3]?.id)}>Xem chi tiết</Button>
                        </>
                    )}
                </div>
            </div>

            <div className="row-span-2 overflow-clip rounded-xl w-[300px] h-[400px] relative bg-black group">
                <Image
                    src={selectTopDishes ? selectTopDishes[4]?.imageUrl : "/images/long2.jpg"}
                    alt={"Top Dish 5"}
                    layout="fill"
                    objectFit="cover"
                    className="absolute transition transform duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
                />
                <div className='relative hidden group-hover:flex flex-col justify-center items-center gap-4 h-full text-white z-10'>
                    {selectTopDishes && (
                        <>
                            <h1 className='text-xl font-semibold'>{selectTopDishes[4]?.name}</h1>
                            <Button variant={"outline"} className='bg-transparent'
                                onClick={() => handleButtonOnClick(selectTopDishes[4]?.id)}>Xem chi tiết</Button>
                        </>
                    )}
                </div>
            </div>

            <div className="overflow-clip rounded-xl w-[300px] h-[200px] relative bg-black group">
                <Image
                    src={selectTopDishes ? selectTopDishes[5]?.imageUrl : "/images/appetizers.jpg"}
                    alt={"Top Dish 6"}
                    layout="fill"
                    objectFit="cover"
                    className="absolute transition transform duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25"
                />
                <div className='relative hidden group-hover:flex flex-col justify-center items-center gap-4 h-full text-white z-10'>
                    {selectTopDishes && (
                        <>
                            <h1 className='text-xl font-semibold'>{selectTopDishes[5]?.name}</h1>
                            <Button variant={"outline"} className='bg-transparent'
                                onClick={() => handleButtonOnClick(selectTopDishes[5]?.id)}>Xem chi tiết</Button>
                        </>
                    )}
                </div>
            </div>

        </div>
    )
}