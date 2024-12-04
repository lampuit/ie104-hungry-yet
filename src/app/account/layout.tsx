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
    const userId = response?.data?.user?.id as string;
    return userId;
};

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
        try {
            if (!userId) {
                console.error("Session ID is undefined");
                return;
            }
            setIsLoggingOut(true); // Start logout spinner
            const response = await revokeSession({ id: userId });

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
            <div className="flex gap-10 px-4 py-10">
                <div className="flex flex-col gap-6 bg-white rounded p-6 shadow-md w-72">
                    <div className="flex mb-4 gap-2 items-center w-full border-b-2 px-4 pb-4">
                        <Avatar>
                            <AvatarImage src={user?.[0]?.imageUrl ?? undefined} />
                            <AvatarFallback>{shortName}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold">{name}</p>
                    </div>
                    <div
                        onClick={() => handleClick("Thông tin tài khoản", "/account")}
                        className={activePath === "Thông tin tài khoản" ? "flex gap-3 shadow p-2 rounded-md bg-slate-200" : "flex gap-3"}
                    >
                        <UserIcon className="stroke-amber-500" />
                        <p>Thông tin tài khoản</p>
                    </div>
                    <div
                        onClick={() => handleClick("Thông tin đơn hàng", "/account/history")}
                        className={activePath === "Thông tin đơn hàng" ? "flex gap-3 shadow p-2 rounded-md bg-slate-200" : "flex gap-3"}
                    >
                        <ClipboardList className="stroke-blue-500" />
                        <p>Thông tin đơn hàng</p>
                    </div>
                    <div
                        onClick={() => handleClick("Danh mục yêu thích", "/account/favorite")}
                        className={activePath === "Danh mục yêu thích" ? "flex gap-3 shadow p-2 rounded-md bg-slate-200" : "flex gap-3"}
                    >
                        <Heart className="stroke-red-500" />
                        <p>Danh mục yêu thích</p>
                    </div>
                    <Button
                        variant={"outline"}
                        onClick={handleLogout}
                        disabled={isLoggingOut} // Disable button while logging out
                        className={`mt-6 border-gray-400 text-gray-400 ${isLoggingOut
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-gray-400 hover:bg-opacity-20 hover:text-gray-400"
                            }`}
                    >
                        {isLoggingOut ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="animate-spin" />
                                <span>Đang đăng xuất</span>
                            </div>
                        ) : (
                            <>
                                <LogOut className="stroke-gray-400" /> Đăng xuất
                            </>
                        )}
                    </Button>
                </div>
                {children}
            </div>
            <footer className="bg-black h-64"></footer>
        </main>
    );
}
