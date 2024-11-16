import { toast } from "sonner";
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react";

interface Dish {
    id: string;
    name: string;
    image: string;
    price: number;
    des: string;
    published: boolean;
}

export const AddToCartButton: React.FC<{ dish: Dish }> = ({ dish }) => {
    const handleAddToCartOnClick = (productId: string) => {
        console.log(`Add product ${productId} to cart`);
        toast((`Đã thêm ${dish.name} vào giỏ hàng`), {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
                label: "Done",
                onClick: () => console.log("Added successfully"),
            },
        })
    }
    return (
        <Button onClick={() => handleAddToCartOnClick(dish.id)}
            className='rounded-3xl bg-amber-500 hover:bg-red-500 hidden group-hover:flex transition-all duration-300 ease-in-out'>
            <ShoppingCart /> <span>Thêm giỏ hàng</span>
        </Button>
    );
}