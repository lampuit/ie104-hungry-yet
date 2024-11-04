import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/home/nav-bar";

export function CartHeader() {
    return (
        <div className="flex flex-row w-screen px-10 py-5 justify-between items-center text-white max-w-screen-2xl bg-black">
            <div className="flex flex-row justify-start w-96 items-center grow min-w-52">
                <Link href={"/"} className="flex flex-row justify-start items-center">
                    <Logo />
                    <p className="xs:text-xl sm:text-2xl font-bold px-2">Hungry Yet?</p>
                </Link>
                <p className="xs:text-xl sm:text-2xl font-bold">| Giỏ hàng</p>
            </div>
            <div className="flex flex-row justify-between items-center grow max-w-24">
                <BellIcon />
                <UserIcon />
            </div>
        </div>
    );
}

export const BellIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.1781 14.6667C24.954 21.834 28 24 28 24H4C4 24 8 21.1555 8 11.2C8 8.93681 8.84286 6.76632 10.3431 5.16601C11.8434 3.5657 13.8783 2.66666 16 2.66666C16.4498 2.66666 16.8956 2.70706 17.3333 2.78597" stroke="#FEFEFE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M25.3333 10.6667C27.5424 10.6667 29.3333 8.8758 29.3333 6.66666C29.3333 4.45752 27.5424 2.66666 25.3333 2.66666C23.1241 2.66666 21.3333 4.45752 21.3333 6.66666C21.3333 8.8758 23.1241 10.6667 25.3333 10.6667Z" fill="#F1C964" stroke="#F1C964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18.306 28C18.0715 28.4041 17.7351 28.7395 17.3303 28.9727C16.9254 29.2059 16.4665 29.3286 15.9993 29.3286C15.5321 29.3286 15.0731 29.2059 14.6683 28.9727C14.2635 28.7395 13.927 28.4041 13.6926 28" stroke="#FEFEFE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

export const UserIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="16" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8002 12.8C20.8002 15.451 18.6512 17.6 16.0002 17.6C13.3492 17.6 11.2002 15.451 11.2002 12.8C11.2002 10.149 13.3492 8 16.0002 8C18.6512 8 20.8002 10.149 20.8002 12.8ZM19.2002 12.8C19.2002 14.5673 17.7675 16 16.0002 16C14.2329 16 12.8002 14.5673 12.8002 12.8C12.8002 11.0327 14.2329 9.6 16.0002 9.6C17.7675 9.6 19.2002 11.0327 19.2002 12.8Z" fill="black" />
        <path d="M16.0002 20C10.8207 20 6.40761 23.0627 4.72656 27.3536C5.13608 27.7603 5.56747 28.1449 6.01883 28.5056C7.27062 24.5662 11.1976 21.6 16.0002 21.6C20.8028 21.6 24.7298 24.5662 25.9816 28.5057C26.4329 28.1449 26.8643 27.7603 27.2738 27.3536C25.5928 23.0627 21.1797 20 16.0002 20Z" fill="black" />
    </svg>

)