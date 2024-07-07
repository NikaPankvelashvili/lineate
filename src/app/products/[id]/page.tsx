import ProductDetailedPhotos from "@/src/components/product/ProductDetailedPhotos";
import { Product } from "@/src/types/products";
import { getProductDetail } from "@src/app/api";
import Image from "next/image";

const ProductsDetailedPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const {
    title,
    description,
    price,
    stock,
    photos,
    colors,
    memories,
    ram,
  }: Product = await getProductDetail(id);

  return (
    <main>
      <div className="flex">
        <div className="flex flex-col w-1/5">
          <ProductDetailedPhotos photos={photos} colors={colors} />
        </div>
        <div>
          <Image src={photos[0].url} alt={title} width={500} height={500} />
        </div>
        <div></div>
      </div>
      <div></div>
    </main>
  );
};

export default ProductsDetailedPage;
