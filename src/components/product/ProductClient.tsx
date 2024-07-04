"use client";

import { useEffect, useState } from "react";
import { useQueryState } from "use-location-state";
import ProductCard from "./ProductCard";
import cn from "classnames";

const ProductClient = ({ products }: { products: Product[] }) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [type, setType] = useQueryState("type", "all");
  const [selectedColors, setSelectedColor] = useQueryState("color", "");
  const [minPrice, setMinPrice] = useQueryState("minPrice", -1);
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", -1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function getUniqueColors(products: Product[]): string[] {
    const colorSet: Set<string> = new Set();

    products.forEach((product) => {
      product.colors.forEach((color) => {
        colorSet.add(color.trim().toLowerCase());
      });
    });

    return Array.from(colorSet);
  }

  function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    setType(
      (type) => {
        if (checked) {
          let updatedType = type.replaceAll("all", "");
          return updatedType === "" ? value : updatedType + " " + value;
        } else {
          let updatedType = type.replaceAll(value, "").trim();
          return updatedType === "" ? "all" : updatedType;
        }
      }
      // { method: "push" }
    );
  }

  function handleColorChange(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setSelectedColor((color) => {
      return color.includes(event.currentTarget.value)
        ? color.replaceAll(event.currentTarget.value, "").trim()
        : (color + " " + event.currentTarget.value).trim();
    });
  }

  return (
    <main className="flex min-h-screen">
      <section className="w-1/5 bg-[#161617] p-8 flex flex-col gap-5">
        <fieldset className="flex flex-col text-white">
          <legend>Choose Product Type</legend>
          <label htmlFor="all">
            <input
              type="checkbox"
              id="all"
              value={"all"}
              checked={type === "all"}
              onChange={() => setType("all")}
            />
            All
          </label>
          <label htmlFor="iphone">
            <input
              type="checkbox"
              id="iphone"
              value={"iphone"}
              checked={type.includes("iphone")}
              onChange={handleTypeChange}
            />
            iPhone
          </label>
          <label htmlFor="macbook">
            <input
              type="checkbox"
              id="macbook"
              value={"macbook"}
              checked={type.includes("macbook")}
              onChange={handleTypeChange}
            />
            MacBook
          </label>
          <label htmlFor="ipad">
            <input
              type="checkbox"
              id="ipad"
              value={"ipad"}
              checked={type.includes("ipad")}
              onChange={handleTypeChange}
            />
            iPad
          </label>
        </fieldset>
        <fieldset className="flex flex-wrap gap-2 text-white w-4/5">
          <legend className="mb-2">Choose Product Color</legend>
          {products &&
            getUniqueColors(products).map((color, index) => {
              const included_color =
                selectedColors.includes(color) || selectedColors === "";
              return (
                <button
                  key={index}
                  // className={`p-3 rounded-full border border-gray-400`}
                  style={{ backgroundColor: color }}
                  value={color}
                  className={cn([
                    "p-3",
                    "rounded-full",
                    "border",
                    "border-gray-400",
                    included_color ? "opacity-100" : "opacity-60",
                  ])}
                  onClick={(e) => handleColorChange(e)}
                ></button>
              );
            })}
        </fieldset>
        <fieldset>
          <legend className="text-white">Price Range</legend>
          <div className="flex justify-between w-full items-center mt-3">
            <div className="p-3 border-[1px]  relative rounded-lg flex content-between text-xs max-lg:w-1/2 ">
              <input
                type="number"
                className="focus:outline-none w-full bg-inherit text-white"
                placeholder="From"
                min={0}
                value={minPrice > -1 ? minPrice : ""}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
              />
            </div>
            <span className="mx-3 text-[#8C929B]">{"-"}</span>
            <div className="p-3 border-[1px] relative rounded-lg flex content-between text-xs max-lg:w-1/2">
              <input
                type="number"
                className="focus:outline-none w-full bg-inherit text-white"
                placeholder="To"
                min={minPrice}
                value={maxPrice > -1 ? maxPrice : ""}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
            </div>
          </div>
        </fieldset>
        <button
          className="bg-[#0071e3] rounded-full px-4 py-1 hover:bg-[#0056b3] ease-in-out duration-300 text-white w-full"
          onClick={() => {
            setType("all");
            setSelectedColor("");
            setMinPrice(-1);
            setMaxPrice(-1);
          }}
        >
          Clear Filters
        </button>
      </section>
      <section className="w-4/5">
        <div></div>
        <div className="grid grid-cols-3 gap-4 pb-20 pt-5">
          {isClient &&
            products
              .filter(
                (product) => type === "all" || type.includes(product.type)
              )
              .filter(
                (product) =>
                  selectedColors === "" ||
                  product.colors.some((c) => selectedColors.includes(c))
              )
              .filter((product) => {
                if (minPrice > -1 && maxPrice > -1) {
                  return product.price >= minPrice && product.price <= maxPrice;
                } else if (minPrice > -1) {
                  return product.price >= minPrice;
                } else if (maxPrice > -1) {
                  return product.price <= maxPrice;
                } else {
                  return true;
                }
              })
              .map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    photos={product.photos}
                    colors={product.colors}
                    ram={product.ram}
                    description={product.description}
                    stock={product.stock}
                    memories={product.memories}
                    type={product.type}
                  />
                );
              })}
        </div>
      </section>
    </main>
  );
};

export default ProductClient;
