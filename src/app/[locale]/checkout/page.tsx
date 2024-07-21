import CheckoutClient from "@/src/components/checkout/CheckoutClient";
import { getUserInfo } from "../../api";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Napplet | Checkout",
  description:
    "The Napplet Store is the best place to buy Apple products from all around the world. Find the latest iPhones, MacBooks, Apple Watches, and more.",
};

const Checkout = async () => {
  const user = await getUserInfo();

  return (
    <div>
      <CheckoutClient user={user} />
    </div>
  );
};

export default Checkout;
