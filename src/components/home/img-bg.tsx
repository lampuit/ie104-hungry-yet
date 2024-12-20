"use client";

import Image from "next/image";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const imgList = [
  { name: "img1", src: "/images/food/img1.jpg", alt: "food img1" },
  { name: "img2", src: "/images/food/img2.jpg", alt: "food img2" },
  { name: "img3", src: "/images/food/img3.jpg", alt: "food img3" },
  { name: "img4", src: "/images/food/img4.jpg", alt: "food img4" },
  { name: "img5", src: "/images/food/img5.jpg", alt: "food img5" },
  { name: "img6", src: "/images/food/img6.jpg", alt: "food img7" },
  { name: "img7", src: "/images/food/img7.jpg", alt: "food img8" },
  { name: "img8", src: "/images/food/img8.jpg", alt: "food img9" },
  { name: "img9", src: "/images/food/img9.jpg", alt: "food img10" },
  { name: "img10", src: "/images/food/img10.jpg", alt: "food img11" },
  { name: "img11", src: "/images/food/img11.jpg", alt: "food img12" },
  { name: "img12", src: "/images/food/img12.jpg", alt: "food img13" },
  { name: "img13", src: "/images/food/img13.jpg", alt: "food img13" },
  { name: "img14", src: "/images/food/img14.jpg", alt: "food img14" },
  { name: "img15", src: "/images/food/img15.jpg", alt: "food img15" },
  { name: "img16", src: "/images/food/img16.jpg", alt: "food img16" },
  { name: "img17", src: "/images/food/img17.jpg", alt: "food img17" },
  { name: "img18", src: "/images/food/img18.jpg", alt: "food img18" },
  { name: "img19", src: "/images/food/img19.jpg", alt: "food img19" },
  { name: "img20", src: "/images/food/img20.jpg", alt: "food img20" },
  { name: "img21", src: "/images/food/img21.jpg", alt: "food img21" },
  { name: "img22", src: "/images/food/img22.jpg", alt: "food img22" },
  { name: "img23", src: "/images/food/img23.jpg", alt: "food img23" },
  { name: "img24", src: "/images/food/img24.jpg", alt: "food img24" },
  { name: "img25", src: "/images/food/img25.jpg", alt: "food img25" },
  { name: "img26", src: "/images/food/img26.jpg", alt: "food img26" },
  { name: "img27", src: "/images/food/img27.jpg", alt: "food img27" },
  { name: "img28", src: "/images/food/img28.jpg", alt: "food img28" },
  { name: "img29", src: "/images/food/img29.jpg", alt: "food img29" },
  { name: "img30", src: "/images/food/img30.jpg", alt: "food img30" },
  { name: "img31", src: "/images/food/img31.jpg", alt: "food img31" },
  { name: "img32", src: "/images/food/img32.jpg", alt: "food img32" },
  { name: "img33", src: "/images/food/img33.jpg", alt: "food img33" },
  { name: "img34", src: "/images/food/img34.jpg", alt: "food img34" },
  { name: "img35", src: "/images/food/img35.jpg", alt: "food img35" },
  { name: "img36", src: "/images/food/img36.jpg", alt: "food img36" },
  { name: "img37", src: "/images/food/img37.jpg", alt: "food img37" },
  { name: "img38", src: "/images/food/img38.jpg", alt: "food img38" },
  { name: "img39", src: "/images/food/img39.jpg", alt: "food img39" },
  { name: "img40", src: "/images/food/img40.jpg", alt: "food img40" },
  { name: "img41", src: "/images/food/img41.jpg", alt: "food img41" },
  { name: "img42", src: "/images/food/img42.jpg", alt: "food img42" },
];

const duplicatedImgList = [...imgList, ...imgList, ...imgList];

export function ImgBg() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const getRowAnimationProps = (rowIndex: number) => {
    const direction = rowIndex % 2 === 0 ? 1 : -1;
    const totalWidth = duplicatedImgList.length * 320;
    return {
      animate: {
        x:
          direction === 1
            ? [`0px`, `-${totalWidth}px`]
            : [`-${totalWidth - 1920}px`, `1920px`],
      },
      transition: {
        x: {
          repeat: Infinity,
          duration: totalWidth / 50, // Adjust speed
          ease: "linear",
        },
      },
    };
  };

  return (
    <div className="absolute z-0 h-full w-screen overflow-clip">
      <AnimatePresence>
        <div className="grid h-full grid-rows-3 gap-1">
          {[0, 1, 2].map((rowIndex) => (
            <motion.div
              key={`row-${rowIndex}`}
              className="flex gap-1 overflow-clip"
              {...getRowAnimationProps(rowIndex)}
            >
              {duplicatedImgList.map((img, imgIndex) => (
                <motion.div
                  key={`${img.name}-${imgIndex}`}
                  className="relative h-64 w-80 flex-shrink-0 opacity-60"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: { duration: 2.5 },
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
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-auto w-full"
                    priority
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

export function ImgBgHover() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const getRowAnimationProps = (rowIndex: number) => {
    const direction = rowIndex % 2 === 0 ? 1 : -1;
    const totalWidth = duplicatedImgList.length * 320;
    return {
      animate: {
        x:
          direction === 1
            ? [`0px`, `-${totalWidth}px`]
            : [`-${totalWidth - 1920}px`, `1920px`],
      },
      transition: {
        x: {
          repeat: Infinity,
          duration: totalWidth / 50, // Adjust speed
          ease: "linear",
        },
      },
    };
  };

  return (
    <div className="absolute z-0 h-full w-screen overflow-clip">
      <AnimatePresence>
        <div className="grid h-full grid-rows-3 gap-1">
          {[0, 1, 2].map((rowIndex) => (
            <motion.div
              key={`row-${rowIndex}`}
              className="flex gap-1 overflow-clip"
              {...getRowAnimationProps(rowIndex)}
            >
              {duplicatedImgList.map((img, imgIndex) => (
                <motion.div
                  key={`${img.name}-${imgIndex}`}
                  className="relative h-64 w-80 flex-shrink-0 opacity-0 hover:opacity-70"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: { duration: 2.5 },
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
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-auto w-full"
                    priority
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
