import { getBlogs, getUserId } from "@/src/app/api";
import AddNewBlog from "@/src/components/admin/AddNewBlog";
import DeleteBlog from "@/src/components/admin/DeleteBlog";
import EditBlog from "@/src/components/admin/EditBlog";
import { getCurrentLocale, getI18n } from "@/src/locales/server";
import { BlogType } from "@/src/types/blogTypes";
import { LocaleType } from "@/src/types/generalType";
import { User } from "@/src/types/user";
import { IoMdReturnLeft } from "react-icons/io";
import Link from "next/link";
import React from "react";

const AdminBlogsPage = async () => {
  const blogs: BlogType[] = await getBlogs();
  const t = await getI18n();
  const locale: LocaleType = getCurrentLocale();
  const id: number = await getUserId();

  // console.log(blogs[0]?.createdAt);

  return (
    <main className="w-full mx-auto px-[8%] py-20 dark:bg-dark-primary bg-light-primary text-white">
      <h2 className="text-5xl font-semibold mb-20 dark:text-white ">
        <div className="flex justify-center items-center gap-4">
          <Link href={`/admin`} className="cursor-pointer hover:opacity-70">
            <IoMdReturnLeft />
          </Link>
          {t("blog")}
        </div>
      </h2>
      <AddNewBlog user_id={id} />
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("title")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("description")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("author")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("approved")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("createdAt")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                ID
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("edit")}
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: BlogType, index: Number) => (
              <tr
                key={blog.id}
                className={`bg-white dark:${
                  Number(index) % 2
                    ? "dark:bg-dark-secondary bg-light-secondary"
                    : "dark:bg-dark-primary bg-light-primary"
                } rounded-md shadow-md mb-4`}
              >
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  {blog.title[locale]}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  {blog.description[locale].split(" ").length > 20
                    ? blog.description[locale]
                        .split(" ")
                        .slice(0, 20)
                        .join(" ") + "..."
                    : blog.description[locale]}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  <Link href={`/admin/users?search=${blog.user_id}`}>
                    {blog.user_id === id ? "You" : `UserID: ${blog.user_id}`}
                  </Link>
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  {blog.approved ? "✔" : "❌"}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  {blog.createdat?.split("T")[0]}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white ">
                  {blog.id}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  <div className="flex">
                    <EditBlog blogData={blog} />
                    <DeleteBlog id={blog.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminBlogsPage;
