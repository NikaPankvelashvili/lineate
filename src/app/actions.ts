"use server";

import { revalidatePath } from "next/cache";
import { CartProductType } from "../types/cartTypes";
import { getUserId } from "./api";
import { redirect } from "next/navigation";
import { User } from "../types/user";

export const handleAddToCartDB = async (products: CartProductType[]) => {
  "use server";
  
  const userId = await getUserId();


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


export const checkout = async (filteredProducts: CartProductType[],
  user: User) => {
  await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ products: filteredProducts, user }),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if (response.url) {
        redirect(response.url);
      }
    });
};