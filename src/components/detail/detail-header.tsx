import Link from "next/link";
import { BellIcon } from "../menu/cart/cart-header";
import { UserIcon } from "../menu/cart/cart-header";
import { Logo } from "@/components/home/nav-bar";

export function DetailHeader() {
    return (
        <div className="flex flex-row w-screen px-10 py-5 justify-between items-center text-white max-w-screen-2xl bg-black">
            <div className="flex flex-row justify-start w-96 items-center grow min-w-52">
                <Link href={"/"} className="flex flex-row justify-start items-center">
                    <Logo />
                    <p className="xs:text-xl sm:text-2xl font-bold px-2">Hungry Yet?</p>
                </Link>
                <p className="xs:text-xl sm:text-2xl font-bold">| Chi tiết món ăn</p>
            </div>
            <div className="flex flex-row justify-between items-center grow max-w-24">
                <BellIcon />
                <UserIcon />
            </div>
        </div>
    );
}

