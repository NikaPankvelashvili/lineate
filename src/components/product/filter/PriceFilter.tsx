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
    <fieldset className="text-white">
      <legend className="mb-2">{t("priceFilter")}</legend>
      <div className="flex flex-col sm:flex-row justify-between w-full items-center mt-3">
        <div className="p-3 dark:bg-dark-primary bg-[#ffffff] relative rounded-lg flex content-between text-xs w-full sm:w-1/2 mb-3 sm:mb-0">
          <input
            type="number"
            className="focus:outline-none w-full bg-inherit dark:text-white text-black"
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
        <div className="p-3 dark:bg-dark-primary bg-[#ffffff] relative rounded-lg flex content-between text-xs w-full sm:w-1/2">
          <input
            type="number"
            className="focus:outline-none w-full bg-inherit dark:text-white text-black"
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
