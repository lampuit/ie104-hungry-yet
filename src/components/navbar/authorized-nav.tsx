import Link from "next/link";
import { Bell, CircleUserRound, Truck } from "lucide-react";

export function AuthorizedNavbar() {
    return (
        <div className="flex flex-row w-screen px-10 py-5 justify-between items-center text-white max-w-screen-2xl">
            <div className="flex flex-row justify-start w-96 items-center grow min-w-52">
                <Link href={"/"} className="flex flex-row justify-start items-center">
                    <Truck />
                    <p className="xs:text-xl sm:text-2xl font-bold px-2">Hungry Yet?</p>
                </Link>
                <p className="xs:text-xl sm:text-2xl font-bold">| Giỏ hàng</p>
            </div>
            <div className="flex flex-row justify-between items-center grow max-w-24">
                <Bell size={32}/>
                <CircleUserRound size={32}/>
            </div>
        </div>
    );
}