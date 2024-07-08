"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { useI18n } from "@/src/locales/client";

const DropdownMenu = ({ image_url }: any) => {
  const session = useUser();
  const user = session?.user;
  const isAdmin =
    user && Array.isArray(user.role) && user.role.includes("admin");

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useI18n();

  const toggleDropdown = () => {
    if (!user) {
      window.location.href = "/api/auth/login";
    } else {
      setIsOpen(!isOpen);
    }
  };
  const handleItemClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown relative inline-block text-left" ref={dropdownRef}>
      <div className="flex justify-center">
        <button
          type="button"
          className="text-opacity-65"
          onClick={toggleDropdown}
        >
          {user ? (
            <div className="w-6 h-6">
              <Image
                className="hover:text-white hover:cursor-pointer opacity-65 hover:opacity-100 rounded-full dark:text-white"
                src={image_url}
                alt="profile picture"
                width={32}
                height={32}
              />
            </div>
          ) : (
            <FaRegUser className="hover:text-white hover:cursor-pointer opacity-65 hover:opacity-100  dark:text-white" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#161617] dark:ring-gray-700"
          >
            <div className="py-1">
              <Link
                onClick={handleItemClick}
                href={"/profile"}
                className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#252527b1] dark:hover:text-white"
              >
                {t("profile")}
              </Link>

              {/* {isAdmin && (
                <Link
                  href="/admin"
                  onClick={handleItemClick}
                  className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {"admin"}
                </Link>
              )} */}
              <Link
                onClick={handleItemClick}
                href={"/profile/orders"}
                className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#252527b1] dark:hover:text-white"
              >
                {t("myOrders")}
              </Link>
              <Link
                onClick={handleItemClick}
                href={"/profile/reviews"}
                className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#252527b1] dark:hover:text-white"
              >
                {t("myReviews")}
              </Link>
              <button
                onClick={handleItemClick}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#252527b1] dark:hover:text-white"
              >
                <a href={"/api/auth/logout"}>{t("logOut")}</a>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
