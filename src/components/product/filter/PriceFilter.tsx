import { useI18n } from "@/src/locales/client";

const PriceFilter = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: {
  minPrice: number;
  maxPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number | null>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const t = useI18n();

  return (
    <fieldset>
      <legend className="text-white">{t("priceFilter")}</legend>
      <div className="flex justify-between w-full items-center mt-3">
        <div className="p-3 bg-[#161617]  relative rounded-lg flex content-between text-xs max-lg:w-1/2 ">
          <input
            type="number"
            className="focus:outline-none w-full bg-inherit text-white"
            placeholder={t("from")}
            min={0}
            value={minPrice > -1 ? minPrice : ""}
            onChange={(e) => {
              e.target.value
                ? setMinPrice(parseInt(e.target.value))
                : setMinPrice(null);
            }}
          />
        </div>
        <span className="mx-3 text-[#8C929B] select-none">{"-"}</span>
        <div className="p-3 bg-[#161617] relative rounded-lg flex content-between text-xs max-lg:w-1/2">
          <input
            type="number"
            className="focus:outline-none w-full bg-inherit text-white"
            placeholder={t("to")}
            min={minPrice}
            value={maxPrice > -1 ? maxPrice : ""}
            onChange={(e) => {
              e.target.value
                ? setMaxPrice(parseInt(e.target.value))
                : setMaxPrice(null);
            }}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default PriceFilter;
