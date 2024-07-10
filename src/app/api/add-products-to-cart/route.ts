import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { CartProductType } from "@/src/types/cartTypes";


export const revalidate = 0;

export async function PUT(req: NextRequest) {
  try {
    const { userId, products } : {userId : number, products: CartProductType[]} = await req.json();

    // const result = await sql`
    //   SELECT products FROM cart
    //   WHERE user_id = ${Number(userId)}
    // `;

    // let products: CartProductType[] = [];

    // if (result.rowCount > 0) {
    //   products = result.rows[0].products || [];
    // }

    // newProducts.forEach((newProduct: CartProductType) => {
    //   const existingProductIndex = products.findIndex((cartProduct) =>
    //     _.isEqual(cartProduct, {
    //       ...newProduct,
    //       quantity: cartProduct.quantity,
    //     })
    //   );

    //   if (existingProductIndex !== -1) {
    //     products[existingProductIndex].quantity += newProduct.quantity;
    //   } else {
    //     products.push(newProduct);
    //   }
    // });


    const updatedCart = await sql`
      UPDATE cart
      SET products = ${JSON.stringify(products)}::jsonb
      WHERE user_id = ${Number(userId)}
      RETURNING *
    `;

    return NextResponse.json({ updatedCart: updatedCart.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}