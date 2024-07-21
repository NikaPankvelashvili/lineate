import ProductClient from "@/src/components/product/ProductClient";
import { Product } from "@/src/types/products";
import { getProducts } from "@/src/app/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Napplet | Products",
  description:
    "The Napplet Store is the best place to buy Apple products from all around the world. Find the latest iPhones, MacBooks, Apple Watches, and more.",
};

const ProductsPage = async () => {
  const products: Product[] = await getProducts();

  return <ProductClient products={products} />;
};

export default ProductsPage;
