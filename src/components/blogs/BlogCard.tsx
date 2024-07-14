"use client";
import Image from "next/image";
// import defaulImage from "../public/Teamwork.png";
import Link from "next/link";
import { useCurrentLocale, useI18n } from "@/src/locales/client";
import { BlogType } from "@/src/types/blogTypes";
// import EditBlog from "./EditBlog";
// import { useUser } from "@auth0/nextjs-auth0/client";

export default function Blogs({ blogData }: { blogData: BlogType }) {
  const t = useI18n();
  const locale = useCurrentLocale();
  const date = blogData.createdAt?.split("T")[0];

  return (
    <div
      key={blogData.id}
      className="bg-white dark:bg-slate-800 flex flex-col justify-between p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300   "
    >
      <div className="flex flex-col items-center">
        <Image
          src={blogData.image_url}
          width={200}
          height={200}
          alt="image"
          className="rounded mb-4 object-cover w-[300px] h-[200px]"
        />
        <span>{date}</span>
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center">
          {blogData.title[locale]}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 text-center">
          {`${blogData.description[locale]
            .split(" ")
            .slice(0, 20)
            .join(" ")} ...`}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Link
          href={`/blog/${blogData.id}`}
          className="text-[#003049] hover:text-[#1A5A77] dark:text-[#D3D3D3] dark:hover:text-[#A9A9A9] hover:underline transition duration-200 mt-2"
        >
          {t("learnMore")}
        </Link>
      </div>
    </div>
  );
}
