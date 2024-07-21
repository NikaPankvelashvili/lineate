import Link from "next/link";
import Logo from "@assets/logo.png";
import Image from "next/image";
import CustomLink from "./CustomLink";
import DropdownMenu from "@components/dropdowns/DropDown";
import CartIcon from "@components/header/CartIcon";
import { User } from "@/src/types/user";
import { getCart, getUserInfo } from "@/src/app/api";
import LanguageDropDown from "../dropdowns/LanguageDropDown";
import { getI18n } from "@/src/locales/server";
import { getSession } from "@auth0/nextjs-auth0";
import MobileHeader from "./MobileHeader";
import DarkMode from "./DarkMode";

const Header = async () => {
  const user_server = await getSession();
  const user: User = user_server != null ? await getUserInfo() : null;

  const cart = await getCart();

  const t = await getI18n();

  return (
    <>
      <header className="flex justify-between h-[84px] px-[8%] items-center bg-light-secondary dark:bg-dark-primary text-white text-opacity-65 text-lg sticky z-10 w-full top-0 left-0 border-b-2 border-[#fff]">
        <Link href={"/"}>
          <Image src={Logo} alt={"napplet_logo"} width={100} height={50} />
        </Link>
        <div className="flex items-center gap-4">
          <ul className="flex flex-row gap-4 max-md:hidden">
            <CustomLink link={"/products"}>{t("products")}</CustomLink>
            <CustomLink link={"/blog"}>{t("blog")}</CustomLink>
            {/* <CustomLink link={"/contact"}>{t("contact")}</CustomLink> */}
            {/* <CustomLink link={"/cart"}>Cart</CustomLink> */}
          </ul>
          <span className="text-white">|</span>

          <div className="flex items-center gap-4">
            <LanguageDropDown />
            <DarkMode />
            <CartIcon />
            <DropdownMenu userProp={user} />
          </div>
          <MobileHeader isAdmin={user?.isadmin} />
        </div>
      </header>
    </>
  );
};

export default Header;
