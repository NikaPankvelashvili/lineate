import { CartContextType } from "@/src/types/cartTypes";

export const calculateTotalPrice = ({cartContext}: {cartContext: CartContextType}) => {
  return cartContext.products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
};