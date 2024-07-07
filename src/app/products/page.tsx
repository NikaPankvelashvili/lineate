import ProductClient from "@/src/components/product/ProductClient";
import { Product } from "@/src/types/products";
import { getProducts } from "@src/app/api";

const ProductsPage = async () => {
  const products: Product[] = await getProducts();

  return (
    <main>
      <ProductClient products={products} />
    </main>
  );
};

export default ProductsPage;
