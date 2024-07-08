import ProductDetailedPhotos from "@/src/components/product/ProductDetailedPhotos";
import { Product } from "@/src/types/products";
import { getProductDetail } from "@/src/app/api";
import ProductDetailedClient from "@/src/components/product/ProductDetailedClient";

const ProductsDetailedPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product: Product = await getProductDetail(id);

  return <ProductDetailedClient product={product} />;
};

export default ProductsDetailedPage;
