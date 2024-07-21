"use client";

import { CartContext } from "@/src/providers/CartContext";
import { Product, ProductImage } from "@/src/types/products";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { CartContextType, CartProductType } from "@/src/types/cartTypes";
import _ from "lodash";
import { handleAddToCart, handleColorChange } from "./utils/productDetailed";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailedClient = ({ product }: { product: Product }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0].colorCode
  );
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    product.photos.find((photo) => photo.color === selectedColor) ||
      product.photos[0]
  );
  const [selectedMemory, setSelectedMemory] = useState<number>(-1);
  const [selectedRam, setSelectedRam] = useState<number>(-1);

  const cartContext = useContext<CartContextType>(CartContext);

  // useEffect(() => {
  //   console.log(cartContext.products);
  // }, [cartContext]);

  return (
    <main className="flex px-[7%] py-12 gap-12 dark:bg-dark-primary bg-light-primary min-h-screen justify-between">
      <div className="flex w-1/2">
        <div className="flex flex-col gap-4">
          {product.photos
            .filter((photo) => photo.color === selectedColor)
            .map((photo) => (
              <div
                key={photo.id}
                className="dark:bg-dark-secondary bg-light-secondary rounded"
              >
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
        <p className="text-white mb-4">{`Starting at: ${product.price}$`}</p>
        <div className="flex gap-2 items-center mb-4">
          {product.colors.map((color, index) => (
            <button
              className={`p-4 rounded-full ${
                selectedColor === color.colorCode ? "border-2 border-black" : ""
              }`}
              key={index}
              value={color.colorCode}
              onClick={(e) =>
                handleColorChange(
                  e,
                  product,
                  selectedColor,
                  setSelectedColor,
                  setSelectedImage
                )
              }
              style={{ backgroundColor: color.colorCode }}
            ></button>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-4">
          {product.memories.map((memory, index) => (
            <button
              className={`text-white p-5 dark:bg-dark-secondary bg-light-secondary rounded ${
                selectedMemory === index ? "border-2 border-black" : ""
              }`}
              value={index}
              key={index}
              onClick={(e) =>
                setSelectedMemory(parseInt(e.currentTarget.value))
              }
            >
              {memory}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {product.ram?.map((ram, index) => (
            <button
              onClick={(e) => setSelectedRam(parseInt(e.currentTarget.value))}
              value={index}
              className={`text-white p-5 dark:bg-dark-secondary bg-light-secondary rounded ${
                selectedRam === index ? "border-2 border-black" : ""
              }`}
              key={index}
            >
              {ram}
            </button>
          ))}
        </div>
        <span className="text-white text-2xl">{`Total: ${product.price}$`}</span>
        <button
          className="text-white"
          onClick={() =>
            handleAddToCart({
              product,
              color: product.colors.find(
                (color) => color.colorCode === selectedColor
              ) || { colorCode: "", colorName: "" },
              memory: product.memories[selectedMemory],
              ram: product.ram[selectedRam],
              cartContext,
              image_url:
                product.photos.find((photo) => photo.color === selectedColor)
                  ?.url || "",
            })
          }
        >
          Add to Cart
        </button>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={5}
      />
    </main>
  );
};

export default ProductDetailedClient;
