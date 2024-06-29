import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { GrLanguage } from "react-icons/gr";
import { FaCartShopping } from "react-icons/fa6";
import CustomLink from "./CustomLink";
import DropdownMenu from "@components/dropdowns/DropDown";
import CartIcon from "@components/cart/CartIcon";

const Header = () => {
  return (
    <header className="flex justify-between h-[84px] px-[8%] items-center bg-[#161617] text-white text-opacity-65 text-lg fixed z-10 w-screen top-0 left-0 border-b-2 border-[#fff]">
      <Link href={"/"}>
        <Image src={Logo} alt={"napplet_logo"} width={100} height={50} />
      </Link>
      <div className="flex items-center gap-4">
        <ul className="flex flex-row gap-4 ">
          <CustomLink link={"/products"}>Products</CustomLink>
          <CustomLink link={"/blog"}>Blog</CustomLink>
          <CustomLink link={"/contact"}>Contact</CustomLink>
          {/* <CustomLink link={"/cart"}>Cart</CustomLink> */}
        </ul>
        <span className="text-white">|</span>

        <div className="flex items-center gap-4">
          <GrLanguage className="hover:text-white hover:cursor-pointer" />
          {/* <FaCartShopping className="hover:text-white hover:cursor-pointer" /> */}
          <CartIcon />
          <DropdownMenu />
          {/* <FaRegUser className="hover:text-white hover:cursor-pointer" /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
