import ProductClient from "@/src/components/product/ProductClient";
import { getProducts } from "@src/app/api";

const ProductsPage = async () => {
  const products: Product[] = await getProducts();

  return (
    <main className="">
      <ProductClient products={products} />
    </main>
  );
};

export default ProductsPage;
