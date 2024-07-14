import { getBlogs, getUserId } from "@/src/app/api";
import AddNewBlog from "@/src/components/admin/AddNewBlog";
import DeleteBlog from "@/src/components/admin/DeleteBlog";
import EditBlog from "@/src/components/admin/EditBlog";
import { getCurrentLocale, getI18n } from "@/src/locales/server";
import { BlogType } from "@/src/types/blogTypes";
import { LocaleType } from "@/src/types/generalType";
import { User } from "@/src/types/user";
import React from "react";

const AdminBlogsPage = async () => {
  const blogs: BlogType[] = await getBlogs();
  const t = await getI18n();
  const locale: LocaleType = getCurrentLocale();
  const id: number = await getUserId();

  return (
    <div>
      <h1>{t("blogs")}</h1>
      {blogs.length === 0 && <div>{"noBlogs"}</div>}
      <AddNewBlog user_id={id} />
      <div className="flex flex-col gap-5">
        {blogs.map((blog) => {
          return (
            <div key={blog.id} className="">
              <div>{blog.title[locale]}</div>
              <div>{blog.description[locale]}</div>
              <div>{blog.user_id}</div>
              <DeleteBlog id={blog.id} />
              <EditBlog blogData={blog} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminBlogsPage;
