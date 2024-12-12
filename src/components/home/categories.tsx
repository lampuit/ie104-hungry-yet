"use client"

import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { getAllProducts } from '@/lib/data';
import { useRouter } from "next/navigation";

export function Categories() {
    const [products, setProducts] = useState<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const controls = useAnimation();
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getAllProducts().then(data => {
            setProducts([...data, ...data]); // Duplicate the list for infinite scroll
        }).catch(error => {
            console.error("Error fetching products:", error);
        });
    }, []);

    // Auto-scroll logic
    useEffect(() => {
        const autoScroll = setInterval(() => {
            if (!isHovered) {
                const currentX = x.get();
                const maxScroll = -(products.length / 2) * 120; // Half the products' width

                if (currentX <= maxScroll) {
                    x.set(0); // Reset position when reaching the end
                } else {
                    controls.start({
                        x: currentX - 10, // Move left by 10px
                        transition: { ease: "linear", duration: 0.1 },
                    });
                }
            }
        }, 50); // Adjust the speed of scrolling

        return () => clearInterval(autoScroll);
    }, [isHovered, x, controls, products]);

    return (
        <div
            className="overflow-clip w-full"
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)} // Pause auto-scroll on hover
            onMouseLeave={() => setIsHovered(false)} // Resume auto-scroll when not hovering
        >
            <motion.div
                className="flex space-x-4 py-4"
                style={{ x }}
                animate={controls}
                drag="x"
                dragConstraints={containerRef}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {products?.map((product, index) => (
                    <motion.div
                        key={`${product.id}-${index}`} // Ensure unique keys for duplicated products
                        className="flex-shrink-0 w-28"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="rounded-lg overflow-clip">
                            <Image
                                src={product.imageUrl || "/placeholder-image.jpg"}
                                alt={product.name || "No image"}
                                width={120}
                                height={80}
                                className="object-cover w-full h-28"
                                onClick={() => {
                                    router.push(`/detail?id=${product?.id}`)
                                }}
                            />
                        </div>
                        <p className='mt-2 text-xs text-black font-semibold truncate'>{product?.name}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
