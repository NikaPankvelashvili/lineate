import React from "react";
import { getUniqueColors, handleColorChange } from "../utils";
import { Product } from "@/src/types/products";
import cn from "classnames";

const ColorFilter = ({
  products,
  selectedColors,
  setSelectedColor,
}: {
  products: Product[];
  selectedColors: String[];
  setSelectedColor: React.Dispatch<React.SetStateAction<string[] | null>>;
}) => {
  return (
    <fieldset className="flex flex-wrap gap-2 text-white w-4/5">
      <legend className="mb-2">Choose Product Color</legend>
      {products &&
        getUniqueColors(products).map((color, index) => {
          const included_color =
            selectedColors.includes(color.colorName) ||
            selectedColors.includes("all");
          return (
            <button
              key={index}
              style={{ backgroundColor: color.colorCode }}
              value={color.colorName}
              className={cn([
                "p-3",
                "rounded-full",
                "border",
                "border-gray-400",
                included_color ? "opacity-100" : "opacity-50",
              ])}
              onClick={(e) => handleColorChange(e, setSelectedColor)}
            ></button>
          );
        })}
    </fieldset>
  );
};

export default ColorFilter;
