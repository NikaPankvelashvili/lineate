import ParallaxImage from "@components/parallax/ParallaxImage";
import { getProducts } from "./api";
import FeaturedProduct from "@components/featuredProduct/FeaturedProduct";
import MacImage from "@assets/macbook_pro.png";
import IPhoneImage from "@assets/iphone.png";
import AppleWatchImage from "@assets/watch.png";
import AllProductsImage from "@assets/all_products.png";

export default async function Home() {
  // const products = await getProducts();

  return (
    <div className="bg-[#161617]">
      <ParallaxImage
        image="https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/tile/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.landing-big_2x.jpg"
        phrase="So Pro."
      />
      <FeaturedProduct
        name="iPhone"
        description="The iPhone is a revolutionary smartphone developed by Apple Inc. It offers a seamless mobile experience with its powerful performance, stunning display, and advanced camera system."
        image={IPhoneImage}
      />
      <ParallaxImage
        image="https://www.livemint.com/lm-img/img/2023/10/31/1600x900/Apple-MacBook_1698725804796_1698725804977.jpg"
        secondary={true}
        phrase="So Light."
      />
      <FeaturedProduct
        name="MacBook"
        description="The MacBook is a sleek and powerful laptop designed by Apple Inc. It offers a seamless computing experience with its high-resolution Retina display, fast processors, and long battery life."
        image={MacImage}
        reverse={true}
      />
      <ParallaxImage
        image="https://www.apple.com/au/watch/images/overview/welcome/startframe__xspkedg7rsiu_xlarge.jpg"
        secondary={true}
        phrase="So Cool."
      />
      <FeaturedProduct
        name="Apple Watch"
        description="The Apple Watch is a smartwatch developed by Apple Inc. It is the perfect accessory for staying connected and active with its sleek design, customizable watch faces, and advanced health and fitness tracking capabilities."
        image={AppleWatchImage}
      />
      <ParallaxImage
        image="https://media.machines.com.my/Shopify_IMG/Multi-Product_Pro.png"
        secondary={true}
        phrase="So Future."
      />
      <FeaturedProduct
        name="All Products"
        description="Apple products are known for their innovative design, cutting-edge technology, and seamless integration. Experience the future with Apple."
        image={AllProductsImage}
        reverse={true}
      />
    </div>
  );
}
