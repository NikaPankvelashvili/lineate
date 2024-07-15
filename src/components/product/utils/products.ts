import { Color, Product } from "@/src/types/products";

// unique getters

export function getUniqueColors(products: Product[]): Color[] {
  const colorNameSet: Set<String> = new Set();
  const colorSet: Set<Color> = new Set();

  products.forEach((product) => {
    product.colors.forEach((color) => {
      if (!colorNameSet.has(color.colorName)) {
        colorNameSet.add(color.colorName);
        colorSet.add(color);
      }
    });
  });

  return Array.from(colorSet);
}

export function getUniqueRam(products: Product[]): number[] {
  const ramSet: Set<number> = new Set();

  products.forEach((product) => {
    product.ram?.forEach((ram) => {
      ramSet.add(ram);
    });
  });

  const uniqueRamArray = Array.from(ramSet).sort((a, b) => a - b);

  return uniqueRamArray;
}


export function getUniqueMemories(products: Product[]): number[] {
  const memorySet: Set<number> = new Set();

  products.forEach((product) => {
    product.memories.forEach((memory) => {
      memorySet.add(memory);
    });
  });

  const uniqueMemoryArray = Array.from(memorySet).sort((a, b) => a - b);

  return uniqueMemoryArray;
}


// change handlers

export function handleTypeChange(
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedType: React.Dispatch<React.SetStateAction<string[] | null>>
) {
  const { value, checked } = event.target;

  setSelectedType((selectedType) => {
    if (checked && selectedType) {
      let updatedType = selectedType.filter((type) => type !== "all");
      return [...updatedType, value];
    } else if (selectedType) {
      let updatedType = selectedType.filter((type) => type !== value);
      return updatedType.length === 0 ? null : updatedType;
    }
    return selectedType; 
  });
}


export  function handleColorChange(
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setSelectedColor: React.Dispatch<React.SetStateAction<string[] | null>>
) {
  setSelectedColor((selectedColor) => {
    const { value } = event.currentTarget;
    if (selectedColor && selectedColor.includes(value)) {
      const updatedColor = selectedColor.filter((c) => c !== value);
      return updatedColor.length === 0 ? null : updatedColor;
    } else if (selectedColor) return [...selectedColor.filter((color) => color != "all"), value];
    return selectedColor;
  });
}


export function handleRamChange(
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setSelectedRam: React.Dispatch<React.SetStateAction<number[] | null>>
) {
  setSelectedRam((selectedRam) => {
    const { value } = event.currentTarget;
    if (selectedRam && selectedRam.includes(parseInt(value))) {
      const updatedRam = selectedRam.filter((ram) => ram !== parseInt(value));
      return updatedRam.length === 0 ? null : updatedRam;
    } else if (selectedRam) return [...selectedRam.filter((ram) => ram != 0), parseInt(value)];
    return selectedRam;
  });
}


export function handleMemoryChange(
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setSelectedMemory: React.Dispatch<React.SetStateAction<number[] | null>>
) {
  setSelectedMemory((selectedMemory) => {
    const { value } = event.currentTarget;
    if (selectedMemory && selectedMemory.includes(parseInt(value))) {
      const updatedMemory = selectedMemory.filter((m) => m !== parseInt(value));
      return updatedMemory.length === 0 ? null : updatedMemory;
    } else if (selectedMemory) return [...selectedMemory.filter((memory) => memory != 0), parseInt(value)];
    return selectedMemory;
  });
}

// mappers

export function mapMemoryToString(memory: number): string {
  return memory % 1024 === 0 ? `${memory/1024}TB` : `${memory}GB`;
}


// filters
export function filterByType(products: Product[], selectedType: string[] | null): Product[] {
  return selectedType ? products.filter((product) => selectedType.includes("all") || selectedType.includes(product.type)) : products;
}

 function filterByColor(products: Product[], selectedColors: string[] | null): Product[] {
  return selectedColors ? products.filter((product) => selectedColors.includes("all") || product.colors.some((c) => selectedColors.includes(c.colorName))) : products;
}

 function filterByRam(products: Product[], selectedRam: number[] | null): Product[] {
  return selectedRam ? products.filter((product) => selectedRam.includes(0) ? true : product.ram.some((ram) => selectedRam.includes(ram))) : products;
}

 function filterByMemory(products: Product[], selectedMemory: number[] | null): Product[] {
  return selectedMemory ? products.filter((product) => selectedMemory.includes(0) ? true : product.memories.some((memory) => selectedMemory.includes(memory))) : products;
}

 function filterByPice(products: Product[], minPrice: number, maxPrice: number): Product[] {
  return products.filter((product) => (minPrice === -1 || product.price >= minPrice) && (maxPrice === -1 || product.price <= maxPrice));
}

 function filterBySearchTerm(products: Product[], searchTerm: string): Product[] {
  return products.filter((product) => product.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
}

// sorters

 function sortProducts(products: Product[], priceSort: string): Product[] {
  return products.sort((a, b) => priceSort === "asc" ? a.price - b.price : priceSort === "desc" ? b.price - a.price : 0);
}


export function handleChangedFilters(
  products: Product[],
  selectedType: string[] | null,
  selectedColors: string[] | null,
  selectedRam: number[] | null,
  selectedMemory: number[] | null,
  minPrice: number,
  maxPrice: number,
  priceSort: string,
  searchTerm: string
): Product[] {
  return sortProducts(
    filterByPice(
      filterByMemory(
        filterByRam(
          filterByColor(
            filterByType(
              filterBySearchTerm(products, searchTerm),
              selectedType
            ),
            selectedColors
          ),
          selectedRam
        ),
        selectedMemory
      ),
      minPrice,
      maxPrice
    ),
    priceSort
  );
}