import { getBlogDetail, getBlogs } from "@src/app/api";
// import { PostData } from "@/app/interface";
// import ShareOnSocials from "@/components/ShareOnSocials";
// import Title from "@/components/Title";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { getI18n } from "@/src/locales/server";
import { BlogType } from "@/src/types/blogTypes";
import { getCurrentLocale } from "@/src/locales/server";
import ShareSocials from "@/src/components/blogs/ShareSocials";
import BlogCard from "@/src/components/blogs/BlogCard";
// import ShareSocials from "@/src/components/blogs/ShareSocials";

interface ProductsDetailsProps {
  params: {
    id: number;
    locale: string;
  };
}

export async function generateMetadata({ params }: ProductsDetailsProps) {
  const blogData = await getBlogs();
  const blog = blogData?.find((blog: BlogType) => blog.id == params.id);
  const locale = getCurrentLocale();

  return {
    title: `BLOG | ${blog.title[locale]}`,
    description: `${blog.description[locale]}`,
  };
}

export default async function BlogDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const blogDetail = await getBlogDetail(id);
  const blogs: BlogType[] = await getBlogs();
  noStore();

  const t = await getI18n();
  const locale = getCurrentLocale();

  return (
    <main className="dark:bg-dark-primary bg-light-primary">
      <div
        className="relative w-full h-screen bg-no-repeat mb-[151px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${blogDetail.image_url})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white p-4 flex items-center justify-center text-center w-1/2">
            <h1 className="text-4xl font-bold mb-4x">
              {blogDetail.title[locale]}
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-auto px-[8%] dark:bg-dark-primary bg-light-primary shadow-md shadow-white rounded-lg pb-20">
        <h1 className="text-4xl font-bold py-16 text-[white] dark:text-white px-10 text-center">
          {blogDetail?.title[locale]}
        </h1>
        <p className="text-lg dark:text-white-400 min-h-48 text-[white] column-container pb-20 columns-2 max-md:columns-1 gap-x-24">
          {blogDetail.description[locale]}
        </p>
        <ShareSocials product={blogDetail} />
      </div>
      <section className="px-[4%] py-10">
        {/* <Title titleName={"Similar Blogs Title"} /> */}
        <div className="flex justify-center text-white py-24">
          <h4 className="text-5xl">Similar Blogs</h4>
        </div>
        <div className="flex justify-end mb-3">
          <Link
            href="/blog"
            className="bg-[#0071e3] hover:bg-[#0056b3] text-white py-2 px-6 rounded font-bold  transition-colors duration-300"
          >
            {"See All"}
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-8 max-sm:grid-cols-1">
          {blogs
            .filter((blog) => blog.id !== blogDetail.id)
            .slice(0, 4)
            .map((blog, index) => {
              return <BlogCard key={index} blogData={blog} />;
            })}
        </div>
      </section>
    </main>
  );
}
