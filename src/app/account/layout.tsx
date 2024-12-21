"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ClipboardList, Heart, LogOut, Settings, UserIcon, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { revokeSession } from "@/lib/auth-client";
import useSWR from "swr";
import { getUserById } from "@/lib/data";
import { getSession } from "@/lib/auth-client";

const userFetcher = async (id: string) => {
    return await getUserById(id);
}
// Lấy userId từ session
const fetcherUserId = async () => {
    const response = await getSession();
    console.log("session", response);
    const userId = response?.data?.user?.id as string;
    return userId;
};

//get session
const fetcherSession = async () => {
    const response = await getSession();
    console.log("session", response);
    return response?.data?.session?.id;
}

interface LayoutProps {
    children: ReactNode
}

export default function Layout({
    children
}: LayoutProps) {
    const router = useRouter();
    const [activePath, setActivePath] = useState<string>("Thông tin đơn hàng"); // Track active path
    const [isLoggingOut, setIsLoggingOut] = useState(false); // Track logout state
    const [shortName, setShortName] = useState<string>("");
    const [name, setName] = useState<string>("");

    const handleClick = (pathname: string, path: string) => {
        setActivePath(pathname);
        router.push(path);
    };

    const { data: userId } = useSWR('userId', fetcherUserId);

    const { data: user, error: userError } = useSWR(userId, userFetcher, { shouldRetryOnError: false });



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
        return (array[array.length - 2]?.at(0) || '').toUpperCase() + (array[array.length - 1]?.at(0) || '').toUpperCase();
    }

    return (
        <main className="bg-gray-50 w-full">
            <div className="flex gap-2 md:gap-10 md:px-4 md:py-10">
                <div className="flex flex-col gap-4 md:gap-6 bg-white rounded p-2 py-10 md:p-6 shadow-md md:w-72">
                    <div className="flex justify-canter md:justify-between items-center md:mb-4 gap-2 w-full md:border-b-2 px-2 md:pb-4">
                        <Avatar className="size-6 md:size-8">
                            <AvatarImage src={user?.[0]?.imageUrl ?? undefined} />
                            <AvatarFallback>{shortName}</AvatarFallback>
                        </Avatar>
                        <p className="grow text-center text-md font-semibold hidden md:inline-block">{name}</p>
                    </div>
                    <div
                        onClick={() => handleClick("Thông tin tài khoản", "/account")}
                        className={`flex justify-canter md:justify-between items-center md:gap-2 rounded-md p-2 ${activePath === "Thông tin tài khoản" ? "shadow  bg-slate-200" : ""}`}
                    >
                        <UserIcon className="grow md:grow-0 stroke-amber-500 size-6 md:size-8" />
                        <p className="hidden md:inline-block text-center">Thông tin tài khoản</p>
                    </div>
                    <div
                        onClick={() => handleClick("Thông tin đơn hàng", "/account/history")}
                        className={`flex justify-canter md:justify-between items-center md:gap-2 rounded-md p-2 ${activePath === "Thông tin đơn hàng" ? "shadow  bg-slate-200" : ""}`}
                    >
                        <ClipboardList className="grow md:grow-0 stroke-blue-500 size-6 md:size-8" />
                        <p className="hidden md:inline-block text-center">Thông tin đơn hàng</p>
                    </div>
                    <div
                        onClick={() => handleClick("Danh mục yêu thích", "/account/favorite")}
                        className={`flex justify-canter md:justify-between items-center md:gap-2 rounded-md p-2 ${activePath === "Danh mục yêu thích" ? "shadow  bg-slate-200" : ""}`}
                    >
                        <Heart className="grow md:grow-0 stroke-red-500 size-6 md:size-8" />
                        <p className="hidden md:inline-block text-center">Danh mục yêu thích</p>
                    </div>
                    <Button
                        variant={"outline"}
                        onClick={() => handleLogout()}
                        disabled={isLoggingOut} // Disable button while logging out
                        className={`p-1 md:p-4 md:mt-4 border-gray-400 text-gray-400 ${isLoggingOut
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
                <div className="grow py-5 md:py-10">
                    {children}
                </div>
            </div>
        </main>
    );
}
