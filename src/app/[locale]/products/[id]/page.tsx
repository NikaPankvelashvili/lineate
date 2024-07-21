import ProductDetailedPhotos from "@/src/components/product/ProductDetailedPhotos";
import { Product, ProductType } from "@/src/types/products";
import { getProductDetail, getProducts } from "@/src/app/api";
import ProductDetailedClient from "@/src/components/product/ProductDetailedClient";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const productsData = await getProducts();
  const product = productsData?.find(
    (product: Product) => product.id == Number(params.id)
  );

  return {
    title: `${product.title}`,
    description: `${product.description}`,
  };
}

const ProductsDetailedPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product: Product = await getProductDetail(id);

  return <ProductDetailedClient product={product} />;
};

export default ProductsDetailedPage;
