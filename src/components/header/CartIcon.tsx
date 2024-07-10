"use client";

import { CartContext } from "@/src/providers/CartContext";
import { CartContextType } from "@/src/types/cartTypes";
import Link from "next/link";
import { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";

const CartIcon = () => {
  const cartContext: CartContextType = useContext(CartContext);

  return (
    <Link
      href={"/cart"}
      className=" relative hover:text-white hover:cursor-pointer"
    >
      <FaCartShopping className="" />
      {cartContext &&
        cartContext.products &&
        cartContext.products.length > 0 && (
          <div className=" absolute top-[-10px] right-[-10px] rounded-full bg-[#0071e3] text-white text-[10px] leading-4 text-x py-[1px] px-[6px]">
            {cartContext.products.reduce(
              (total, product) => total + product.quantity,
              0
            )}
          </div>
        )}
    </Link>
  );
};

export default CartIcon;
