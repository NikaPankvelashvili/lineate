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
import { useI18n } from "@/src/locales/client";
import { useTheme } from "next-themes";

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

  const { theme, setTheme } = useTheme();

  const t = useI18n();

  // useEffect(() => {
  //   console.log(cartContext.products);
  // }, [cartContext]);

  const calculateTotalPrice = (product: Product) => {
    if (selectedMemory === -1 && selectedRam === -1) return product.price;
    if (selectedMemory === -1) return Number(product.price) + selectedRam * 100;
    if (selectedRam === -1) return Number(product.price) + selectedMemory * 50;
    return Number(product.price) + selectedMemory * 50 + selectedRam * 100;
  };

  console.log(cartContext.products);

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
        <div className="my-14 flex flex-col gap-5 items-start">
          <span className="text-white text-2xl font-bold">{`Total: ${calculateTotalPrice(
            product
          )}$`}</span>
          <button
            className={`text-white px-4 py-2 hover:bg-[#0056b3] bg-[#0071e3] rounded-full ${
              selectedMemory === -1 || selectedRam === -1
                ? "cursor-not-allowed"
                : ""
            }`}
            disabled={selectedMemory === -1 || selectedRam === -1}
            onClick={() =>
              handleAddToCart({
                id: product.id,
                title: product.title,
                price: calculateTotalPrice(product),
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
            {t("addToCart")}
          </button>
        </div>
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
        theme={theme}
        limit={5}
      />
    </main>
  );
};

export default ProductDetailedClient;
