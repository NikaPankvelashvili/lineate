"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const CustomLink = ({
  link,
  children,
}: {
  link: string;
  children: ReactNode;
}) => {
  const pathname = usePathname().split("/")[1];

  return (
    <li className="hover:text-white  ease-in-out duration-300 ">
      <Link
        href={link}
        className={`${pathname == link.split("/")[1] ? "text-white" : ""}`}
      >
        {children}
      </Link>
    </li>
  );
};

export default CustomLink;
