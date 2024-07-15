import { StaticImageData } from "next/image";

export interface ProductImage{
  id: number;
  url: string;
  color: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  photos: ProductImage[];
  colors: Color[];
  memories: number[];
  ram: number[];
  type: ProductType;
}

export interface FeaturedProductProps {
  name: string;
  description: string;
  image: StaticImageData;
  reverse?: boolean;
}

export interface Color{
  colorName: string;
  colorCode: string;
}


export type ProductType = "iphone" | "macbook" | "ipad" | "watch";
export type PriceSort = "asc" | "desc" | "default";


export interface AddProductType {
  title: string;
  description: string;
  price: number;
  stock: number;
  type: ProductType;
  colors: Color[];
  memories: number[];
  ram: number[];
  photos: ProductImage[];
}