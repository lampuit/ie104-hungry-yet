import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, Truck } from "lucide-react";
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
    <nav className="w-full flex flex-row px-10 py-5 justify-between items-center h-20 max-w-screen-2xl text-white">
      <Link href={"/"} className="grow flex flex-row justify-start sm:min-w-52 items-center">
        <Truck className="stroke-2" />
        <p className="sm:text-xl md:text-2xl font-bold px-2">Hungry Yet?</p>
      </Link>
      <div className="grow hidden text-sm sm:flex justify-around items-center md:text-sm lg:text-base min-w-sm max-w-2xl  font-medium">
        <Link href={"/"} className="hover:text-amber-500">Trang chủ</Link>
        <Link href={"/menu"} className={`hover:text-amber-500 ${isMenu ? 'text-amber-500' : ''}`}>Thực đơn</Link>
        <Link href={"/menu/cart"} className="hover:text-amber-500">Giỏ hàng</Link>
        <Link href={"/about"} className={`hover:text-amber-500 ${isAbout ? 'text-amber-500' : ''}`}>Về chúng tôi</Link>
      </div>
      <Button className="hidden sm:inline-block text-sm px-4 bg-amber-500 rounded-2xl hover:bg-red-500"
        onClick={() => router.push("/login")}>Đăng nhập</Button>

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
            <DropdownMenuItem className="flex items-center gap-4" onClick={() => router.push("/login")}>
              <Button className="w-full text-sm px-2 bg-amber-500 rounded-3xl hover:bg-red-500">Đăng nhập</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}