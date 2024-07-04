import ProductDetailedPhotos from "@/src/components/product/ProductDetailedPhotos";
import { getProductDetail } from "@src/app/api";

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
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Price: {price}</p>
      <p>Stock: {stock}</p>
      <ul>
        <ProductDetailedPhotos photos={photos} colors={colors} />
      </ul>
      <h2>Available Colors:</h2>
      <ul>
        {colors.map((color, index) => (
          <li key={index}>{color}</li>
        ))}
      </ul>
      <h2>Available Memories:</h2>
      <ul>
        {memories?.map((memory, index) => (
          <li key={index}>{memory}</li>
        ))}
      </ul>
      <h2>Available RAM:</h2>
      <ul>
        {ram?.map((ram, index) => (
          <li key={index}>{ram}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsDetailedPage;
