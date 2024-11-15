import Link from "next/link";
import { Bell, CircleUserRound, Truck } from "lucide-react";

export function AuthorizedNavbar() {
    return (
        <nav className="flex flex-row px-10 py-5 justify-between items-center h-20 w-full max-w-screen-2xl text-white">
        <Link href={"/"} className="grow flex flex-row justify-start min-w-52 items-center">
          <Truck />
          <p className="sm:text-xl md:text-2xl font-bold px-2">Hungry Yet?</p>
        </Link>
        <div className="grow sm:text-xs sm:gap-1 md:text-base min-w-sm max-w-2xl flex flex-row justify-around items-center">
          <Link href={"/"} className="hover:text-amber-500">Trang chủ</Link>
          <Link href={"/menu"} className="hover:text-amber-500">Thực đơn</Link>
          <Link href={"#"} className="hover:text-amber-500">Công việc</Link>
          <Link href={"/about"} className="hover:text-amber-500">Về chúng tôi</Link>
        </div>
        <CircleUserRound size={32} className="stroke-[1.5px]"/>
      </nav>
    );
}