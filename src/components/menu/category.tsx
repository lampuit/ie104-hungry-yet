import React, { useState } from 'react';

export const listCategory = [
    'Khai vị',
    'Món chính',
    'Tráng miệng',
    'Đồ uống',
    'Combo',
    'Best Seller'
]

export const dishes = {
    'Khai vị': [
        { name: 'Appetizer 1', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 2', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 3', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 1', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 2', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 3', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 1', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 2', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 3', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 1', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 2', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 3', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 1', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 2', image: '/images/appetizers.jpg' },
        { name: 'Appetizer 3', image: '/images/appetizers.jpg' }
    ],
    'Món chính': [
        { name: 'Main Dish 1', image: '/images/main-dishes.jpg' },
        { name: 'Main Dish 2', image: '/images/main-dishes.jpg' },
        { name: 'Main Dish 3', image: '/images/main-dishes.jpg' }
    ],
    'Tráng miệng': [
        { name: 'Dessert 1', image: '/images/desserts.jpg' },
        { name: 'Dessert 2', image: '/images/desserts.jpg' },
        { name: 'Dessert 3', image: '/images/desserts.jpg' }
    ],
    'Đồ uống': [
        { name: 'Drink 1', image: '/images/drinks.jpg' },
        { name: 'Drink 2', image: '/images/drinks.jpg' },
        { name: 'Drink 3', image: '/images/drinks.jpg' }
    ],
    'Combo': [
        { name: 'Combo 1', image: '/images/intro-dish.jpg' },
        { name: 'Combo 2', image: '/images/intro-dish.jpg' },
        { name: 'Combo 3', image: '/images/intro-dish.jpg' }
    ],
    'Best Seller': [
        { name: 'Best Seller 1', image: '/images/intro-dish.jpg' },
        { name: 'Best Seller 2', image: '/images/intro-dish.jpg' },
        { name: 'Best Seller 3', image: '/images/intro-dish.jpg' }
    ]
};

interface CategoryProps {
    clickedIndex: number;
    setClickedIndex: (index: number) => void;
}

export function Category({ clickedIndex, setClickedIndex }: CategoryProps) {
    return (
        <div className="flex flex-row justify-center items-center gap-4 py-5">
            {listCategory.map((category, i) => (
                <div key={i} className="flex flex-col justify-end items-center gap-2 w-32">
                    <p
                        className={`md:text-base sm:text-sm font-semibold cursor-pointer ${clickedIndex === i ? 'text-amber-500' : 'text-black'} hover:text-amber-500`}
                        onClick={() => setClickedIndex(i)}
                    >
                        {category}
                    </p>
                    {clickedIndex === i && <Underline />}
                </div>
            ))}
        </div>
    );
}

export const Underline = () => (
    <svg width="123" height="4" viewBox="0 0 123 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 2C0 0.895431 0.89543 0 2 0H121C122.105 0 123 0.895431 123 2C123 3.10457 122.105 4 121 4H2C0.895429 4 0 3.10457 0 2Z" fill="#E99B3F" />
    </svg>

)