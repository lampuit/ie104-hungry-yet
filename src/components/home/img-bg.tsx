import Image from "next/image";
import React from "react";



const imgList = [
  "/images/food/img1.jpg",
  "/images/food/img2.jpg",
  "/images/food/img3.jpg",
  "/images/food/img4.jpg",
  "/images/food/img5.jpg",
  "/images/food/img6.jpg",
  "/images/food/img7.jpg",
  "/images/food/img8.jpg",
  "/images/food/img9.jpg",
  "/images/food/img10.jpg",
  "/images/food/img11.jpg",
  "/images/food/img12.jpg",
  "/images/food/img13.jpg",
  "/images/food/img14.jpg",
  "/images/food/img15.jpg",
  "/images/food/img16.jpg",
  "/images/food/img17.jpg",
  "/images/food/img18.jpg",
  "/images/food/img19.jpg",
  "/images/food/img20.jpg",
  "/images/food/img21.jpg",
  "/images/food/img22.jpg",
  "/images/food/img23.jpg",
  "/images/food/img24.jpg",
  "/images/food/img25.jpg",
  "/images/food/img26.jpg",
  "/images/food/img27.jpg",
  "/images/food/img28.jpg",
  "/images/food/img29.jpg",
  "/images/food/img30.jpg",
  "/images/food/img31.jpg",
  "/images/food/img32.jpg",
  "/images/food/img33.jpg",
  "/images/food/img34.jpg",
  "/images/food/img35.jpg",
  "/images/food/img36.jpg",
  "/images/food/img37.jpg",
  "/images/food/img38.jpg",
  "/images/food/img39.jpg",
  "/images/food/img40.jpg",
  "/images/food/img41.jpg",
  "/images/food/img42.jpg",
  "/images/food/img43.jpg",
  "/images/food/img44.jpg",
  "/images/food/img45.jpg",
  "/images/food/img46.jpg",
  "/images/food/img47.jpg",
  "/images/food/img48.jpg",
  "/images/food/img49.jpg",
  "/images/food/img50.jpg",
  "/images/food/img51.jpg",
  "/images/food/img52.jpg",
  "/images/food/img53.jpg",
  "/images/food/img54.jpg",
  "/images/food/img55.jpg",
  "/images/food/img56.jpg",
  "/images/food/img57.jpg",
  "/images/food/img58.jpg",
  "/images/food/img59.jpg",
  "/images/food/img60.jpg",
  "/images/food/img61.jpg",
  "/images/food/img62.jpg",
  "/images/food/img63.jpg"
]

export function ImgBg() {
  return (
    <div className="absolute inset-0 grid grid-rows-3 grid-flow-col gap-1 opacity-100">
      {imgList.map((img, index) => (
        <div key={index}>
          <Image src={img} alt={`Image ${index + 1}`} width={260} height={180} />
        </div>
      ))}
    </div>
  );
}
