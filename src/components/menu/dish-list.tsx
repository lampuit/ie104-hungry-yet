import React from 'react';

interface Dish {
    name: string;
    image: string;
}

interface DishListProps {
    category: string;
    dishes: { [key: string]: Dish[] };
}

export const DishList: React.FC<DishListProps> = ({ category, dishes }) => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4 px-4 max-w-7xl">
            {dishes[category].map((dish, index) => (
                <div key={index} className="p-4 border rounded flex flex-col items-center">
                    <img src={dish.image} alt={dish.name} className="w-80 h-72 object-cover mb-2" />
                    <div className='flex flex-col justify-center items-center gap-4 w-72'>
                        <div className='flex flex-col justify-between items-start gap-1'>
                            <div className='flex flex-row justify-between items-center w-60'>
                                <p className='font-semibold text-xl'>{dish.name}</p>
                                <FavoriteIcon />
                            </div>
                            <p className='font-normal text-base'>Phân loại</p>
                        </div>
                        <div className='flex flex-row justify-between items-center w-60'>
                            <div className='flex flex-row justify-start items-center gap-1'>
                                <StarIcon />
                                <p className='font-normal text-base'>4.8</p>
                            </div>
                            <div className='flex flex-row justify-end items-center gap-2'>
                                <MoneyIcon />
                                <p className='font-semibold text-base'>45000 <span className='font-normal'>vnd</span></p>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export const FavoriteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L13.0815 17.1953C12.4227 16.7717 11.5773 16.7717 10.9185 17.1953L5 21Z" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

export const StarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" fill="#F1C964" stroke="#F1C964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

export const MoneyIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1534 7.15382C15.2049 6.20538 13.5346 5.54568 11.9995 5.50437M7.8457 16.1538C8.73806 17.3436 10.3972 18.0222 11.9995 18.0798M11.9995 5.50437C10.1731 5.45522 8.53801 6.2815 8.53801 8.53845C8.53801 12.6923 16.1534 10.6154 16.1534 14.7692C16.1534 17.1383 14.1265 18.1562 11.9995 18.0798M11.9995 5.50437V3M11.9995 18.0798V20.9999" stroke="#99BD76" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)