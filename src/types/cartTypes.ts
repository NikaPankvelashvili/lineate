import { Color, Product } from "./products";

export interface CartContextType {
  products: CartProductType[],
  setProducts: (products: CartProductType[]) => void,
}

export interface CartProductType {
  id: number,
  title: string,
  price: number,
  memory: number,
  ram: number,
  color: Color,
  quantity: number,
  image_url: string,
}