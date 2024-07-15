import { getProducts } from "@/src/app/api";
import AddNewProduct from "@/src/components/admin/AddNewProduct";
import DeleteProduct from "@/src/components/admin/DeleteProduct";
import EditProduct from "@/src/components/admin/EditProduct";
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
      <AddNewProduct />
      <div className="flex flex-col gap-5">
        {products.map((product) => {
          return (
            <div key={product.id} className="">
              <div>{product.title}</div>
              <div>{product.price}</div>
              <div>{product.description}</div>
              <div>{product.type}</div>
              {/* <EditProduct product={product} /> */}
              <DeleteProduct id={product.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProductsPage;
