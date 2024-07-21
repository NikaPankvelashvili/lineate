import { getOrders } from "@/src/app/api";
import RefaundButton from "@/src/components/admin/RefaundButton";
import { getI18n } from "@/src/locales/server";
import { IoMdReturnLeft } from "react-icons/io";
import { Order } from "@/src/types/generalType";
import React from "react";
import Link from "next/link";

const AdminOrdersPage = async () => {
  const orders: Order[] = await getOrders();
  const t = await getI18n();

  return (
    <main className="w-full mx-auto px-[8%] py-20 dark:bg-dark-primary bg-light-primary text-white">
      <h2 className="text-5xl font-semibold mb-20 dark:text-white ">
        <div className="flex justify-center items-center gap-4">
          <Link href={`/admin`} className="cursor-pointer hover:opacity-70">
            <IoMdReturnLeft />
          </Link>
          {t("orders")}
        </div>
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("totalPrice")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("status")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("Address")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("phone")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("receipt")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order, index: Number) => (
              <tr
                key={order.latest_charge.id}
                className={`bg-white dark:${
                  Number(index) % 2
                    ? "dark:bg-dark-secondary bg-light-secondary"
                    : "dark:bg-dark-primary bg-light-primary"
                } rounded-md shadow-md mb-4`}
              >
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  ${(order.amount / 100).toFixed(2)}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  {order.latest_charge.refunded === true ? "Refunded" : "Paid"}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  {order.metadata.address}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  {order.metadata.phone}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                  <a
                    href={order.latest_charge.receipt_url}
                    aria-label="Order Receipt"
                    target="_blank"
                    className="text-red-600 dark:text-red-400 underline"
                    rel="noopener noreferrer"
                  >
                    {t("viewReceipt")}
                  </a>
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-white flex justify-center">
                  <RefaundButton
                    id={order.latest_charge.id}
                    refunded={order.latest_charge.refunded}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminOrdersPage;
