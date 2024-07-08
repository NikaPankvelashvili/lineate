"use client";

import { Color, ProductImage } from "@/src/types/products";
import Image from "next/image";
import { useState } from "react";

const ProductDetailedPhotos = ({
  photos,
  colors,
}: {
  photos: ProductImage[];
  colors: Color[];
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    colors[0].colorCode
  );

  console.log(photos);
  console.log(selectedColor);

  return (
    <ul>
      {photos
        .filter((photo) => {
          return photo.color == selectedColor;
        })
        .map((photo, index) => (
          <li key={index}>
            <Image
              src={photo.url}
              alt={`Product Photo ${index + 1}`}
              width={1024}
              height={1024}
            />
          </li>
        ))}
      <div className="flex gap-4 items-center">
        {colors.map((color, index) => (
          <button
            className={`p-4 rounded-full ${
              selectedColor === color.colorCode ? "border-2 border-black" : ""
            }`}
            key={index}
            onClick={() => setSelectedColor(color.colorCode)}
            style={{ backgroundColor: color.colorCode }}
          ></button>
        ))}
      </div>
    </ul>
  );
};

export default ProductDetailedPhotos;
