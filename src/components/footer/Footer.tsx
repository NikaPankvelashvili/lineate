import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import { BiLogoFacebookCircle } from "react-icons/bi";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-[#161617e8] px-[8%] py-14">
      <div className="flex items-center  justify-between mb-14">
        <Image src={Logo} width={140} height={28} alt="logo" />
        <nav className="text-[#fff] flex gap-6">
          <Link href={"/"}>Home</Link>
          <Link href={"/blog"}>Blog</Link>
          <Link href={"/about"}>About Us</Link>
          <Link href={"/contact"}>Contact Us</Link>
          <Link href={"/privacy"}>Privacy Policy</Link>
        </nav>
      </div>
      <div className="w-full py-14 px-20 bg-[#161617] flex items-baseline justify-between mb-12 ">
        <p className="font-bold text-[#fff] leading-10 text-4xl w-full ">
          Subscribe to our news letter to get latest updates and news
        </p>
        <form className="flex items-center w-full pl-16">
          <input
            type="email"
            placeholder="Enter Your Email"
            style={{ backgroundColor: "transparent" }}
            className="py-4 px-5 text-medium_grey border border-[#4C4C4C] font-normal outline-none w-full"
          />
          <button className="ml-6 h-14 w-44 bg-[#0071e3] text-white bg- font-bold hover:opacity-90 ease-in-out">
            Subscribe
          </button>
        </form>
      </div>
      <div className="flex items-center justify-between">
        <div className=" font-normal text-md text-[#fff]">
          <p>Finstreet 118 2561 Fintown</p>
          <p>Hello@napplet.com 020 7993 2905</p>
        </div>
        <div className="flex gap-4 text-[#0071e3] text-xl">
          <a
            href="https://www.facebook.com/"
            rel="noopener noreferrer"
            target={"_blank"}
            className=""
          >
            <BiLogoFacebookCircle />
          </a>
          <a
            href="https://www.twitter.com/"
            rel="noopener noreferrer"
            target={"_blank"}
            className=""
          >
            <AiOutlineTwitter />
          </a>
          <a
            href="https://www.instagram.com/"
            rel="noopener noreferrer"
            target={"_blank"}
            className=""
          >
            <AiOutlineInstagram />
          </a>
          <a
            href="https://www.linkedin.com/"
            rel="noopener noreferrer"
            target={"_blank"}
          >
            <AiFillLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
