"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { CartContextType, CartProductType } from "../types/cartTypes";
import { useUser } from "@auth0/nextjs-auth0/client";
import { handleAddToCartDB } from "../app/actions";
import { mergeCarts } from "./utils/utils";

export const CartContext = createContext<CartContextType>({
  products: [],
  setProducts: () => {},
});

export const CartProvider = ({
  children,
  products,
}: {
  children: ReactNode;
  products: CartProductType[];
}) => {
  const [cartProducts, setCartProducts] = useState<CartProductType[]>(products);
  // const [isClient, setIsClient] = useState(false);

  const user = useUser();
  // const fetchedCart = await getCart();

  useEffect(() => {
    if (user.isLoading) return;

    if (!user.user) {
      setCartProducts(JSON.parse(localStorage.getItem("cart") || "[]"));
      return;
    }

    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (localCart.length === 0) {
      setCartProducts(products);
    } else {
      setCartProducts(mergeCarts({ fetchedCart: products, localCart }));
      localStorage.removeItem("cart");
    }

    return;
  }, [user.isLoading]);

  useEffect(() => {
    const updateCart = async () => {
      if (user.isLoading) return;

      if (!user.user) {
        localStorage.setItem("cart", JSON.stringify(cartProducts));
        return;
      }

      console.log("cartProducts", cartProducts);
      await handleAddToCartDB(cartProducts);
    };

    updateCart();
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{
        products: cartProducts,
        setProducts: setCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
