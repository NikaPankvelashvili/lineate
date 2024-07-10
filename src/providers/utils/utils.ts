import { CartProductType } from "@/src/types/cartTypes";
import _ from "lodash";

export function mergeCarts({
  fetchedCart,
  localCart,
}: {
  fetchedCart: CartProductType[];
  localCart: CartProductType[];
}): CartProductType[] {
  const newCart = [...fetchedCart];

  localCart.forEach((localProduct) => {
    const existingProductIndex = fetchedCart.findIndex((fetchedProduct) =>
      _.isEqual(fetchedProduct, {
        ...localProduct,
        quantity: fetchedProduct.quantity,
        image_url: fetchedProduct.image_url,
      })
    );
    if (existingProductIndex !== -1) {
      newCart[existingProductIndex].quantity += localProduct.quantity;
    } else {
      newCart.push(localProduct);
    }
  });

  return newCart;
}