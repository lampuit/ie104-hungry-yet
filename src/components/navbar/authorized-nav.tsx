import Link from "next/link";
import {
  CircleUserRound,
  House,
  Info,
  Menu,
  ShoppingCart,
  SquareMenu,
  Truck,
} from "lucide-react";
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
    <nav className="flex h-20 w-full max-w-screen-2xl flex-row items-center justify-between px-10 py-5 text-white">
      <Link
        href={"/"}
        className="flex grow flex-row items-center justify-start sm:min-w-52"
      >
        <Truck className="stroke-2" />
        <p className="px-2 text-2xl font-bold">Hungry Yet?</p>
        {isCartPage ? (
          <span className="hidden text-xl font-medium md:inline-block">
            <span className="pr-2">|</span>Giỏ Hàng
          </span>
        ) : isCheckoutPage ? (
          <span className="hidden text-xl font-medium md:inline-block">
            <span className="pr-2">|</span>Thanh Toán
          </span>
        ) : isDetail ? (
          <span className="hidden text-xl font-medium md:inline-block">
            <span className="pr-2">|</span>Chi tiết đơn hàng
          </span>
        ) : null}
      </Link>
      <div className="min-w-sm hidden max-w-2xl grow items-center justify-around text-sm font-medium sm:flex md:text-sm lg:text-base">
        <Link href={"/"} className="hover:text-amber-500">
          Trang chủ
        </Link>
        <Link
          href={"/menu"}
          className={`hover:text-amber-500 ${isMenu ? "text-amber-500" : ""}`}
        >
          Thực đơn
        </Link>
        <Link
          href={"/menu/cart"}
          className={`hover:text-amber-500 ${isCartPage ? "text-amber-500" : ""}`}
        >
          Giỏ hàng
        </Link>
        <Link
          href={"/about"}
          className={`hover:text-amber-500 ${isAbout ? "text-amber-500" : ""}`}
        >
          Về chúng tôi
        </Link>
      </div>
      <Link href={"/account/history"} className="hidden sm:inline-block">
        <CircleUserRound size={32} className="hover:stroke-amber-500" />
      </Link>

      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="stroke-2" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push("/")}>
              <div className="flex items-center gap-4">
                <House />
                <p>Trang chủ</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/menu")}>
              <div className="flex items-center gap-4">
                <SquareMenu />
                <p>Thực đơn</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/menu/cart")}>
              <div className="flex items-center gap-4">
                <ShoppingCart />
                <p>Giỏ hàng</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/about")}>
              <div className="flex items-center gap-4">
                <Info />
                <p>Về chúng tôi</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-4"
              onClick={() => router.push("/account/history")}
            >
              <CircleUserRound size={32} />
              <p>Tài khoản</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
