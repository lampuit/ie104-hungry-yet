"use client";
import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/lib/data';
import Image from 'next/image';
import useSWR from 'swr';

const productsFetcher = async () => {
    return await getAllProducts();
}

export default function ExhibitionPage() {
    const { data: products, error } = useSWR("products", productsFetcher);

    return (
        <div className='flex flex-col items-center gap-4 '>
            <div className='relative w-full h-screen bg-black'>
                <Image src={'/images/exhibition.jpg'}
                    alt="thumbnail"
                    layout="fill"
                    objectFit='cover'
                    className='absolute opacity-40'
                >
                </Image>
                
            </div>

            <div className='flex flex-wrap justify-center items-center gap-3 w-4/5'>
                {products?.map((product, index) => {
                    return (
                        <div key={index} className='relative w-[300px] h-[200px] overflow-clip bg-black group'>
                            <Image src={product.imageUrl}
                                alt={product.name}
                                layout="fill"
                                objectFit='cover'
                                className='absolute transition transform duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-25'
                            >
                            </Image>
                            <div className='relative hidden group-hover:flex flex-col justify-center items-center gap-4 h-full text-white z-10'>
                                <h1 className='text-xl font-semibold'>{product.name}</h1>
                                <Button variant={"outline"} className='bg-transparent'>Xem chi tiết</Button>
                            </div>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}