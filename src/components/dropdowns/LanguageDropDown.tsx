"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GrLanguage } from "react-icons/gr";
import Link from "next/link";
import { LocaleType } from "@/src/types/generalType";
import { useChangeLocale } from "@/src/locales/client";
// import { useI18n } from "@/locales/client";

const LanguageDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const changeLocale = useChangeLocale();
  // const t = useI18n();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (locale: LocaleType) => {
    changeLocale(locale);
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
          {" "}
          <GrLanguage className="hover:text-white hover:cursor-pointer opacity-65 hover:opacity-100  dark:text-white" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#161617] dark:ring-gray-700"
          >
            <div className="py-1">
              <button
                onClick={() => handleItemClick("en")}
                value={"en"}
                className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#252527b1] dark:hover:text-white"
              >
                English
              </button>
              <button
                onClick={() => handleItemClick("ka")}
                value={"ka"}
                className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#252527b1] dark:hover:text-white"
              >
                ქართული
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageDropDown;
