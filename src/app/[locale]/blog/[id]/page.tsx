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
    title: `${blog.title[locale]}`,
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
    <>
      <div
        className="relative w-full h-screen bg-no-repeat mb-[151px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${blogDetail.image_url})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white p-4 flex items-center justify-center text-center w-1/2">
            <h1 className="text-4xl font-bold">{blogDetail.title[locale]}</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto px-[4%] shadow-md rounded-lg">
        {/* <ShareOnSocials product={blogDetail} /> */}
        <h1 className="text-4xl font-bold mb-4 text-[#003049] dark:text-white px-10 dark:opacity-70 text-center">
          {blogDetail?.title[locale]}
        </h1>
        <p className="text-lg dark:text-gray-400  text-[#003049] column-container">
          {blogDetail.description[locale]}
        </p>
      </div>
      <section className="px-[4%] my-10">
        {/* <Title titleName={"Similar Blogs Title"} /> */}
        <div className="flex justify-end mb-3">
          <Link
            href="/blog"
            className="bg-[#11545c] hover:bg-[#11545c] text-white py-2 px-6 rounded font-bold  transition-colors duration-300"
          >
            {"See All"}
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-8 sm:grid-cols-1">
          {blogs
            .filter((blog) => blog.id !== blogDetail.id)
            .slice(0, 4)
            .map((blog) => {
              const date = blog.createdAt?.split("T")[0];

              return (
                <div
                  key={blog.id}
                  className="bg-white dark:bg-slate-800 flex flex-col justify-between p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center">
                    <Image
                      src={blog.image_url}
                      width={200}
                      height={200}
                      alt="image"
                      className="rounded mb-4 object-cover w-[300px] h-[200px]"
                    />
                    <span>{date}</span>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center">
                      {blog.title[locale]}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 text-center">
                      {`${blog.description[locale]
                        .split(" ")
                        .slice(0, 20)
                        .join(" ")} ...`}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Link
                      href={`/blog/${blog.id}`}
                      className="text-[#003049] hover:text-[#1A5A77] dark:text-[#D3D3D3] dark:hover:text-[#A9A9A9] hover:underline transition duration-200 mt-2"
                    >
                      {t("learnMore")}
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}
