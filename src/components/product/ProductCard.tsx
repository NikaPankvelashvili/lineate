"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  title,
  price,
  photos,
  colors,
  description,
}: Product) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col w-4/5 max-w-80 border border-gray-200  m-4 rounded-lg items-center min-h-[400px] justify-around cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        {/* {!hovered ? (
          <Image src={photos[0].url} alt={title} width={300} height={300} />
        ) : (
          <Image src={photos[1].url} alt={title} width={300} height={300} />
        )} */}
        <Image
          className={`${
            hovered ? "opacity-0" : "opacity-100"
          }  top-0 left-0 transition-opacity duration-300`}
          src={photos[0].url}
          alt={title}
          width={300}
          height={300}
        />
        <Image
          className={`${
            !hovered ? "opacity-0" : "opacity-100"
          } absolute top-0 left-0 transition-opacity duration-300`}
          src={photos[1].url}
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
        <div className="flex justify-between items-center w-full">
          <Link
            href={"/products"}
            className="bg-[#0071e3] rounded-full px-4 py-1 hover:bg-[#0056b3] ease-in-out duration-300 text-white "
          >
            Buy Now
          </Link>
          <div className="flex gap-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`p-3 rounded-full bg-[${color}] border border-gray-400`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
