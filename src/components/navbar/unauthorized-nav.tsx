import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
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

export function UnauthorizedNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isMenu = pathname === "/menu";
  const isAbout = pathname.startsWith("/about");
  return (
    <nav className="flex h-20 w-full max-w-screen-2xl flex-row items-center justify-between px-10 py-5 text-white">
      <Link
        href={"/"}
        className="flex grow flex-row items-center justify-start sm:min-w-52"
      >
        <Truck className="stroke-2" />
        <p className="px-2 font-bold sm:text-xl md:text-2xl">Hungry Yet?</p>
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
        <Link href={"/menu/cart"} className="hover:text-amber-500">
          Giỏ hàng
        </Link>
        <Link
          href={"/about"}
          className={`hover:text-amber-500 ${isAbout ? "text-amber-500" : ""}`}
        >
          Về chúng tôi
        </Link>
      </div>
      <Button
        className="hidden rounded-2xl bg-amber-500 px-4 text-sm hover:bg-red-500 sm:inline-block"
        onClick={() => router.push("/login")}
      >
        Đăng nhập
      </Button>

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
              onClick={() => router.push("/login")}
            >
              <Button className="w-full rounded-3xl bg-amber-500 px-2 text-sm hover:bg-red-500">
                Đăng nhập
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
