"use client";

import { Product, ProductImage } from "@/src/types/products";
import Image from "next/image";
import { useState } from "react";

const ProductDetailedClient = ({ product }: { product: Product }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0].colorCode
  );
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    product.photos.find((photo) => photo.color === selectedColor) ||
      product.photos[0]
  );
  const [price, setPrice] = useState<number>(product.price);

  function handleColorChange(e: React.MouseEvent<HTMLButtonElement>) {
    if (selectedColor === e.currentTarget.value) return;
    setSelectedColor(e.currentTarget.value);
    setSelectedImage(
      product.photos.find((photo) => photo.color === e.currentTarget.value) ||
        product.photos[0]
    );
  }

  return (
    <main className="flex px-[7%] py-12 gap-12 bg-[#161617] min-h-screen justify-between">
      <div className="flex w-1/2">
        <div className="flex flex-col gap-4">
          {product.photos
            .filter((photo) => photo.color === selectedColor)
            .map((photo) => (
              <div key={photo.id} className="bg-[#2b2b2c] rounded">
                <Image
                  className="cursor-pointer"
                  src={photo.url}
                  alt={product.title}
                  width={100}
                  height={100}
                  key={photo.id}
                  onClick={() => setSelectedImage(photo)}
                />
              </div>
            ))}
        </div>
        <div>
          <Image
            className=""
            src={selectedImage.url}
            alt={product.title}
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="w-1/2 ">
        <h1 className="text-3xl text-white font-bold mb-16">{product.title}</h1>
        <p className="text-white mb-8">{product.description}</p>
        <p className="text-white">{`Starting at: ${product.price}$`}</p>
        <button className="p-4 bg-black text-white">Add to Cart</button>
        {product.colors.map((color, index) => (
          <button
            className={`p-4 rounded-full ${
              selectedColor === color.colorCode ? "border-2 border-black" : ""
            }`}
            key={index}
            value={color.colorCode}
            onClick={(e) => handleColorChange(e)}
            style={{ backgroundColor: color.colorCode }}
          ></button>
        ))}
      </div>
    </main>
  );
};

export default ProductDetailedClient;
