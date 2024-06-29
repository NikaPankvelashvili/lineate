import ParallaxImage from "@components/parallax/ParallaxImage";
import { getProducts } from "./api";
import Island from "@components/island/Island";
import FeaturedProduct from "@components/featuredProduct/FeaturedProduct";

export default async function Home() {
  // const products = await getProducts();

  return (
    <div className="bg-[#161617]">
      <ParallaxImage />
      <Island />
      <FeaturedProduct />
      <Island />
    </div>
  );
}
