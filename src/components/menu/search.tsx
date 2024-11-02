import { Input } from "../ui/input";
import React, { useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

export function Search() {
    const inputRef = useRef<HTMLInputElement>(null);
    // const navigate = useNavigate();
    const handleSearchIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleFilterIconClick = () => {
        console.log('Filter icon clicked');
    };
    // const handleCartIconClick = () => {
    //     navigate('/cart');
    // };
        
    return (
        <div className="flex flex-row justify-between items-center px-10 mx-10">
            <div className="flex flex-col justify-center items-center gap-1">
                <h2 className="italic font-semibold text-5xl">Thực đơn</h2>
                <Line />
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
                <SearchIcon onClick={handleSearchIconClick} />
                <div>
                    <Input
                        ref={inputRef}
                        className="w-52 h-8 bg-white rounded-3xl text-xs text-black px-4"
                        type="text"
                    />
                </div>
                <FilterIcon onClick={handleFilterIconClick}/>
                <CartIcon />
            </div>
        </div>
    );
}

export const Line = () => (
    <svg width="220" height="2" viewBox="0 0 220 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1C0 0.447715 0.447715 0 1 0H219C219.552 0 220 0.447715 220 1C220 1.55228 219.552 2 219 2H0.999999C0.447714 2 0 1.55228 0 1Z" fill="#99BD76" />
    </svg>
)

interface SearchIconProps {
    onClick: () => void;
}

interface FilterIconProps {
    onClick: () => void;
}

interface CartIconProps {
    onClick: () => void;
}

export const SearchIcon: React.FC<SearchIconProps> = ({ onClick }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
        <path d="M17 17L21 21" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

export const FilterIcon: React.FC<FilterIconProps> = ({ onClick }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
        <path d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

export const CartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)
