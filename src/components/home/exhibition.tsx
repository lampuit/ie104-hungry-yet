import { HorizontalLine } from "./intro"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const categories = [
    { name: 'Appetizers', src: '/images/appetizers.jpg', alt: 'Appetizers Image' },
    { name: 'Main Dishes', src: '/images/main-dishes.jpg', alt: 'Main Dishes Image' },
];

export function Exhibition() {
    return (
        <div className="flex flex-col justify-between items-center gap-6">
            <div className="flex flex-row justify-between items-center w-2/3">
                <div className="flex flex-col justify-start items-start gap-4">
                    <h2 className='italic text-5xl'>Exhibition Dishes</h2>
                    <HorizontalLine />
                </div>
                <Button asChild>
                    <Link href={"#"}>View Exhibition</Link>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div className="overflow-hidden rounded-lg">
                    <Image
                        src={"/images/appetizers.jpg"}
                        alt={"Img 1"}
                        width={300}
                        height={200}
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="row-span-2 overflow-hidden rounded-lg">
                    <Image
                        src={"/images/long2.jpg"}
                        alt={"Img 2"}
                        width={300}
                        height={400}
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="overflow-hidden rounded-lg">
                    <Image
                        src={"/images/appetizers.jpg"}
                        alt={"Img 1"}
                        width={300}
                        height={200}
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="row-span-2 overflow-hidden rounded-lg">
                    <Image
                        src={"/images/long2.jpg"}
                        alt={"Img 1"}
                        width={300}
                        height={400}
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="row-span-2 overflow-hidden rounded-lg">
                    <Image
                        src={"/images/long2.jpg"}
                        alt={"Img 1"}
                        width={300}
                        height={200}
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="overflow-hidden rounded-lg">
                    <Image
                        src={"/images/appetizers.jpg"}
                        alt={"Img 1"}
                        width={300}
                        height={400}
                        className="object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    )
}