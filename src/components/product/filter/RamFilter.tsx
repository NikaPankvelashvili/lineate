import { getUniqueRam, handleRamChange } from "../utils";
import { Product } from "@/src/types/products";
import cn from "classnames";

const RamFilter = ({
  products,
  selectedRam,
  setSelectedRam,
}: {
  products: Product[];
  selectedRam: number[];
  setSelectedRam: React.Dispatch<React.SetStateAction<number[] | null>>;
}) => {
  return (
    <fieldset className="">
      <legend className="text-white mb-2">Choose RAM</legend>
      <div className="flex flex-wrap gap-2 flex-col">
        {products &&
          getUniqueRam(products).map((ram, index) => {
            const included_ram =
              selectedRam.includes(0) || selectedRam.includes(ram);
            return (
              <button
                key={index}
                value={ram}
                className={cn([
                  "p-1",
                  "rounded",
                  "text-white",
                  "border-gray-400",
                  "bg-[#161617]",
                  included_ram ? "opacity-100" : "opacity-60",
                ])}
                onClick={(e) => handleRamChange(e, setSelectedRam)}
              >
                {`${ram}GB`}
              </button>
            );
          })}
      </div>
    </fieldset>
  );
};

export default RamFilter;
