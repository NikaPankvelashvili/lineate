import { Product } from "@/src/types/products";
import {
  getUniqueMemories,
  handleMemoryChange,
  mapMemoryToString,
} from "../utils/products";
import cn from "classnames";
import { useI18n } from "@/src/locales/client";

const MemoryFilter = ({
  products,
  selectedMemory,
  setSelectedMemory,
}: {
  products: Product[];
  selectedMemory: number[];
  setSelectedMemory: React.Dispatch<React.SetStateAction<number[] | null>>;
}) => {
  const t = useI18n();

  return (
    <fieldset>
      <legend className="text-white mb-2">{t("memoryFilter")}</legend>
      <div className="flex flex-wrap gap-2 flex-col">
        {products &&
          getUniqueMemories(products).map((memory, index) => {
            const included_memory =
              selectedMemory.includes(0) || selectedMemory.includes(memory);
            return (
              <button
                key={index}
                onClick={(e) => handleMemoryChange(e, setSelectedMemory)}
                value={memory}
                className={cn([
                  "p-1",
                  "rounded",
                  "text-white",
                  "dark:bg-dark-primary",
                  "bg-light-primary",
                  included_memory ? "opacity-100" : "opacity-60",
                ])}
              >
                {mapMemoryToString(memory)}
              </button>
            );
          })}
      </div>
    </fieldset>
  );
};

export default MemoryFilter;
