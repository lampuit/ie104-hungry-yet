import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="flex flex-row w-screen px-10 py-5 justify-between items-center text-white">
      <div className="grow min-w-52 flex flex-row justify-start items-center">
        <div>
          <Logo />
        </div>
        <p className="text-2xl font-bold px-2">Hungry Yet?</p>
      </div>
      <div className="grow min-w-sm max-w-2xl flex flex-row justify-around items-center">
        <Link href={""}>Home</Link>
        <Link href={"#"}>Menu</Link>
        <Link href={"#"}>Contact</Link>
        <Link href={"#"}>About Us</Link>
      </div>
      <div className="grow max-w-20">
          <Button asChild>
            <Link href={"/login"}>Sign in</Link>
          </Button>
        </div>
    </nav>
  );
}

export const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.16659 22.1667C9.45525 22.1667 10.4999 21.122 10.4999 19.8333C10.4999 18.5447 9.45525 17.5 8.16659 17.5C6.87792 17.5 5.83325 18.5447 5.83325 19.8333C5.83325 21.122 6.87792 22.1667 8.16659 22.1667Z" stroke="#FEFEFE" stroke-width="3" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M19.8333 22.1667C21.122 22.1667 22.1667 21.122 22.1667 19.8333C22.1667 18.5447 21.122 17.5 19.8333 17.5C18.5447 17.5 17.5 18.5447 17.5 19.8333C17.5 21.122 18.5447 22.1667 19.8333 22.1667Z" stroke="#FEFEFE" stroke-width="3" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16.3333 19.8333V7.6C16.3333 7.26863 16.0646 7 15.7333 7H2.93325C2.60188 7 2.33325 7.26863 2.33325 7.6V19.2333C2.33325 19.5647 2.60188 19.8333 2.93325 19.8333H5.42492" stroke="#FEFEFE" stroke-width="3" stroke-linecap="round" />
    <path d="M16.3343 19.8333H10.5593" stroke="#FEFEFE" stroke-width="3" stroke-linecap="round" />
    <path d="M16.3333 10.5H22.9433C23.1804 10.5 23.3953 10.6396 23.4916 10.8563L25.6149 15.6336C25.649 15.7104 25.6666 15.7934 25.6666 15.8773V19.2333C25.6666 19.5647 25.398 19.8333 25.0666 19.8333H22.7499" stroke="#FEFEFE" stroke-width="3" stroke-linecap="round" />
    <path d="M16.3333 19.8333H17.4999" stroke="#FEFEFE" stroke-width="1.5" stroke-linecap="round" />
  </svg>
);