import React from "react";
// import AddNewBlog from "@/components/AddNewBlog";
import { unstable_noStore as noStore } from "next/cache";
import { getBlogs } from "../../api";
import BlogClient from "@/src/components/blogs/BlogClient";
import { BlogType } from "@/src/types/blogTypes";

export const metadata = {
  title: "Blog",
  description: "Blog by Next",
};

export default async function Blog() {
  const blogsData: BlogType[] = await getBlogs();
  noStore();

  return (
    <main className="bg-[#adb5bd] dark:bg-slate-900">
      <BlogClient blogsData={blogsData} />
    </main>
  );
}
