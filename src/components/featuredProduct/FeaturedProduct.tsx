import Image from "next/image";
import Link from "next/link";
import Island from "@components/island/Island";
import { FeaturedProductProps } from "@/src/types/products";
import { getI18n } from "@/src/locales/server";

const FeaturedProduct = async ({
  name,
  description,
  image,
  reverse,
}: FeaturedProductProps) => {
  const t = await getI18n();

  return (
    <>
      <section className="flex justify-center  px-[8%] min-w-96">
        <div
          className={`${
            reverse && "flex-row-reverse"
          }  w-full flex justify-between bg-[#2b2b2c] p-[5%] rounded min-h-[500px]`}
        >
          <div
            className={`${
              reverse && "items-end"
            } w-1/2 text-white flex flex-col justify-around pr-[5%]`}
          >
            <h2 className="text-5xl">{name}</h2>
            <p className={`${reverse && "text-end"} w-4/5`}>{description}</p>
            <div className="flex gap-3">
              <Link
                href={`${
                  name === "All Products"
                    ? "/products"
                    : `/products?type=${name.toLocaleLowerCase()}`
                }`}
                className="bg-[#0071e3] rounded-full px-4 py-2 hover:bg-[#0056b3] ease-in-out duration-300"
              >
                {`${
                  name !== "All Products"
                    ? `${t("buy")} ${name}`
                    : `${t("allProducts")}`
                }`}
              </Link>
              <Link
                href={"/blog"}
                className=" bg-transparent border border-[#0071e3] rounded-full px-4 py-2 hover:bg-[#0071e3] ease-in-out duration-300"
              >
                {t("learnMore")}
              </Link>
            </div>
          </div>
          <div className="h-full w-[1px] border border-[#fff]"></div>
          <div className="flex justify-center items-center w-1/2 select-none ">
            <div className="w-full px-20">
              <Image src={image} alt={`${image}`} width={1080} height={1080} />
            </div>
          </div>
        </div>
      </section>
      <Island />
    </>
  );
};

export default FeaturedProduct;
