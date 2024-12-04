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
        <div className='flex flex-col items-center gap-4'>
            <div className='relative w-full h-screen'>
                <Image src={'/images/exhibition.jpg'}
                    alt="thumbnail"
                    layout="fill"
                    objectFit='cover'
                    className='absolute -z-10'
                >
                </Image>
            </div>

            <div className='flex flex-wrap justify-center items-center gap-3 w-4/5'>
                {products?.map((product, index) => {
                    return (
                        <div key={index} className='relative w-[300px] h-[200px] overflow-clip group'>
                            <Image src={product.imageUrl}
                                alt={product.name}
                                layout="fill"
                                objectFit='cover'
                                className='absolute transition transform duration-300 ease-in-out hover:scale-125 hover:opacity-50 -z-10'
                            >
                            </Image>
                            <div className='hidden group-hover:flex flex-col justify-center items-center h-full text-white z-10'>
                                <h1 className='text-xl font-semibold'>{product.name}</h1>
                                <Button>Xem chi tiết</Button>
                            </div>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}