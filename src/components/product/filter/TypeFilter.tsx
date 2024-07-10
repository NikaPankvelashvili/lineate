import React from "react";
import { handleTypeChange } from "../utils/products";
import { useI18n } from "@/src/locales/client";

const TypeFilter = ({
  selectedType,
  setSelectedType,
}: {
  selectedType: string[];
  setSelectedType: React.Dispatch<React.SetStateAction<string[] | null>>;
}) => {
  const t = useI18n();

  return (
    <fieldset className="flex flex-col text-white">
      <legend>{t("typeFilter")}</legend>
      <label htmlFor="all">
        <input
          type="checkbox"
          id="all"
          value={"all"}
          checked={selectedType.includes("all")}
          onChange={() => setSelectedType(null)}
        />
        <span className="ml-2">All</span>
      </label>
      <label htmlFor="iphone">
        <input
          type="checkbox"
          id="iphone"
          value={"iphone"}
          checked={selectedType.includes("iphone")}
          onChange={(e) => handleTypeChange(e, setSelectedType)}
        />
        <span className="ml-2">iPhone</span>
      </label>
      <label htmlFor="macbook">
        <input
          type="checkbox"
          id="macbook"
          value={"macbook"}
          checked={selectedType.includes("macbook")}
          onChange={(e) => handleTypeChange(e, setSelectedType)}
        />
        <span className="ml-2">MacBook</span>
      </label>
      <label htmlFor="ipad">
        <input
          type="checkbox"
          id="ipad"
          value={"ipad"}
          checked={selectedType.includes("ipad")}
          onChange={(e) => handleTypeChange(e, setSelectedType)}
        />
        <span className="ml-2">iPad</span>
      </label>
    </fieldset>
  );
};

export default TypeFilter;
