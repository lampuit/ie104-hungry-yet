import { toast } from "sonner";
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react";
import { createCart } from "@/lib/actions/cart";
import { redirect, useRouter } from "next/navigation";

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
    const userId = sessionStorage.getItem('userId');
    const handleAddToCartOnClick = async (productId: string) => {
        const data = new FormData();
        console.log(sessionStorage.getItem('userId'));
        if (!sessionStorage.getItem('userId')) {
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

            console.log(`Add product ${productId} to cart`);
            toast(`Đã thêm ${dish.name} vào giỏ hàng`, {
                description: currentDateTime,
                action: {
                    label: "Xem giỏ hàng",
                    onClick: () => router.push("/menu/cart"),
                },
            });
        }
    };
    return (
        <Button onClick={() => handleAddToCartOnClick(dish.id)}
            className='rounded-3xl bg-amber-500 hover:bg-red-500 hidden group-hover:flex transition-all duration-300 ease-in-out'>
            <ShoppingCart /> <span>Thêm giỏ hàng</span>
        </Button>
    );
}