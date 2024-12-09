import { toast } from '@/hooks/use-toast';
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react";
import { createCart } from "@/lib/actions/cart";
import { redirect, useRouter } from "next/navigation";
import { getSession } from "@/lib/auth-client";
import useSWR from "swr";

// Lấy userId từ session
const fetcherUserId = async () => {
    const response = await getSession();
    const userId = response?.data?.user?.id as string;
    return userId;
};

interface Dish {
    id: string;
    name: string;
    image: string;
    price: number;
    des: string;
    published: boolean;
}


export const AddToCartButton: React.FC<{ dish: Dish }> = ({ dish }) => {
    const router = useRouter();
    const { data: userId, error: userIdError } = useSWR("userId", fetcherUserId);
    const handleAddToCartOnClick = async (productId: string) => {
        const data = new FormData();
        if (!userId) {
            router.push("/login");
        }
        else {
            data.append('userId', userId as string);
            data.append('productId', productId);
            data.append('quantity', '1');

            await createCart(data);

            const currentDateTime = new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });
            toast({ description: `Đã thêm ${dish.name.toLowerCase()} vào giỏ hàng` });
        }
    };
    return (
        <Button onClick={() => handleAddToCartOnClick(dish.id)}
            className='rounded-3xl bg-amber-500 hover:bg-red-500'>
            <ShoppingCart /> <span>Thêm giỏ hàng</span>
        </Button>
    );
}