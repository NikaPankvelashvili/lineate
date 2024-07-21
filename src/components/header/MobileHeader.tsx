"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "../../locales/client";
import { useUser } from "@auth0/nextjs-auth0/client";

const MobileHeader = ({ isAdmin }: { isAdmin: boolean | undefined }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const t = useI18n();

  const { user } = useUser();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu}>{isOpen ? "X" : "☰"}</button>
      {isOpen && (
        <div className="min-h-dvh absolute top-[73px] right-0 w-screen dark:bg-dark-primary bg-light-primary">
          <div className="h-[3px] w-full bg-white mt-3"></div>
          <nav className="flex flex-col items-center">
            <Link
              onClick={() => setIsOpen(false)}
              href={"/"}
              className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              {t("home")}
            </Link>
            {/* <Link
              onClick={() => setIsOpen(false)}
              href={"/about"}
              className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              {t("about")}
            </Link> */}
            <Link
              onClick={() => setIsOpen(false)}
              href={"/blog"}
              className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              {t("blog")}
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href={"/product"}
              className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              {t("products")}
            </Link>
            {/* <Link
              onClick={() => setIsOpen(false)}
              href={"/contact"}
              className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              {t("contact")}
            </Link> */}
            {user && (
              <>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/profile"
                  className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
                >
                  {t("profile")}
                </Link>
                {isAdmin && (
                  <Link
                    onClick={() => setIsOpen(false)}
                    href="/admin"
                    className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
                  >
                    {t("admin")}
                  </Link>
                )}
                <button
                  className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
                  onClick={() => {
                    // setIsOpen(false);
                    localStorage.setItem("cart", "[]");
                    window.location.href = "/api/auth/logout";
                  }}
                >
                  {/* <Link
                    onClick={() => {
                      setIsOpen(false);
                      localStorage.setItem("cart", "[]");
                    }}
                    href="/api/auth/logout"
                    // className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
                  > */}
                  {t("logOut")}
                  {/* </Link> */}
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
