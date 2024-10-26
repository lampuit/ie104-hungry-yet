import Image from "next/image";
import React from "react";



const imgList = [
    "@\public\images\food-drink-collection\img1.jpg",
    "@\public\images\food-drink-collection\img2.jpg",
    "@\public\images\food-drink-collection\img3.jpg",
    "@\public\images\food-drink-collection\img4.jpg",
    "@\public\images\food-drink-collection\img5.jpg",
    "@\public\images\food-drink-collection\img6.jpg",
    "@\public\images\food-drink-collection\img7.jpg",
    "@\public\images\food-drink-collection\img8.jpg",
    "@\public\images\food-drink-collection\img9.jpg",
    "@\public\images\food-drink-collection\img10.jpg",
    "@\public\images\food-drink-collection\img11.jpg",
    "@\public\images\food-drink-collection\img12.jpg",
    "@\public\images\food-drink-collection\img13.jpg",
    "@\public\images\food-drink-collection\img14.jpg",
    "@\public\images\food-drink-collection\img15.jpg",
    "@\public\images\food-drink-collection\img16.jpg",
    "@\public\images\food-drink-collection\img17.jpg",
    "@\public\images\food-drink-collection\img18.jpg",
    "@\public\images\food-drink-collection\img19.jpg",
    "@\public\images\food-drink-collection\img20.jpg",
    "@\public\images\food-drink-collection\img21.jpg",
    "@\public\images\food-drink-collection\img22.jpg",
    "@\public\images\food-drink-collection\img23.jpg",
    "@\public\images\food-drink-collection\img24.jpg",
    "@\public\images\food-drink-collection\img25.jpg",
    "@\public\images\food-drink-collection\img26.jpg",
    "@\public\images\food-drink-collection\img27.jpg",
    "@\public\images\food-drink-collection\img28.jpg",
    "@\public\images\food-drink-collection\img29.jpg",
    "@\public\images\food-drink-collection\img30.jpg",
]

export const ImgBg = () => (
    <div className="absolute inset-0 grid grid-rows-3 gap-1 opacity-60">
        {imgList.map((img, index) => (
          <div
            key={index}
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>
        ))}
    </div>
)