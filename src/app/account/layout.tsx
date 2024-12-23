"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  Heart,
  LogOut,
  Settings,
  UserIcon,
  Loader2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { revokeSession } from "@/lib/auth-client";
import useSWR from "swr";
import { getUserById } from "@/lib/data";
import { getSession } from "@/lib/auth-client";

const userFetcher = async (id: string) => {
  return await getUserById(id);
};
// Lấy userId từ session
const fetcherUserId = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return userId;
};

//get session
const fetcherSession = async () => {
  const response = await getSession();
  return response?.data?.session?.id;
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [activePath, setActivePath] = useState<string>("Thông tin đơn hàng"); // Track active path
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Track logout state
  const [shortName, setShortName] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleClick = (pathname: string, path: string) => {
    setActivePath(pathname);
    router.push(path);
  };

  const { data: userId } = useSWR("userId", fetcherUserId);

  const { data: user, error: userError } = useSWR(userId, userFetcher, {
    shouldRetryOnError: false,
  });

  useEffect(() => {
    setShortName(user && user[0]?.name ? splitName(user[0].name) : "");
    setName(user && user[0]?.name ? user[0].name : "");
  }, [user]);

  const handleLogout = async () => {
    const sessionId = await fetcherSession();
    try {
      if (!userId) {
        console.error("Session ID is undefined");
        return;
      }
      if (!sessionId) {
        throw new Error("Session ID is undefined");
      }
      setIsLoggingOut(true); // Start logout spinner
      const response = await revokeSession({ id: sessionId });

      if (response && response?.error?.status === 200) {
        console.log("Session successfully revoked", response);
      } else {
        console.warn("Failed to revoke session", response);
      }
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false); // End logout spinner
    }
  };

  const splitName = (name: string) => {
    const array = name.split(" ");
    return (
      (array[array.length - 2]?.at(0) || "").toUpperCase() +
      (array[array.length - 1]?.at(0) || "").toUpperCase()
    );
  };

  return (
    <main className="w-full bg-gray-50">
      <div className="flex gap-2 md:gap-10 md:px-4 md:py-10">
        <div className="flex flex-col gap-4 rounded bg-white p-2 py-10 shadow-md md:w-72 md:gap-6 md:p-6">
          <div className="justify-canter flex w-full items-center gap-2 px-2 md:mb-4 md:justify-between md:border-b-2 md:pb-4">
            <Avatar className="size-6 md:size-8">
              <AvatarImage src={user?.[0]?.imageUrl ?? undefined} />
              <AvatarFallback>{shortName}</AvatarFallback>
            </Avatar>
            <p className="text-md hidden grow text-center font-semibold md:inline-block">
              {name}
            </p>
          </div>
          <div
            onClick={() => handleClick("Thông tin tài khoản", "/account")}
            className={`justify-canter flex items-center rounded-md p-2 md:justify-between md:gap-2 ${activePath === "Thông tin tài khoản" ? "bg-slate-200 shadow" : ""}`}
          >
            <UserIcon className="size-6 grow stroke-amber-500 md:size-8 md:grow-0" />
            <p className="hidden text-center md:inline-block">
              Thông tin tài khoản
            </p>
          </div>
          <div
            onClick={() =>
              handleClick("Thông tin đơn hàng", "/account/history")
            }
            className={`justify-canter flex items-center rounded-md p-2 md:justify-between md:gap-2 ${activePath === "Thông tin đơn hàng" ? "bg-slate-200 shadow" : ""}`}
          >
            <ClipboardList className="size-6 grow stroke-blue-500 md:size-8 md:grow-0" />
            <p className="hidden text-center md:inline-block">
              Thông tin đơn hàng
            </p>
          </div>
          <div
            onClick={() =>
              handleClick("Danh mục yêu thích", "/account/favorite")
            }
            className={`justify-canter flex items-center rounded-md p-2 md:justify-between md:gap-2 ${activePath === "Danh mục yêu thích" ? "bg-slate-200 shadow" : ""}`}
          >
            <Heart className="size-6 grow stroke-red-500 md:size-8 md:grow-0" />
            <p className="hidden text-center md:inline-block">
              Danh mục yêu thích
            </p>
          </div>
          <Button
            variant={"outline"}
            onClick={() => handleLogout()}
            disabled={isLoggingOut} // Disable button while logging out
            className={`border-gray-400 p-1 text-gray-400 md:mt-4 md:p-4 ${
              isLoggingOut
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-400 hover:bg-opacity-20 hover:text-gray-400"
            }`}
          >
            {isLoggingOut ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" />
                <span className="hidden md:inline">Đang đăng xuất</span>
              </div>
            ) : (
              <>
                <LogOut className="stroke-gray-400" />
                <span className="hidden md:inline">Đăng xuất</span>
              </>
            )}
          </Button>
        </div>
        <div className="grow py-5 md:py-10 pr-2">{children}</div>
      </div>
    </main>
  );
}
