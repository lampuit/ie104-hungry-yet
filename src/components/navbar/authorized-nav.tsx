import Link from "next/link";
import { CircleUserRound, Menu, Truck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AuthorizedNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isMenu = pathname === "/menu";
  const isCartPage = pathname.startsWith("/menu/cart");
  const isCheckoutPage = pathname.startsWith("/checkout");
  const isDetail = pathname.startsWith("/detail");
  const isAbout = pathname.startsWith("/about");
  return (
    <nav className="w-full flex flex-row px-10 py-5 justify-between items-center h-20 max-w-screen-2xl text-white">
      <Link href={"/"} className="grow flex flex-row justify-start sm:min-w-52 items-center">
        <Truck className="stroke-2" />
        <p className="text-2xl font-bold px-2">Hungry Yet?</p>
        {isCartPage ?
          <span className="hidden md:inline-block text-xl font-medium"><span className="pr-2">|</span>Giỏ Hàng</span>
          : isCheckoutPage ?
            <span className="hidden md:inline-block text-xl font-medium"><span className="pr-2">|</span>Thanh Toán</span>
            : isDetail ?
              <span className="hidden md:inline-block text-xl font-medium"><span className="pr-2">|</span>Chi tiết đơn hàng</span>
              : null
        }
      </Link>
      <div className="grow hidden text-sm sm:flex justify-around items-center md:text-sm lg:text-base min-w-sm max-w-2xl  font-medium">
        <Link href={"/"} className="hover:text-amber-500">Trang chủ</Link>
        <Link href={"/menu"} className={`hover:text-amber-500 ${isMenu ? 'text-amber-500' : ''}`}>Thực đơn</Link>
        <Link href={"/menu/cart"} className={`hover:text-amber-500 ${isCartPage ? 'text-amber-500' : ''}`}>Giỏ hàng</Link>
        <Link href={"/about"} className={`hover:text-amber-500 ${isAbout ? 'text-amber-500' : ''}`}>Về chúng tôi</Link>
      </div>
      <Link href={"/account/history"} className="hidden sm:inline-block">
        <CircleUserRound size={32} />
      </Link>

      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="stroke-2" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push("/")}>Trang chủ</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/menu")}>Thực đơn</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/menu/cart")}>Giỏ hàng</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/about")}>Về chúng tôi</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-4" onClick={() => router.push("/account/history")}>
              <CircleUserRound size={32} />
              <p>Tài khoản</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}