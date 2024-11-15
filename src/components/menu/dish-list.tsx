import React from 'react';
import { Button } from '../ui/button';
import { get } from 'http';
import { getProductByCategoryId } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface Dish {
    id: string;
    name: string;
    image: string;
    price: number;
    des: string;
    published: boolean;
}

interface DishListProps {
    dishesList: Dish[];
}

export const DishList = ({ dishesList }: DishListProps) => {
    const router = useRouter();
    const directToDetail =(id: string) => {
        router.push(`/detail/${id}`);
    }
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-10 gap-x-8 mx-10 px-10">
            {dishesList?.map((dish: any, index: any) => (
                    dish.published ? (
                        <div key={index} className="shadow-md rounded-3xl flex flex-col items-center group">
                            <img src={dish.image} alt={dish.name} className="w-full h-80 rounded-3xl object-cover" />
                            <div className='flex flex-col justify-center items-center gap-3 py-4 w-full px-3'>
                                <div className='flex flex-col justify-between items-start gap-1 w-full'>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='font-semibold text-xl'>{dish.name}</p>
                                        <FavoriteIcon />
                                    </div>
                                    <p className='font-normal'>{dish.des}</p>
                                </div>
                                <div className='flex justify-between items-center w-full'>
                                    <div className='flex items-center gap-1'>
                                        <StarIcon />
                                        <p className='font-normal'>4.8</p>
                                    </div>
                                    <div className='flex justify-end items-center gap-2'>
                                        <MoneyIcon />
                                        <p className='font-semibold'>{dish.price} <span className='font-normal'>vnd</span></p>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center w-full'>
                                    <Button onClick={() => directToDetail(dish.id)} className='rounded-3xl bg-black hover:bg-red-500 hidden group-hover:flex transition-all duration-300 ease-in-out'>Xem chi tiết</Button>
                                    <Button className='rounded-3xl bg-amber-500 hover:bg-red-500 hidden group-hover:flex transition-all duration-300 ease-in-out'><AddToCartIcon /> <span>Thêm giỏ hàng</span></Button>
                                </div>
                            </div>
                        </div>
                    ) : null
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2708 10.7869C15.1928 9.58607 15.3745 8.27593 14.0571 7.53535C14.6301 7.1415 15.1161 6.82135 15.5875 6.47978C16.1181 6.09707 16.1245 4.89321 15.5978 4.50407C15.0886 4.12907 14.5615 3.7845 14.0472 3.41978C13.7434 3.20593 13.4314 3.12493 13.0791 3.27964C12.7324 3.43135 12.3981 3.50164 12.0591 3.2115C11.8714 3.05207 11.6609 3.13778 11.4844 3.31778C11.3014 3.50464 11.1012 3.67307 10.9002 3.83935C10.7164 3.9915 10.4489 4.13078 10.6225 4.42521C10.8076 4.74364 11.0918 4.59235 11.2915 4.42778C11.6476 4.1325 11.9986 3.98207 12.4551 4.16207C12.5939 4.21607 12.7988 4.14707 12.9501 4.0785C13.3538 3.89635 13.6932 3.99578 14.0236 4.26278C14.2624 4.45307 14.5139 4.62621 14.7578 4.8075C15.4285 5.30678 15.4131 5.7795 14.6982 6.23164C14.3365 6.45921 13.9572 6.65507 13.8265 7.16164C13.5338 6.88093 13.3242 6.61307 13.0576 6.43607C11.5006 5.40321 9.86093 4.52635 8.22207 3.65078C7.93107 3.49478 7.5925 3.45535 7.32893 3.74893C6.75807 4.37935 6.00722 4.74835 5.33736 5.20993C4.78064 5.59264 4.92164 5.82621 5.18864 6.19693C5.3035 6.35678 5.45736 6.48921 5.6095 6.61135C7.22564 7.90821 8.8435 9.20421 10.4686 10.4882C10.7776 10.7334 10.9289 11.0179 11.0095 11.4306C11.3245 13.0429 11.3682 14.6685 11.3575 16.3031C11.3494 17.5922 11.5585 17.7444 12.7092 17.3621C12.8905 17.2999 13.0744 17.2271 13.2398 17.1259C13.7768 16.8006 14.2804 16.3978 14.8439 16.1445C15.3719 15.9075 15.5399 15.5736 15.5001 14.9946C15.4054 13.5945 15.3616 12.1888 15.2708 10.7869ZM14.6348 15.4249C14.0026 15.8034 13.3924 16.2225 12.7461 16.5718C12.1662 16.8855 12.0526 16.7912 12.0316 16.1179C12.0282 16.0035 12.0269 15.8904 12.0269 15.7772V14.8292C12.1396 13.5804 11.7758 12.2569 11.6112 10.9095C11.5499 10.4081 11.1801 10.1535 10.8346 9.88007C9.26222 8.62993 7.69964 7.36735 6.12336 6.12364C5.77836 5.85278 5.77193 5.69764 6.15122 5.4645C6.66764 5.14864 7.16607 4.79464 7.6525 4.42693C7.85093 4.27564 8.00393 4.31935 8.18007 4.41878C9.58964 5.22493 11.0138 6.00364 12.4019 6.84964C13.1669 7.31721 13.6619 8.13107 14.3198 8.74393C14.4796 8.89264 14.4565 9.11893 14.4685 9.31864C14.5825 11.1752 14.6926 13.0318 14.7998 14.8875C14.8122 15.0842 14.8581 15.2929 14.6348 15.4249Z" fill="#99BD76" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2322 8.09844C16.3706 7.99301 16.4936 7.86401 16.6346 7.76287C17.4566 7.17272 18.1269 6.34472 19.1499 6.06615C19.5746 5.95087 19.6188 5.46615 19.2459 5.17387C18.8538 4.86615 18.4265 4.59872 17.9902 4.36687C16.3368 3.49172 14.9276 2.22872 13.4529 1.08101C12.9708 0.70601 12.6776 0.653724 12.2371 0.993153C11.3576 1.66944 10.4675 2.32987 9.58378 2.99972C9.36606 3.16515 9.14663 3.3833 9.33349 3.66958C9.51006 3.9413 9.74663 3.7703 9.94592 3.61944C10.7786 2.98987 11.6156 2.36758 12.4445 1.73287C12.6343 1.58715 12.7753 1.52287 13.0081 1.6883C14.7742 2.94744 16.3831 4.46072 18.4822 5.43144C17.4703 6.13472 16.6295 6.82515 15.8045 7.5383C15.6189 7.69901 15.4081 7.90087 15.6086 8.16058C15.8023 8.41044 16.0368 8.24715 16.2322 8.09844Z" fill="#99BD76" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.15933 10.1342C2.42019 11.1581 3.77704 11.9994 5.17933 12.7725C5.42361 12.9071 5.64819 13.0871 5.86719 13.2654C6.8679 14.0801 6.86576 14.0814 7.91533 13.4428C8.04476 13.3648 8.18019 13.2979 8.31133 13.2204C8.96361 12.8364 9.6189 12.4588 10.2656 12.0632C10.476 11.9338 10.6728 11.7276 10.491 11.4581C10.3402 11.2361 10.107 11.3368 9.91076 11.4512C9.0519 11.9539 8.19347 12.4558 7.33504 12.9598C7.22447 13.0241 7.12033 13.1016 7.03504 13.1591C6.81647 13.1535 6.68704 13.0219 6.56104 12.9075C5.93833 12.3439 5.22047 11.9394 4.49704 11.5536C3.53876 11.0432 2.66661 10.4016 1.80604 9.72793C1.43533 9.4365 1.49533 9.30193 1.82919 9.06921C2.4369 8.64493 3.06647 8.26564 3.72604 7.94336C4.04276 7.78864 4.32433 7.5975 4.54076 7.30693C4.68604 7.11321 4.88876 6.89164 4.66804 6.6555C4.4499 6.42278 4.22276 6.59121 4.06719 6.79178C3.85376 7.0665 3.57004 7.2045 3.28247 7.3575C2.55776 7.74193 1.84461 8.14778 1.18847 8.66207C0.203615 9.43607 0.233186 9.38164 1.15933 10.1342Z" fill="#99BD76" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.93573 15.886C9.17888 16.2593 8.47988 16.7405 7.7693 17.2004C7.54473 17.3457 7.33173 17.5227 7.02102 17.2711C5.15673 15.7625 3.10345 14.551 1.19073 13.1183C1.05445 13.0158 0.916018 12.9665 0.779304 13.0651C0.613447 13.1847 0.62459 13.3741 0.676018 13.5563C0.729161 13.7427 0.859875 13.8678 1.0163 13.9437C2.28659 14.5638 3.28688 15.6297 4.50873 16.33C5.12845 16.6853 5.72845 17.0787 6.27745 17.5514C6.40559 17.662 6.54188 17.737 6.54873 17.9693C6.56588 18.6023 6.68245 18.67 7.1963 18.3648C8.20173 17.7687 9.19902 17.1593 10.2006 16.5563C10.3699 16.4543 10.54 16.3561 10.5726 16.0364C10.4612 15.7137 10.2117 15.7497 9.93573 15.886Z" fill="#99BD76" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7348 13.6232C10.6332 13.2101 10.3495 13.2898 10.0834 13.4051C9.09164 13.8366 8.17621 14.4186 7.30792 15.0808C7.06407 15.2668 6.89907 15.3101 6.64064 15.1069C4.95978 13.7852 3.20221 12.5852 1.42707 11.4139C1.22692 11.2824 1.01307 11.0805 0.812924 11.3514C0.618352 11.6132 0.822352 11.8125 1.00192 11.9809C1.09792 12.0709 1.2025 12.1515 1.31307 12.2205C3.1495 13.3759 4.90964 14.6531 6.62607 15.9988C6.85064 16.1754 7.09492 16.2692 7.32421 16.0434C8.23021 15.1515 9.3145 14.5755 10.4219 14.0368C10.5822 13.9592 10.7219 13.8576 10.7348 13.6232Z" fill="#99BD76" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2636 17.4066C9.35587 18.0083 8.29173 18.2843 7.41444 18.9388C7.01287 19.2375 6.68716 19.2058 6.32758 18.8835C5.87116 18.4759 5.39673 18.0906 4.92701 17.6993C3.75658 16.7231 2.2493 16.4098 1.04973 15.4883C0.89287 15.3679 0.667441 15.3233 0.531155 15.5316C0.371727 15.7763 0.519155 15.9679 0.709012 16.0986C1.13801 16.3935 1.53658 16.7428 2.02644 16.9283C3.34901 17.4285 4.52244 18.1875 5.57844 19.1715C5.95601 19.5229 6.34215 19.9013 6.9173 19.9952C7.08916 19.9146 7.29787 19.8495 7.47444 19.7308C8.25358 19.2079 9.09573 18.8235 9.93358 18.4266C10.1654 18.3169 10.3832 18.1673 10.5927 18.0131C10.7577 17.8926 10.8854 17.7105 10.7702 17.4919C10.6519 17.2673 10.4312 17.2952 10.2636 17.4066Z" fill="#99BD76" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.19006 8.82695C5.47463 8.58952 5.77077 8.36709 6.04163 8.11381C6.17106 7.99295 6.23492 7.80695 6.13206 7.62009C6.04463 7.46109 5.89077 7.39595 5.7502 7.50009C5.20934 7.90038 4.6762 8.31352 4.15206 8.73738C4.08349 8.79267 4.08006 8.94009 4.04663 9.04466C4.10106 9.75652 4.14092 10.4277 4.90249 10.771C5.24063 10.9231 5.49349 11.2822 5.79477 11.5334C5.90877 11.629 6.06134 11.761 6.1792 11.7438C7.16363 11.6011 8.16092 11.473 8.93063 10.6904C9.0592 10.5597 9.17663 10.4165 9.0712 10.2181C8.94777 9.98709 8.74934 10.0171 8.56892 10.1165C8.30449 10.2618 8.05335 10.4332 7.79535 10.5918C7.02349 11.0675 6.27135 11.0037 5.60363 10.4114C5.47292 10.2952 5.33449 10.1885 5.19992 10.0784C4.70534 9.67252 4.70149 9.23367 5.19006 8.82695Z" fill="#99BD76" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0882 10.3322C16.1508 10.3129 16.2326 10.2893 16.3124 10.2593C17.4326 9.83763 18.2491 8.87292 19.3179 8.3552C19.4718 8.28063 19.5712 8.08778 19.4572 7.8932C19.3072 7.63863 19.0989 7.72135 18.8915 7.81006C17.7978 8.27935 16.9895 9.26249 15.8765 9.6992C15.7046 9.76606 15.6262 9.94906 15.6922 10.1518C15.7544 10.3425 15.9164 10.3305 16.0882 10.3322Z" fill="#99BD76" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3034 12.1887C17.0059 11.6654 17.8322 11.4079 18.5672 10.9579C18.8616 10.7779 19.1637 10.6133 19.4522 10.4243C19.5824 10.339 19.6677 10.195 19.6146 10.0193C19.5627 9.8483 19.4367 9.77716 19.2692 9.78959C19.2272 9.79987 19.1809 9.8003 19.1462 9.82259C18.1026 10.4706 16.9373 10.8713 15.9336 11.5994C15.7729 11.7156 15.6246 11.8874 15.7459 12.1116C15.886 12.3679 16.1269 12.3203 16.3034 12.1887Z" fill="#99BD76" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6885 12.112C19.5574 11.803 19.2981 11.8977 19.0795 11.986C18.9235 12.0499 18.7581 12.1356 18.6419 12.2586C18.1379 12.796 17.5396 13.171 16.8994 13.4873C16.6298 13.6206 16.3731 13.7839 16.1176 13.9441C15.9784 14.0311 15.9064 14.176 15.9458 14.347C15.9891 14.5364 16.1404 14.5651 16.3204 14.5656C16.5604 14.5394 16.7734 14.3843 17.0044 14.2707C17.8778 13.8409 18.6398 13.2344 19.4035 12.6233C19.5801 12.4819 19.8051 12.3867 19.6885 12.112Z" fill="#99BD76" />
    </svg>
)

export const AddToCartIcon = () => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 6H22.5L19.5 16H6.5L3.5 6ZM3.5 6L2.75 3.5" stroke="#FEFEFE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.4922 11H12.4922M14.4922 11H12.4922M12.4922 11V9M12.4922 11V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11.5 19.5C11.5 20.3284 10.8284 21 10 21C9.17157 21 8.5 20.3284 8.5 19.5" stroke="#FEFEFE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M17.5 19.5C17.5 20.3284 16.8284 21 16 21C15.1716 21 14.5 20.3284 14.5 19.5" stroke="#FEFEFE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)