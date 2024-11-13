import Image from 'next/image';
import React from 'react';

const category = [
    { name: 'img32', src: '/images/food/img32.jpg', alt: 'food img32' },
    { name: 'img33', src: '/images/food/img33.jpg', alt: 'food img33' },
    { name: 'img34', src: '/images/food/img34.jpg', alt: 'food img34' },
    { name: 'img35', src: '/images/food/img35.jpg', alt: 'food img35' },
    { name: 'img36', src: '/images/food/img36.jpg', alt: 'food img36' },
    { name: 'img38', src: '/images/food/img38.jpg', alt: 'food img38' },
    { name: 'img39', src: '/images/food/img39.jpg', alt: 'food img39' },
    { name: 'img40', src: '/images/food/img40.jpg', alt: 'food img40' },
    { name: 'img41', src: '/images/food/img41.jpg', alt: 'food img41' },
    { name: 'img42', src: '/images/food/img42.jpg', alt: 'food img42' },
];

export function Categories() {
    return (
        <div className="grid grid-rows-1 grid-cols-10 gap-x-8 w-screen z-0">
            {category.map((cate) => (
                <div className='flex flex-col items-start hover:scale-125'>
                    <div key={cate.name} className="rounded-lg">
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

