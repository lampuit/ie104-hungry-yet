import Image from "next/image";
import React from "react";

const imgList = [
  { name: 'img1', src: '/images/food/img1.jpg', alt: 'food img1' },
  { name: 'img2', src: '/images/food/img2.jpg', alt: 'food img2' },
  { name: 'img3', src: '/images/food/img3.jpg', alt: 'food img3' },
  { name: 'img4', src: '/images/food/img4.jpg', alt: 'food img4' },
  { name: 'img5', src: '/images/food/img5.jpg', alt: 'food img5' },
  { name: 'img6', src: '/images/food/img6.jpg', alt: 'food img6' },
  { name: 'img7', src: '/images/food/img7.jpg', alt: 'food img7' },
  { name: 'img8', src: '/images/food/img8.jpg', alt: 'food img8' },
  { name: 'img9', src: '/images/food/img9.jpg', alt: 'food img9' },
  { name: 'img10', src: '/images/food/img10.jpg', alt: 'food img10' },
  { name: 'img11', src: '/images/food/img11.jpg', alt: 'food img11' },
  { name: 'img12', src: '/images/food/img12.jpg', alt: 'food img12' },
  { name: 'img13', src: '/images/food/img13.jpg', alt: 'food img13' },
  { name: 'img14', src: '/images/food/img14.jpg', alt: 'food img14' },
  { name: 'img15', src: '/images/food/img15.jpg', alt: 'food img15' },
  { name: 'img16', src: '/images/food/img16.jpg', alt: 'food img16' },
  { name: 'img17', src: '/images/food/img17.jpg', alt: 'food img17' },
  { name: 'img18', src: '/images/food/img17.jpg', alt: 'food img18' },
  // { name: 'img19', src: '/images/food/img19.jpg', alt: 'food img19' },
  // { name: 'img20', src: '/images/food/img20.jpg', alt: 'food img20' },
  // { name: 'img21', src: '/images/food/img21.jpg', alt: 'food img21' },
  // { name: 'img22', src: '/images/food/img22.jpg', alt: 'food img22' },
  // { name: 'img23', src: '/images/food/img23.jpg', alt: 'food img23' },
  // { name: 'img24', src: '/images/food/img24.jpg', alt: 'food img24' },
  // { name: 'img25', src: '/images/food/img25.jpg', alt: 'food img25' },
  // { name: 'img26', src: '/images/food/img26.jpg', alt: 'food img26' },
  // { name: 'img27', src: '/images/food/img27.jpg', alt: 'food img27' },
  // { name: 'img28', src: '/images/food/img28.jpg', alt: 'food img28' },
  // { name: 'img29', src: '/images/food/img29.jpg', alt: 'food img29' },
  // { name: 'img30', src: '/images/food/img30.jpg', alt: 'food img30' },
  // { name: 'img31', src: '/images/food/img31.jpg', alt: 'food img31' },
  // { name: 'img32', src: '/images/food/img32.jpg', alt: 'food img32' },
  // { name: 'img33', src: '/images/food/img33.jpg', alt: 'food img33' },
  // { name: 'img34', src: '/images/food/img34.jpg', alt: 'food img34' },
  // { name: 'img35', src: '/images/food/img35.jpg', alt: 'food img35' },
  // { name: 'img36', src: '/images/food/img36.jpg', alt: 'food img36' },
  // { name: 'img37', src: '/images/food/img37.jpg', alt: 'food img37' },
  // { name: 'img38', src: '/images/food/img38.jpg', alt: 'food img38' },
  // { name: 'img39', src: '/images/food/img39.jpg', alt: 'food img39' },
  // { name: 'img40', src: '/images/food/img40.jpg', alt: 'food img40' },
  // { name: 'img41', src: '/images/food/img41.jpg', alt: 'food img41' },
  // { name: 'img42', src: '/images/food/img42.jpg', alt: 'food img42' },
];


export function ImgBg() {
  return (
    <div className="absolute grid grid-rows-3 grid-cols-6 w-screen h-full overflow-hidden gap-1 opacity-30 z-0">
      {imgList.map((img) => (
        <div key={img.name} className="rounded-lg h-52">
          <Image 
            src={img.src}
            alt={img.alt}
            width={300}
            height={200}
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
