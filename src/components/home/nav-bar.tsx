import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <Link className="flex items-center gap-3" href="#">
        <Logo />
        <span className="text-4xl font-semibold">HungryYet?</span>
      </Link>
      <div className="flex items-center gap-8 uppercase">
        <Link className="underline" href={"#"}>
          Thực đơn
        </Link>
        <Link href={"#"}>Liên hệ</Link>
        <Link href={"#"}>Chúng tôi</Link>
        <Button asChild>
          <Link href={"#"}>Đăng ký</Link>
        </Button>
      </div>
    </nav>
  );
}

export const Logo = () => (
    <svg className="size-9 fill-green-600" viewBox="0 0 15 15">
      <path d="M8.17954 6.40909C6.1929 3.81818 7.53522 0 7.53522 0C7.53522 0 3.34719 5.04545 5.97813 8.52273C9.03862 12.5455 7.53522 15 7.53522 15C7.53522 15 11.2937 10.5 8.17954 6.40909ZM2.27333 8.72727C0.769935 6.88636 1.7901 4.09091 1.7901 4.09091C1.7901 4.09091 -1.32408 7.77273 0.66255 10.2955C2.97134 13.2273 1.7901 15 1.7901 15C1.7901 15 4.58212 11.7273 2.27333 8.72727ZM14.0857 8.72727C12.5823 6.88636 13.6025 4.09091 13.6025 4.09091C13.6025 4.09091 10.4883 7.77273 12.475 10.2955C14.7837 13.2273 13.6025 15 13.6025 15C13.6025 15 16.3945 11.7273 14.0857 8.72727Z" />
    </svg>
  );
