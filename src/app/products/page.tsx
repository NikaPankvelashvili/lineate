import ProductCard from "@/src/components/product/ProductCard";
import { getProducts } from "@src/app/api";
import Image from "next/image";

const page = async () => {
  const products: Product[] = await getProducts();

  return (
    <main className="]">
      <section></section>
      <section>
        <div></div>
        <div className="grid grid-cols-3 gap-4 pb-20 pt-5">
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                photos={product.photos}
                colors={product.colors}
                RAM={product.RAM}
                description={product.description}
                stock={product.stock}
                memories={product.memories}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default page;
