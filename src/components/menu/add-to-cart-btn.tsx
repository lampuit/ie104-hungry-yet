import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { createCart } from "@/lib/actions/cart";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth-client";
import useSWR, { mutate } from "swr";
import { getCartsByUserId } from "@/lib/data";
import { useEffect, useState } from "react";

const fetcherUserId = async () => {
    const response = await getSession();
    const userId = response?.data?.user?.id as string;
    return userId;
};

const fetchCart = async (userId: string) => {
    return await getCartsByUserId(userId);
};

interface Dish {
    id: string;
    name: string;
    image: string;
    price: number;
    des: string;
    published: boolean;
}

interface AddToCartButtonProps {
    dish: Dish;
    onAddToCart?: (totalAmount: number) => void;
}

export const AddToCartButton = ({ dish, onAddToCart }: AddToCartButtonProps) => {
    const router = useRouter();
    const { toast } = useToast();
    const { data: userId, error: userIdError } = useSWR("userId", fetcherUserId);
    const { data: cartData, error: cartError } = useSWR(userId ? `cart-${userId}` : null, () => fetchCart(userId as string));
    const [cart, setCart] = useState<any[]>([]);

    useEffect(() => {
        if (cartData) {
            setCart(cartData);
            onAddToCart && onAddToCart(cartData.length);
        }
    }, [cartData]);

    const handleAddToCartOnClick = async (productId: string) => {
        const data = new FormData();
        if (!userId) {
            router.push("/login");
        } else {
            data.append('userId', userId as string);
            data.append('productId', productId);
            data.append('quantity', '1');

            await createCart(data);

            // Refetch the cart data after adding to cart
            mutate(`cart-${userId}`);
            onAddToCart && onAddToCart(cart.length);

            const currentDateTime = new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });
            toast({
                title: "Thêm vào giỏ hàng thành công!",
                description: `${dish.name} đã duoc thêm vào giỏ hàng của bạn.`,
                action: <ToastAction altText="Xem giỏ hàng" onClick={() => router.push("/menu/cart")}>Xem</ToastAction>,
              })  
        }
    };

    return (
        <Button onClick={() => handleAddToCartOnClick(dish.id)}
            className='rounded-3xl bg-amber-500 hover:bg-red-500'>
            <ShoppingCart /> <span>Thêm giỏ hàng</span>
        </Button>
    );
};