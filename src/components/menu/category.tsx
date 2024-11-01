import React, { useState } from 'react';

const listCategory = [
    'Khai vị',
    'Món chính',
    'Tráng miệng',
    'Đồ uống',
    'Combo 1 người',
    'Combo nhóm'
]

export function Category() {
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-row justify-center items-center gap-4">
            {listCategory.map((index, i) => (
                <div key={i} className="flex flex-col justify-end items-center gap-2 w-32">
                    <p
                        className={`text-base font-semibold cursor-pointer ${clickedIndex === i ? 'text-amber-500' : 'text-black'} hover:text-amber-500`}
                        onClick={() => setClickedIndex(i)}
                    >
                        {index}
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