"use client";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import image1 from "/public/assets/techblog.png";
import Image from "next/image";
import { BlogType } from "@/src/types/blogTypes";
import { useCurrentLocale, useI18n } from "@/src/locales/client";
import BlogCard from "./BlogCard";
import { useTheme } from "next-themes";

export default function BlogClient({ blogsData }: { blogsData: BlogType[] }) {
  const [search, setSearch] = useState("");
  const [visibleBlogs, setVisibleBlogs] = useState(4);
  const locale = useCurrentLocale();
  const [isClient, setIsClient] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 4);
  };
  const t = useI18n();

  let filteredBlogs = blogsData?.filter((blog) =>
    blog.title[locale].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="relative w-full h-screen">
        <Image
          src={image1}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      {isClient && (
        <div className="pt-20 px-[8%] flex justify-start items-center">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={blogsData}
            getOptionLabel={(option) => option.title[locale]}
            onChange={(_event, value) => {
              setSearch(value ? value.title[locale] : "");
            }}
            sx={{
              width: 300,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "white",
                opacity: 1,
              },
              "& .MuiFormLabel-root": {
                color: "white",
              },
              "&.Mui-focused .MuiFormLabel-root": {
                color: "white",
              },
              "& .dark .MuiFormLabel-root": {
                color: "white",
              },
              "& .dark.Mui-focused .MuiFormLabel-root": {
                color: "white",
              },
            }}
            renderInput={(params) => (
              <TextField
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white dark:bg-dark-secondary dark:text-white bg-light-secondary rounded-l-md"
                {...params}
                label={t("blog")}
              />
            )}
          />
        </div>
      )}
      <div className="grid grid-cols-4 px-[8%] justify-between gap-4 pb-10 pt-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {filteredBlogs?.slice(0, visibleBlogs).map((blog) => (
          <BlogCard key={blog.id} blogData={blog} />
        ))}
      </div>
      {visibleBlogs < filteredBlogs.length && (
        <div className="flex justify-center py-10">
          <button
            onClick={showMoreBlogs}
            className="px-4 py-2 bg-[#0071e3] hover:bg-[#0056b3] text-white rounded-md "
          >
            {t("seeMore")}
          </button>
        </div>
      )}
    </>
  );
}
