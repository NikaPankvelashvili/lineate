"use client";

import { CartContext } from "@/src/providers/CartContext";
import { CartContextType } from "@/src/types/cartTypes";
import { useUser } from "@auth0/nextjs-auth0/client";
import { parseAsString, useQueryState } from "nuqs";
import { useContext, useEffect, useState } from "react";

const OrdersClient = () => {
  const { user, isLoading } = useUser(); // Changed to destructure isLoading
  const [status, setStatus] = useQueryState("status", parseAsString);
  const cartContext: CartContextType = useContext(CartContext);
  const [productsCleared, setProductsCleared] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsClient(true);
    }
  }, [isLoading]); // Changed user.isLoading to isLoading

  useEffect(() => {
    if (!isClient) return;
    const dealWithOrderStatus = (status: string | null) => {
      if (isLoading || !status || productsCleared) return; // Changed user.isLoading to isLoading
      if (status === "success" && !productsCleared) {
        console.log("Order status success, clearing products"); // Added logging
        cartContext.setProducts([]);
        setProductsCleared(true); // Mark products as cleared to prevent re-renders
        // SUCCESSFULLY CLEARED ALERT
        setStatus(null); // If needed, reset status after clearing products
      } else if (status === "failed") {
        console.log("Order status failed"); // Added logging
        // FAILED ALERT
        // setStatus(null); // If needed, reset status after failed alert
      }
    };

    dealWithOrderStatus(status);
  }, [status, isLoading, productsCleared, cartContext, isClient]); // Changed user.isLoading to isLoading

  return null;
};

export default OrdersClient;
