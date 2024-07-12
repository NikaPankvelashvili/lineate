"use client";

import { CartContext } from "@/src/providers/CartContext";
import { CartContextType } from "@/src/types/cartTypes";
import { useUser } from "@auth0/nextjs-auth0/client";
import { parseAsString, useQueryState } from "nuqs";
import { useContext, useEffect, useState } from "react";

const OrdersClient = () => {
  const user = useUser();
  const [status, setStatus] = useQueryState("status", parseAsString);
  const cartContext: CartContextType = useContext(CartContext);
  const [productsCleared, setProductsCleared] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!user.isLoading) {
      setIsClient(true);
    }
  }, [user.isLoading]);

  useEffect(() => {
    if (!isClient) return;
    const dealWithOrderStatus = (status: string | null) => {
      if (user.isLoading || !status || productsCleared) return;
      if (status === "success" && !productsCleared) {
        cartContext.setProducts([]);
        setProductsCleared(true); // Mark products as cleared to prevent re-renders
        // SUCCESSFULLY CLEARED ALERT
        setStatus(null); // If needed, reset status after clearing products
      } else if (status === "failed") {
        // FAILED ALERT
        // setStatus(null); // If needed, reset status after failed alert
      }
    };

    dealWithOrderStatus(status);
  }, [status, user.isLoading, productsCleared, cartContext]);

  return null;
};

export default OrdersClient;
