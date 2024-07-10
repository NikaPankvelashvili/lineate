"use client";

import React, { useContext } from "react";
import { CartContext } from "@/src/providers/CartContext";
import { CartContextType } from "@/src/types/cartTypes";
import cn from "classnames";
import Image from "next/image";
import { handleAddToCart } from "@/src/components/product/utils/productDetailed";

const CartPage = () => {
  const cartContext: CartContextType = useContext(CartContext);

  return (
    <main className="px-[8%]">
      <h1 className="text-5xl">Cart Items</h1>
      <div className="flex flex-col gap-9">
        {cartContext.products.map((product) => (
          <div key={product.id} className="border-2 p-2">
            <div className="flex w-full justify-between">
              <h2>{product.title}</h2>
              <button
                onClick={() =>
                  handleAddToCart({
                    product,
                    color: product.color,
                    memory: product.memory,
                    ram: product.ram,
                    cartContext,
                    image_url: product.image_url,
                    quantity: -product.quantity,
                  })
                }
                className={cn("p-2 rounded-full", {
                  "bg-red-500": product.quantity > 1,
                  "bg-red-300": product.quantity === 1,
                })}
              >
                REMOVE
              </button>
            </div>
            <p>{product.price}</p>
            <div className="flex gap-5">
              <button
                onClick={() =>
                  handleAddToCart({
                    product,
                    color: product.color,
                    memory: product.memory,
                    ram: product.ram,
                    cartContext,
                    image_url: product.image_url,
                    quantity: -1,
                  })
                }
              >
                -
              </button>
              <p>{product.quantity}</p>
              <button
                onClick={() =>
                  handleAddToCart({
                    product,
                    color: product.color,
                    memory: product.memory,
                    ram: product.ram,
                    cartContext,
                    image_url: product.image_url,
                    quantity: 1,
                  })
                }
              >
                +
              </button>
            </div>
            <p>{`Memory ${product.memory}GB`}</p>
            <p>{`Ram ${product.ram}GB`}</p>
            <div
              className={`p-2 rounded-full`}
              style={{ background: product.color.colorCode }}
            ></div>
            <Image
              src={product.image_url}
              alt={product.title}
              width={350}
              height={350}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default CartPage;
