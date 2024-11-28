import Image from "next/image"
import {getAllProducts} from "../../lib/data"
import useSWR from "swr"

const fetcher = async() =>{
    return await getAllProducts()
}

export function Exhibition() {

    const {data:listDishes, error} = useSWR("products", fetcher)

    return (
        <div className="grid grid-cols-3 gap-3 px-20">
            <div className="overflow-hidden rounded-xl">
                <Image
                    src={"/images/appetizers.jpg"}
                    alt={"Img 1"}
                    width={300}
                    height={200}
                    className="object-cover hover:scale-125 transition-transform"
                />
            </div>
            <div className="row-span-2 overflow-hidden rounded-xl">
                <Image
                    src={"/images/long2.jpg"}
                    alt={"Img 2"}
                    width={300}
                    height={400}
                    className="object-cover hover:scale-125 transition-transform"
                />
            </div>
            <div className="overflow-hidden rounded-xl">
                <Image
                    src={"/images/appetizers.jpg"}
                    alt={"Img 1"}
                    width={300}
                    height={200}
                    className="object-cover hover:scale-125 transition-transform"
                />
            </div>
            <div className="row-span-2 overflow-hidden rounded-xl">
                <Image
                    src={"/images/long2.jpg"}
                    alt={"Img 1"}
                    width={300}
                    height={400}
                    className="object-cover hover:scale-125 transition-transform"
                />
            </div>
            <div className="row-span-2 rounded-xl overflow-hidden">
                <Image
                    src={"/images/long2.jpg"}
                    alt={"Img 1"}
                    width={300}
                    height={200}
                    className="object-cover hover:scale-125 transition-transform"
                />
            </div>
            <div className="overflow-hidden rounded-xl">
                <Image
                    src={"/images/appetizers.jpg"}
                    alt={"Img 1"}
                    width={300}
                    height={400}
                    className="object-cover hover:scale-125 transition-transform"
                />
            </div>
        </div>
    )
}