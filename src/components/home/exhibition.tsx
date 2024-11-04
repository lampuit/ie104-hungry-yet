import Image from "next/image"

export function Exhibition() {
    return (
        <div className="grid grid-cols-3 gap-3 px-20">
            <div>
                <Image
                    src={"/images/appetizers.jpg"}
                    alt={"Img 1"}
                    width={300}
                    height={200}
                    className="object-cover rounded-xl"
                />
            </div>
            <div className="row-span-2">
                <Image
                    src={"/images/long2.jpg"}
                    alt={"Img 2"}
                    width={300}
                    height={400}
                    className="object-cover rounded-xl"
                />
            </div>
            <div>
                <Image
                    src={"/images/appetizers.jpg"}
                    alt={"Img 1"}
                    width={300}
                    height={200}
                    className="object-cover rounded-xl"
                />
            </div>
            <div className="row-span-2">
                <Image
                    src={"/images/long2.jpg"}
                    alt={"Img 1"}
                    width={300}
                    height={400}
                    className="object-cover rounded-xl"
                />
            </div>
            <div className="row-span-2">
                <Image
                    src={"/images/long2.jpg"}
                    alt={"Img 1"}
                    width={300}
                    height={200}
                    className="object-cover rounded-xl"
                />
            </div>
            <div>
                <Image
                    src={"/images/appetizers.jpg"}
                    alt={"Img 1"}
                    width={300}
                    height={400}
                    className="object-cover rounded-xl"
                />
            </div>
        </div>
    )
}