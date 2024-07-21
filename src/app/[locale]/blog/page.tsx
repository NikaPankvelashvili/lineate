import React from "react";
// import AddNewBlog from "@/components/AddNewBlog";
import { unstable_noStore as noStore } from "next/cache";
import { getBlogs } from "../../api";
import BlogClient from "@/src/components/blogs/BlogClient";
import { BlogType } from "@/src/types/blogTypes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Napplet | Blog",
  description:
    "The Napplet Store is the best place to buy Apple products from all around the world. Find the latest iPhones, MacBooks, Apple Watches, and more.",
};

export default async function Blog() {
  const blogsData: BlogType[] = await getBlogs();
  noStore();

  return (
    <main className="bg-light-primary dark:bg-dark-primary">
      <BlogClient blogsData={blogsData} />
    </main>
  );
}
