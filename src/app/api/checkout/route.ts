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

const calculatePriceWithTax = ({price, taxPercentage = 2} : {price: number, taxPercentage: number}) => {
  return Math.round(Number(price) * 100 * (1 + taxPercentage / 100));
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
          stripeProduct?.metadata?.price === `${product.price}.00`
      );
      if (stripeProduct == undefined) {
        await stripe.products.create({
          name: product.title,
          metadata: {
            price: `${product.price}.00`,
            note: "Price includes 2% tax",
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

    console.log("product", product)

    const stripeProduct = activeProducts?.find(
      (prod: any) =>
        prod?.name?.toLowerCase() == product?.title?.toLowerCase() &&
      prod?.metadata?.price === `${product.price}.00`
    );
    
    console.log("stripeProduct", stripeProduct)
    if (stripeProduct) {
      const priceWithTax = calculatePriceWithTax({price: product.price, taxPercentage: 2}); // Calculate price with tax
      const priceData = await stripe.prices.create({
        unit_amount: priceWithTax,
        currency: "usd",
        product: stripeProduct.id,
      });

      stripeItems.push({
        price: priceData.id,
        quantity: product?.quantity,
      });
    }
  }

  console.log(stripeItems);

  if (stripeItems.length === 0) {
    // Handle the case where no valid stripe items are found.
    // This could involve returning an error response or a message indicating that no items are available for checkout.
    return NextResponse.json({ error: "No valid items available for checkout." });
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
