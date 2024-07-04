"use client";

import Image from "next/image";
import { useState } from "react";

const ProductDetailedPhotos = ({
  photos,
  colors,
}: {
  photos: ProductImage[];
  colors: string[];
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0]);

  return (
    <ul>
      {photos
        .filter((photo) => photo.color == selectedColor)
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
              selectedColor === color ? "border-2 border-black" : ""
            }`}
            key={index}
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>
    </ul>
  );
};

export default ProductDetailedPhotos;
