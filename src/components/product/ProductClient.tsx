// "use client";

// import { useEffect, useState } from "react";
// import { useQueryState } from "use-location-state";
// import ProductCard from "./ProductCard";
// import cn from "classnames";
// import { Product } from "@/src/types/products";
// import {
//   getUniqueColors,
//   getUniqueMemories,
//   getUniqueRam,
//   handleColorChange,
//   handleMemoryChange,
//   handleRamChange,
//   handleTypeChange,
// } from "./utils";

// const ProductClient = ({ products }: { products: Product[] }) => {
//   const [isClient, setIsClient] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [type, setType] = useQueryState("type", "all");
//   const [selectedColors, setSelectedColor] = useQueryState("color", "");
//   const [minPrice, setMinPrice] = useQueryState("minPrice", -1);
//   const [maxPrice, setMaxPrice] = useQueryState("maxPrice", -1);
//   const [selectedRam, setSelectedRam] = useQueryState("ram", "");
//   const [selectedMemory, setSelectedMemory] = useQueryState("memory", "");

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   return (
//     <main className="flex min-h-screen">
//       <section className="w-1/5 bg-[#161617] p-6 ">
// <div className="bg-[#2b2b2c] h-auto flex flex-col gap-5 p-4 rounded-lg">
//   <fieldset className="flex flex-col text-white">
//     <legend>Choose Product Type</legend>
//     <label htmlFor="all">
//       <input
//         type="checkbox"
//         id="all"
//         value={"all"}
//         checked={type === "all"}
//         onChange={() => setType("all")}
//       />
//       All
//     </label>
//     <label htmlFor="iphone">
//       <input
//         type="checkbox"
//         id="iphone"
//         value={"iphone"}
//         checked={type.includes("iphone")}
//         onChange={(e) => handleTypeChange(e, setType)}
//       />
//       iPhone
//     </label>
//     <label htmlFor="macbook">
//       <input
//         type="checkbox"
//         id="macbook"
//         value={"macbook"}
//         checked={type.includes("macbook")}
//         onChange={(e) => handleTypeChange(e, setType)}
//       />
//       MacBook
//     </label>
//     <label htmlFor="ipad">
//       <input
//         type="checkbox"
//         id="ipad"
//         value={"ipad"}
//         checked={type.includes("ipad")}
//         onChange={(e) => handleTypeChange(e, setType)}
//       />
//       iPad
//     </label>
//   </fieldset>
// <fieldset className="flex flex-wrap gap-2 text-white w-4/5">
//   <legend className="mb-2">Choose Product Color</legend>
//   {products &&
//     isClient &&
//     getUniqueColors(products).map((color, index) => {
//       const included_color =
//         selectedColors.includes(color) || selectedColors === "";
//       return (
//         <button
//           key={index}
//           style={{ backgroundColor: color }}
//           value={color}
//           className={cn([
//             "p-3",
//             "rounded-full",
//             "border",
//             "border-gray-400",
//             included_color ? "opacity-100" : "opacity-60",
//           ])}
//           onClick={(e) => handleColorChange(e, setSelectedColor)}
//         ></button>
//       );
//     })}
// </fieldset>
// <fieldset className="">
//   <legend className="text-white mb-2">Choose RAM</legend>
//   <div className="flex flex-wrap gap-2 flex-col">
//     {products &&
//       isClient &&
//       getUniqueRam(products).map((ram, index) => {
//         const included_ram =
//           selectedRam === "" ||
//           selectedRam
//             .toLocaleUpperCase()
//             .split(" ")
//             .includes(`${ram}`);
//         return (
//           <button
//             key={index}
//             value={ram}
//             className={cn([
//               "p-1",
//               "rounded",
//               "text-white",
//               "border",
//               "border-gray-400",
//               "bg-[#161617]",
//               included_ram ? "opacity-100" : "opacity-60",
//             ])}
//             onClick={(e) => handleRamChange(e, setSelectedRam)}
//           >
//             {`${ram}GB`}
//           </button>
//         );
//       })}
//   </div>
// </fieldset>
// <fieldset>
//   <legend className="text-white mb-2">Choose Memory</legend>
//   <div className="flex flex-wrap gap-2 flex-col">
//     {products &&
//       isClient &&
//       getUniqueMemories(products).map((memory, index) => {
//         const included_memory =
//           selectedMemory === "" ||
//           selectedMemory
//             .toLocaleUpperCase()
//             .split(" ")
//             .includes(memory.toLocaleUpperCase());
//         return (
//           <button
//             key={index}
//             onClick={(e) => handleMemoryChange(e, setSelectedMemory)}
//             value={memory}
//             className={cn([
//               "p-1",
//               "rounded",
//               "text-white",
//               "border",
//               "border-gray-400",
//               "bg-[#161617]",
//               included_memory ? "opacity-100" : "opacity-60",
//             ])}
//           >
//             {memory}
//           </button>
//         );
//       })}
//   </div>
// </fieldset>
// <fieldset>
//   <legend className="text-white">Price Range</legend>
//   <div className="flex justify-between w-full items-center mt-3">
//     <div className="p-3 border-[1px]  relative rounded-lg flex content-between text-xs max-lg:w-1/2 ">
//       <input
//         type="number"
//         className="focus:outline-none w-full bg-inherit text-white"
//         placeholder="From"
//         min={0}
//         value={minPrice > -1 ? minPrice : ""}
//         onChange={(e) => setMinPrice(parseInt(e.target.value))}
//       />
//     </div>
//     <span className="mx-3 text-[#8C929B]">{"-"}</span>
//     <div className="p-3 border-[1px] relative rounded-lg flex content-between text-xs max-lg:w-1/2">
//       <input
//         type="number"
//         className="focus:outline-none w-full bg-inherit text-white"
//         placeholder="To"
//         min={minPrice}
//         value={maxPrice > -1 ? maxPrice : ""}
//         onChange={(e) => setMaxPrice(parseInt(e.target.value))}
//       />
//     </div>
//   </div>
// </fieldset>
//           <button
//             className="bg-[#0071e3] rounded-full px-4 py-1 hover:bg-[#0056b3] ease-in-out duration-300 text-white w-full"
//             onClick={() => {
//               setType("all");
//               setSelectedColor("");
//               setMinPrice(-1);
//               setMaxPrice(-1);
//               setSelectedRam("");
//               setSelectedMemory("");
//             }}
//           >
//             Clear Filters
//           </button>
//         </div>
//       </section>
//       <section className="w-4/5">
//         <div className="bg-[#161617] p-8">
//           <input
//             type="text"
//             className=" border-b-2  bg-[#161617] w-1/3 text-white text-lg focus:outline-none border-white"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="grid grid-cols-3 gap-4 pb-20 pt-5 bg-[#161617] pl-6">
//           {isClient &&
//             products
//               .filter(
//                 (product) => type === "all" || type.includes(product.type)
//               )
//               .filter(
//                 (product) =>
//                   selectedColors === "" ||
//                   product.colors.some((c) => selectedColors.includes(c))
//               )
//               .filter((product) => {
//                 if (selectedRam === "") {
//                   return true;
//                 } else {
//                   const selectedRamArray = selectedRam
//                     .toLocaleUpperCase()
//                     .split(" ");
//                   return product.ram.some((ram) =>
//                     selectedRamArray.includes(`${ram}`)
//                   );
//                 }
//               })
//               .filter((product) => {
//                 if (selectedMemory === "") {
//                   return true;
//                 } else {
//                   const selectedMemoryArray = selectedMemory
//                     .toLocaleUpperCase()
//                     .split(" ");
//                   return product.memories.some((memory) =>
//                     selectedMemoryArray.includes(memory.toLocaleUpperCase())
//                   );
//                 }
//               })
//               .filter((product) => {
//                 if (minPrice == -1 && maxPrice == -1) {
//                   return true;
//                 } else if (minPrice == -1) {
//                   return product.price <= maxPrice;
//                 } else if (maxPrice == -1) {
//                   return product.price >= minPrice;
//                 } else {
//                   return product.price >= minPrice && product.price <= maxPrice;
//                 }
//               })
//               .filter((product) => {
//                 return product.title
//                   .toLocaleLowerCase()
//                   .includes(searchTerm.toLocaleLowerCase());
//               })
//               .map((product) => {
//                 return (
//                   <ProductCard
//                     key={product.id}
//                     id={product.id}
//                     title={product.title}
//                     price={product.price}
//                     photos={product.photos}
//                     colors={product.colors}
//                     ram={product.ram}
//                     description={product.description}
//                     stock={product.stock}
//                     memories={product.memories}
//                     type={product.type}
//                   />
//                 );
//               })}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default ProductClient;

"use client";

import { useEffect, useState } from "react";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import cn from "classnames";
import ProductCard from "./ProductCard";
import { PriceSort, Product } from "@/src/types/products";
import {
  getUniqueColors,
  getUniqueMemories,
  getUniqueRam,
  handleColorChange,
  handleMemoryChange,
  handleRamChange,
  handleTypeChange,
  // handleTypeChange,
} from "./utils/products";
import TypeFilter from "./filter/TypeFilter";
import ColorFilter from "./filter/ColorFilter";
import RamFilter from "./filter/RamFilter";
import MemoryFilter from "./filter/MemoryFilter";
import PriceFilter from "./filter/PriceFilter";
import { useI18n } from "@/src/locales/client";

const ProductClient = ({ products }: { products: Product[] }) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
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
                  : product.ram.some((ram) => selectedRam.includes(ram));
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
