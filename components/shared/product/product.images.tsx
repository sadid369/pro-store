"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-contain object-center "
      ></Image>
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative h-24 w-24 cursor-pointer overflow-hidden rounded-md border mr-2 hover:border-orange-600",
              current === index && "border-orange-500"
            )}
            onClick={() => setCurrent(index)}
          >
            <Image
              src={image}
              alt="product image"
              fill
              className="object-cover object-center"
            ></Image>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
