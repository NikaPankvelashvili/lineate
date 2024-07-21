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
import ProductSkeleton from "../loading/ProductSkeleton";
import { MdOutlineFilterAlt, MdFilterAltOff } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProductClient = ({ products }: { products: Product[] }) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showProducts, setShowProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [visibleCards, setVisibleCards] = useState<number>(6);
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

  const fourSown = useMediaQuery("(max-width:1280px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (fourSown) {
      setVisibleCards(4);
    }
  }, [fourSown]);

  const filteredProduct = (): Product[] => {
    return products
      .filter((product) => {
        return (
          selectedType.includes("all") || selectedType.includes(product.type)
        );
      })
      .filter((product) => {
        return (
          selectedColors.includes("all") ||
          product.colors.some((c) => selectedColors.includes(c.colorName))
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
          : product.memories.some((memory) => selectedMemory.includes(memory));
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
      });
  };

  const showMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 6);
  };

  return (
    <main className="flex flex-col min-h-screen dark:bg-dark-primary bg-light-primary lg:flex-row">
      {/* Toggle button for small screens */}

      {/* Filters section */}
      <button
        className="lg:hidden bg-blue-500 text-white px-4 py-2 rounded-lg m-4 dark:bg-dark-primary bg-light-primary"
        onClick={() => setShowFilters(!showFilters)}
      >
        <span className="flex justify-center items-center text-xl">
          {showFilters ? (
            <>
              <MdOutlineFilterAlt />
              {t("filter")}
            </>
          ) : (
            <>
              <MdFilterAltOff />
              {t("filter")}
            </>
          )}
        </span>
      </button>
      <section
        className={`w-full lg:w-1/5 dark:bg-dark-primary bg-light-primary p-6 ${
          showFilters ? "block" : "hidden"
        } lg:block`}
      >
        <div className="dark:bg-dark-secondary bg-light-secondary h-auto flex flex-col gap-5 p-4 rounded-lg">
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

      {/* Products section */}
      <section className="w-full lg:w-4/5 dark:bg-dark-primary bg-light-primary">
        <div className="dark:bg-dark-primary bg-light-primary p-8 flex flex-col lg:flex-row items-center justify-between">
          <input
            type="text"
            className="border-b-2 dark:bg-dark-primary bg-light-primary w-full lg:w-1/3 text-white text-lg focus:outline-none border-white"
            placeholder={`${t("search")}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label className="text-white mt-4 lg:mt-0">
            {t("priceBy") + ":"}
            <select
              className="dark:bg-dark-primary bg-light-primary text-white p-2 ml-2 outline-none"
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
        <div className="grid grid-cols-1 gap-4 pb-20 pt-5 dark:bg-dark-primary bg-light-primary pl-6 sm:grid-cols-2 xl:grid-cols-3">
          {!isClient ? (
            <>
              <ProductSkeleton index={1} />
              <ProductSkeleton index={2} />
              <ProductSkeleton index={3} />
              <ProductSkeleton index={4} />
              <ProductSkeleton index={5} />
              <ProductSkeleton index={6} />
            </>
          ) : (
            filteredProduct()
              .slice(0, visibleCards)
              .map((product) => {
                return (
                  <div
                    key={product.id}
                    className="flex justify-center items-center"
                  >
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
                  </div>
                );
              })
          )}
        </div>
        {visibleCards < filteredProduct().length && (
          <div className="flex justify-center py-10">
            <button
              onClick={showMoreCards}
              className="px-4 py-2 bg-[#0071e3] hover:bg-[#0056b3] text-white rounded-md "
            >
              {t("seeMore")}
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductClient;
