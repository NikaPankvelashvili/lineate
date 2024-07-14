"use client";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import image1 from "/public/assets/logo.png";
import Image from "next/image";
import { BlogType } from "@/src/types/blogTypes";
import { useCurrentLocale, useI18n } from "@/src/locales/client";
import BlogCard from "./BlogCard";

export default function BlogClient({ blogsData }: { blogsData: BlogType[] }) {
  const [search, setSearch] = useState("");
  const [visibleBlogs, setVisibleBlogs] = useState(4);
  const locale = useCurrentLocale();

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
      <div className="pt-20 flex justify-center items-center">
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
                borderColor: "inherit",
              },
              "&:hover fieldset": {
                borderColor: "inherit",
              },
              "&.Mui-focused fieldset": {
                borderColor: "inherit",
              },
            },
            "& .MuiInputBase-input": {
              color: "inherit",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "inherit",
              opacity: 1,
            },
            "& .MuiFormLabel-root": {
              color: "black",
            },
            "&.Mui-focused .MuiFormLabel-root": {
              color: "black",
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
              className="bg-white dark:bg-gray-800 dark:text-white rounded-l-md"
              {...params}
              label={t("blog")}
            />
          )}
        />
      </div>
      <div className="grid grid-cols-4 px-[4%] justify-between gap-4 pb-5 pt-5 md:grid-cols-1">
        {filteredBlogs?.slice(0, visibleBlogs).map((blog) => (
          <BlogCard key={blog.id} blogData={blog} />
        ))}
      </div>
      {visibleBlogs < filteredBlogs.length && (
        <div className="flex justify-center py-5">
          <button
            onClick={showMoreBlogs}
            className="px-4 py-2 bg-[#11545c] hover:bg-[#11545c] text-white rounded-md "
          >
            {t("learnMore")}
          </button>
        </div>
      )}
    </>
  );
}
