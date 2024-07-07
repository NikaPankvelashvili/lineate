import { Product } from "@/src/types/products";
import {
  getUniqueMemories,
  handleMemoryChange,
  mapMemoryToString,
} from "../utils";
import cn from "classnames";

const MemoryFilter = ({
  products,
  selectedMemory,
  setSelectedMemory,
}: {
  products: Product[];
  selectedMemory: number[];
  setSelectedMemory: React.Dispatch<React.SetStateAction<number[] | null>>;
}) => {
  return (
    <fieldset>
      <legend className="text-white mb-2">Choose Memory</legend>
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
                  "bg-[#161617]",
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
