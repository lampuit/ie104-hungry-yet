'use client';

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const imgList = [
  { name: 'img1', src: '/images/food/img1.jpg', alt: 'food img1' },
  { name: 'img2', src: '/images/food/img2.jpg', alt: 'food img2' },
  { name: 'img3', src: '/images/food/img3.jpg', alt: 'food img3' },
  { name: 'img4', src: '/images/food/img4.jpg', alt: 'food img4' },
  { name: 'img5', src: '/images/food/img5.jpg', alt: 'food img5' },
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
  { name: 'img18', src: '/images/food/img18.jpg', alt: 'food img18' },
  { name: 'img19', src: '/images/food/img19.jpg', alt: 'food img19' },
  { name: 'img20', src: '/images/food/img20.jpg', alt: 'food img20' },
  { name: 'img21', src: '/images/food/img21.jpg', alt: 'food img21' },
];

const duplicatedImgList = [...imgList, ...imgList, ...imgList, ...imgList];

export function ImgBg() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const getRowAnimationProps = (rowIndex: number) => {
    const direction = rowIndex % 2 === 0 ? 1 : -1;
    return {
      animate: {
        x: [`0%`, `${-100 * direction}%`],
      },
      transition: {
        x: {
          repeat: Infinity,
          duration: 60 + rowIndex * 10, // Adjust speed
          ease: "linear",
        },


      },
    };
  };

  return (
    <div className="absolute w-screen h-full overflow-hidden z-0">
      <AnimatePresence>
        <div className="grid grid-rows-3 gap-4 h-full">
          {[0, 1, 2].map((rowIndex) => (
            <motion.div
              key={`row-${rowIndex}`}
              className="flex gap-4 overflow-hidden"

              {...getRowAnimationProps(rowIndex)}
            >
              {duplicatedImgList.map((img, imgIndex) => (
                <motion.div
                  key={`${img.name}-${imgIndex}`}
                  className="w-64 h-64 flex-shrink-0 opacity-20 hover:opacity-70 relative overflow-hidden rounded-lg"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: { duration: 2.5 }
                  }}
                  transition={{
                    delay: Math.random() * 0.5,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
