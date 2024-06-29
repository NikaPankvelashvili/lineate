import Image from "next/image";
import MacImage from "@/public/assets/macbook_pro.png";
import Link from "next/link";

const FeaturedProduct = () => {
  return (
    <section className="flex justify-center  px-[8%] min-w-96 ">
      <div className=" w-full flex justify-between bg-[#2b2b2c] p-[5%] rounded">
        <div className="w-1/2 text-white flex flex-col justify-around pr-[5%]">
          <h2 className="text-5xl">MacBook Pro</h2>
          <p>
            The MacBook Pro is a powerful and versatile laptop designed by Apple
            Inc. It features a sleek design, high-performance hardware, and a
            range of advanced features.
          </p>
          <div className="flex gap-3">
            <Link
              href={"/products"}
              className="bg-[#0071e3] rounded-full px-4 py-2 hover:bg-[#0056b3] ease-in-out duration-300"
            >
              Buy MacBook
            </Link>
            <Link
              href={"/products"}
              className=" bg-transparent border border-[#0071e3] rounded-full px-4 py-2 hover:bg-[#0071e3] ease-in-out duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="h-full w-[1px] border border-[#fff]"></div>
        <div className="flex justify-center items-center w-1/2 ">
          <div className="w-full px-20">
            <Image
              src={MacImage}
              alt="macbook_pro"
              width={1080}
              height={1080}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
