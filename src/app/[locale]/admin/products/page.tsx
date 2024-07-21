import { getProducts } from "@/src/app/api";
import AddNewProduct from "@/src/components/admin/AddNewProduct";
import DeleteProduct from "@/src/components/admin/DeleteProduct";
import EditProduct from "@/src/components/admin/EditProduct";
import { IoMdReturnLeft } from "react-icons/io";
import { getI18n } from "@/src/locales/server";
import { Product } from "@/src/types/products";
import Link from "next/link";
import React from "react";
import cn from "classnames";
import { mapMemoryToString } from "@/src/components/product/utils/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADMIN | Products",
  description:
    "The Napplet Store is the best place to buy Apple products from all around the world. Find the latest iPhones, MacBooks, Apple Watches, and more.",
};

const AdminProductsPage = async () => {
  const products: Product[] = await getProducts();
  const t = await getI18n();

  return (
    <main className="w-full mx-auto px-[8%] py-20 dark:bg-dark-primary bg-light-primary text-white">
      <h2 className="text-5xl font-semibold mb-20 dark:text-white ">
        <div className="flex justify-center items-center gap-4">
          <Link href={`/admin`} className="cursor-pointer hover:opacity-70">
            <IoMdReturnLeft />
          </Link>
          {t("products")}
        </div>
      </h2>
      <AddNewProduct />
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("title")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("description")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("price")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("stock")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("colors")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("memories")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("ram")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("edit")}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product, index: Number) => (
              <tr
                key={product.id}
                className={`bg-white dark:${
                  Number(index) % 2
                    ? "dark:bg-dark-secondary bg-light-secondary"
                    : "dark:bg-dark-primary bg-light-primary"
                } rounded-md shadow-md mb-4`}
              >
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  {product.title}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  {product.description}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  {product.stock}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  <div className="flex gap-0.5">
                    {product.colors.map((color, index) => (
                      <div
                        key={index * 999}
                        className={cn(["h-4", "w-4", "rounded-full"])}
                        style={{ backgroundColor: color.colorCode }}
                      ></div>
                    ))}
                  </div>
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white ">
                  <div className="flex gap-0.5">
                    {product.memories?.map((memory, index) => (
                      <div key={index * 998}>{mapMemoryToString(memory)}</div>
                    ))}
                  </div>
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  <div className=" flex gap-0.5">
                    {product.ram?.map((ram, index) => (
                      <div key={index * 997}>{ram}GB</div>
                    ))}
                  </div>
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  <div className="flex">
                    <EditProduct product={product} />
                    <DeleteProduct id={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminProductsPage;
