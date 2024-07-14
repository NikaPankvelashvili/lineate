import { getOrders } from "@/src/app/api";
import { getI18n } from "@/src/locales/server";
import { Order } from "@/src/types/generalType";
import React from "react";

const AdminOrdersPage = async () => {
  const orders: Order[] = await getOrders();
  const t = await getI18n();

  return (
    <div>
      <h1>{t("orders")}</h1>
      {orders.length === 0 && <div>No orders</div>}
      <div className="flex flex-col gap-5">
        {orders.map((order) => {
          return (
            <div key={order.id} className="">
              <div>{order.metadata.name}</div>
              <div>{order.metadata.id}</div>
              <div>{order.metadata.address}</div>
              <div>{order.metadata.phone}</div>
              <div>{order.amount}</div>
              <div>{order.latest_charge.amount}</div>
              <div>{order.latest_charge.receipt_url}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
