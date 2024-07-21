"use client";
import Image from "next/image";
// import defaulImage from "../public/Teamwork.png";
import Link from "next/link";
import { useCurrentLocale, useI18n } from "@/src/locales/client";
import { BlogType } from "@/src/types/blogTypes";
import { useRouter } from "next/navigation";
// import EditBlog from "./EditBlog";
// import { useUser } from "@auth0/nextjs-auth0/client";

export default function Blogs({ blogData }: { blogData: BlogType }) {
  const t = useI18n();
  const locale = useCurrentLocale();
  const date = blogData.createdat?.split("T")[0];
  const router = useRouter();

  return (
    <div
      key={blogData.id}
      onClick={() => router.push(`/blog/${blogData.id}`)}
      className="bg-white text-white dark:bg-dark-secondary bg-light-secondary flex flex-col justify-between cursor-pointer rounded-lg shadow hover:shadow-lg transition-shadow duration-300   "
    >
      <div className="flex flex-col items-center">
        <Image
          src={blogData.image_url}
          width={200}
          height={200}
          alt="image"
          className="rounded mb-4 object-cover w-full h-[200px]"
        />
        <h3 className="text-lg px-6 font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center min-h-16 flex items-stretch">
          {blogData.title[locale]}
        </h3>
        <p className="text-sm px-6 text-gray-700 dark:text-gray-300 mb-4 text-center">
          {`
          ${
            blogData.description[locale].split(" ").length > 20
              ? `${blogData.description[locale]
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")} ...`
              : blogData.description[locale]
          }
                `}
        </p>
      </div>
      <div className="flex px-6 pb-6 flex-col items-center justify-between">
        <span className="pt-6 px-6 dark:text-white mb-2">{date}</span>
        <Link
          href={`/blog/${blogData.id}`}
          className=" text-[#D3D3D3] hover:text-[#A9A9A9] hover:underline transition duration-200 mt-2"
        >
          {t("learnMore")}
        </Link>
      </div>
    </div>
  );
}
