import { CartProductType } from "@/src/types/cartTypes";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true
  );
  return availableProducts;
};

export const POST = async (request: any) => {
  const { products, user } = await request.json();

  console.log(products);
  

  const data: CartProductType[] = products;
  let activeProducts = await getActiveProducts();
  try {
    for (const product of data) {
      const stripeProduct = activeProducts.find(
        (stripeProduct: any) =>
          stripeProduct?.name?.toLowerCase() == product?.title?.toLowerCase() &&
          stripeProduct?.metadata?.price === product.price
      );
      if (stripeProduct == undefined) {
        await stripe.products.create({
          name: product.title,
          default_price_data: {
            unit_amount: Number(product.price) * 100,
            currency: "usd",
          },
          metadata: {
            price: product.price,
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
  activeProducts = await getActiveProducts();
  let stripeItems: any = [];

  for (const product of data) {
    const stripeProduct = activeProducts?.find(
      (prod: any) =>
        prod?.name?.toLowerCase() == product?.title?.toLowerCase() &&
        prod?.metadata?.price === product.price
    );

    if (stripeProduct) {
      stripeItems.push({
        price: stripeProduct?.default_price,
        quantity: product?.quantity,
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    line_items: stripeItems,
    mode: "payment",
    customer_email: user.email,
    payment_intent_data: {
      metadata: {
        id: user.sub,
        phone: user.phone,
        address: user.address,
        name: user.name,
      },
    },
    success_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/profile/orders?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/cart`,
  });

  return NextResponse.json({ url: session.url });
};