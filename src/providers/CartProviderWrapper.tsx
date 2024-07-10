import { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { getCart } from "../app/api";

const CartProviderWrapper = async ({ children }: { children: ReactNode }) => {
  const products = await getCart();

  return <CartProvider products={products}>{children}</CartProvider>;
};

export default CartProviderWrapper;
