"use server";

import { revalidatePath } from "next/cache";
import { CartProductType } from "../types/cartTypes";
import { getUserId } from "./api";

export const handleAddToCartDB = async (products: CartProductType[]) => {
  "use server";
  
  // console.log("actions product", products)
  const userId = await getUserId();
  // console.log("actions userId", userId)


  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/add-products-to-cart`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          products,
        }),
      }
    );
    revalidatePath("/cart");

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};