"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { Product } from "@/src/types/products";
import { useI18n } from "@/src/locales/client";

const ProductCard = ({
  id,
  title,
  price,
  photos,
  colors,
  description,
}: Product) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const t = useI18n();

  return (
    <button
      onClick={() => router.push(`/products/${id}`)}
      className="flex flex-col w-4/5 max-w-80 text-white border-gray-200  m-4 rounded-lg items-center min-h-[400px] justify-around cursor-pointer dark:bg-dark-secondary bg-light-secondary"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <Image
          className={`${
            hovered ? "opacity-0" : "opacity-100"
          }  top-0 left-0 transition-opacity duration-300 w-full h-[150px]`}
          src={photos[0].url}
          alt={title}
          width={300}
          height={300}
        />
        <Image
          className={`${
            !hovered ? "opacity-0" : "opacity-100"
          } absolute top-0 left-0 transition-opacity duration-300`}
          src={photos[1]?.url || photos[0]?.url || ""}
          alt={title}
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center p-6">
        <h2 className="font-bold mb-4">{title}</h2>
        <span className="mb-3 text-center">
          {`${description.split(" ").slice(0, 20).join(" ")}${
            description.split(" ").length > 20 ? "..." : ""
          }`}
        </span>
        <p className="mb-4 font-medium">{`${price}$`}</p>
        <div className="flex justify-between flex-col-reverse gap-4 items-center w-full">
          <Link
            href={"/products"}
            className="bg-[#0071e3] rounded-full px-4 py-1 hover:bg-[#0056b3] ease-in-out duration-300 text-white "
          >
            {t("buyNow")}
          </Link>
          <div className="flex gap-2">
            <>
              {colors.map((color, index) => {
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-full border border-gray-400`}
                    style={{ backgroundColor: color.colorCode }}
                  ></div>
                );
              })}
            </>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
