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
      <section className="flex justify-center px-[8%] min-w-96 max-sm:min-w-80">
        <div
          className={`${
            reverse && "flex-row-reverse max-lg:flex-col-reverse"
          }  w-full flex max-lg:flex-col max-mdd: items-center justify-between bg-light-secondary dark:bg-dark-secondary p-[5%] rounded min-h-[500px] `}
        >
          <div
            className={`${
              reverse && "items-end max-lg:items-center max-lg:text-center"
            } w-1/2 h-full justify-around max-lg:w-full max-lg:text-center text-white flex flex-col ${
              reverse
                ? "pl-[5%] max-lg:pl-0 max-lg:pr-0"
                : "pr-[5%] max-lg:pl-0 max-lg:pr-0"
            } `}
          >
            <h2 className="text-5xl max-[500px]:text-3xl">{name}</h2>
            <p
              className={`${
                reverse && "text-end max-lg:text-center"
              } max-lg:w-full w-4/5 max-lg:mt-10 max-lg:mb-10 max-[500px]:text-sm`}
            >
              {description}
            </p>
            <div className="flex gap-3 max-lg:justify-center">
              <Link
                href={`${
                  name === "All Products"
                    ? "/products"
                    : `/products?type=${name.toLocaleLowerCase()}`
                }`}
                className="bg-[#0071e3] text-white rounded-full px-4 py-2 hover:bg-[#0056b3] ease-in-out duration-300 max-[500px]:text-sm max-[500px]:px-2 max-[500px]:py-1"
              >
                {`${
                  name !== "All Products"
                    ? `${t("buy")} ${name}`
                    : `${t("allProducts")}`
                }`}
              </Link>
              <Link
                href={"/blog"}
                className="text-white bg-transparent border border-[#0071e3] rounded-full px-4 py-2 hover:bg-[#0071e3] ease-in-out duration-300 max-[500px]:text-sm max-[500px]:px-2 max-[500px]:py-1"
              >
                {t("learnMore")}
              </Link>
            </div>
          </div>
          <div className="h-full w-[1px] border border-[#fff] max-lg:w-full max-lg:my-5 max-lg:h-[1px]"></div>
          <div className="flex justify-center items-center w-1/2 select-none ">
            <div
              className={`w-full pl-5 pr-5 max-lg:${
                reverse ? "pr-5 pl-0" : "pl-5 pr-0"
              }`}
            >
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
