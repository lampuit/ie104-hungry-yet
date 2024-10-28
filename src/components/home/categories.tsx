import Image from 'next/image';
import React from 'react';

const category = [
    { name: 'img50', src: '/images/food/img50.jpg', alt: 'food img50' },
    { name: 'img52', src: '/images/food/img52.jpg', alt: 'food img52' },
    { name: 'img54', src: '/images/food/img54.jpg', alt: 'food img54' },
    { name: 'img55', src: '/images/food/img55.jpg', alt: 'food img55' },
    { name: 'img56', src: '/images/food/img56.jpg', alt: 'food img56' },
    { name: 'img57', src: '/images/food/img57.jpg', alt: 'food img57' },
    { name: 'img58', src: '/images/food/img58.jpg', alt: 'food img58' },
    { name: 'img59', src: '/images/food/img59.jpg', alt: 'food img59' },
    { name: 'img60', src: '/images/food/img60.jpg', alt: 'food img60' },
    { name: 'img63', src: '/images/food/img63.jpg', alt: 'food img63' },
];


export function Categories() {
    return (
        <div className="mt-16 grid grid-rows-1 grid-cols-10 gap-1 w-screen overflow-hidden z-0">
            {category.map((cate) => (
                <div className='flex flex-col justify-between items-start'>
                    <div key={cate.name} className="overflow-hidden rounded-lg">
                        <Image
                            src={cate.src}
                            alt={cate.alt}
                            width={120}
                            height={80}
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <p className='text-xs text-black font-semibold'>Tên món ăn</p>
                </div>
            ))}
        </div>
    );
}