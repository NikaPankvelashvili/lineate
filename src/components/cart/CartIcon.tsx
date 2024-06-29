import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

const CartIcon = () => {
  return (
    <Link
      href={"/cart"}
      className=" relative hover:text-white hover:cursor-pointer"
    >
      <FaCartShopping className="" />
      <div className=" absolute top-[-10px] right-[-10px] rounded-full bg-[#0071e3] text-white text-[10px] leading-4 text-x py-[1px] px-[6px]">
        5
      </div>
    </Link>
  );
};

export default CartIcon;
