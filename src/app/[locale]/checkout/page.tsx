import CheckoutClient from "@/src/components/checkout/CheckoutClient";
import { getUserInfo } from "../../api";

const Checkout = async () => {
  const user = await getUserInfo();

  return (
    <div>
      <CheckoutClient user={user} />
    </div>
  );
};

export default Checkout;
