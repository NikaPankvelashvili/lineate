"use client";

import { useEffect, useState } from "react";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import ProductCard from "./ProductCard";
import { PriceSort, Product } from "@/src/types/products";
import TypeFilter from "./filter/TypeFilter";
import ColorFilter from "./filter/ColorFilter";
import RamFilter from "./filter/RamFilter";
import MemoryFilter from "./filter/MemoryFilter";
import PriceFilter from "./filter/PriceFilter";
import { useI18n } from "@/src/locales/client";

const ProductClient = ({ products }: { products: Product[] }) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showProducts, setShowProducts] = useState<Product[]>(products);
  const [selectedType, setSelectedType] = useQueryState(
    "type",
    parseAsArrayOf(parseAsString).withDefault(["all"])
  );
  const [selectedColors, setSelectedColor] = useQueryState(
    "color",
    parseAsArrayOf(parseAsString).withDefault(["all"])
  );
  const [selectedRam, setSelectedRam] = useQueryState(
    "ram",
    parseAsArrayOf(parseAsInteger).withDefault([0])
  );
  const [selectedMemory, setSelectedMemory] = useQueryState(
    "memory",
    parseAsArrayOf(parseAsInteger).withDefault([0])
  );
  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsInteger.withDefault(-1)
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsInteger.withDefault(-1)
  );
  const [priceSort, setPriceSort] = useQueryState(
    "priceSort",
    parseAsString.withDefault("default")
  );

  const t = useI18n();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="flex min-h-screen">
      <section className="w-1/5 bg-[#161617] p-6 ">
        <div className="bg-[#2b2b2c] h-auto flex flex-col gap-5 p-4 rounded-lg">
          <TypeFilter
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <ColorFilter
            products={products}
            selectedColors={selectedColors}
            setSelectedColor={setSelectedColor}
          />
          <RamFilter
            products={products}
            selectedRam={selectedRam}
            setSelectedRam={setSelectedRam}
          />
          <MemoryFilter
            products={products}
            selectedMemory={selectedMemory}
            setSelectedMemory={setSelectedMemory}
          />
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          <button
            className="bg-[#0071e3] rounded-full px-4 py-1 hover:bg-[#0056b3] ease-in-out duration-300 text-white w-full"
            onClick={() => {
              setSelectedType(null);
              setSelectedColor(null);
              setSelectedRam(null);
              setSelectedMemory(null);
              setMinPrice(null);
              setMaxPrice(null);
            }}
          >
            {t("clearFilters")}
          </button>
        </div>
      </section>
      <section className="w-4/5">
        <div className="bg-[#161617] p-8 flex items-center justify-between">
          <input
            type="text"
            className=" border-b-2  bg-[#161617] w-1/3 text-white text-lg focus:outline-none border-white"
            placeholder={`${t("search")}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label className="text-white">
            {t("priceBy") + ":"}
            <select
              className="bg-[#161617] text-white p-2 ml-2 outline-none"
              value={priceSort || "default"}
              onChange={(e) => {
                e.target.value === "default"
                  ? setPriceSort(null)
                  : setPriceSort(e.target.value as PriceSort);
              }}
            >
              <option value="default">{t("default")}</option>
              <option value="asc">{t("ascending")}</option>
              <option value="desc">{t("descending")}</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-3 gap-4 pb-20 pt-5 bg-[#161617] pl-6">
          {isClient &&
            products
              .filter((product) => {
                return (
                  selectedType.includes("all") ||
                  selectedType.includes(product.type)
                );
              })
              .filter((product) => {
                return (
                  selectedColors.includes("all") ||
                  product.colors.some((c) =>
                    selectedColors.includes(c.colorName)
                  )
                );
              })
              .filter((product) => {
                return selectedRam.includes(0)
                  ? true
                  : product.ram?.some((ram) => selectedRam.includes(ram));
              })
              .filter((product) => {
                return product.title
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase());
              })
              .filter((product) => {
                return selectedMemory.includes(0)
                  ? true
                  : product.memories.some((memory) =>
                      selectedMemory.includes(memory)
                    );
              })
              .filter((product) => {
                if (minPrice == -1 && maxPrice == -1) {
                  return true;
                } else if (minPrice == -1) {
                  return product.price <= maxPrice;
                } else if (maxPrice == -1) {
                  return product.price >= minPrice;
                } else if (maxPrice >= minPrice) {
                  return product.price >= minPrice && product.price <= maxPrice;
                }
                return true;
              })
              .sort((a, b) => {
                if (priceSort === "asc") {
                  return a.price - b.price;
                } else if (priceSort === "desc") {
                  return b.price - a.price;
                }
                return 0;
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
