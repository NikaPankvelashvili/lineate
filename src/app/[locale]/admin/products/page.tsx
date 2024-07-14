import { getProducts } from "@/src/app/api";
import DeleteProduct from "@/src/components/admin/DeleteProduct";
import { getI18n } from "@/src/locales/server";
import { Product } from "@/src/types/products";
import React from "react";

const AdminProductsPage = async () => {
  const products: Product[] = await getProducts();
  const t = await getI18n();

  return (
    <div>
      <h1>{t("products")}</h1>
      {products.length === 0 && <div>{t("noProducts")}</div>}
      <div className="flex flex-col gap-5">
        {products.map((product) => {
          return (
            <div key={product.id} className="">
              <div>{product.title}</div>
              <div>{product.price}</div>
              <div>{product.description}</div>
              <div>{product.type}</div>
              <DeleteProduct id={product.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProductsPage;
