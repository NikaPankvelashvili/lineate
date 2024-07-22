import { handleAddToCartDB } from "@/src/app/actions";
import { getProductDetail } from "@/src/app/api";
import { CartContextType, CartProductType } from "@/src/types/cartTypes";
import { Color, Product, ProductImage } from "@/src/types/products";
import _ from "lodash";
import { toast } from "react-toastify";

export function handleColorChange(e: React.MouseEvent<HTMLButtonElement>,
  product: Product, selectedColor: string, setSelectedColor: React.Dispatch<React.SetStateAction<string>>,
  setSelectedImage: React.Dispatch<React.SetStateAction<ProductImage>>
) {
  if (selectedColor === e.currentTarget.value) return;
  setSelectedColor(e.currentTarget.value);
  setSelectedImage(
    product.photos.find((photo) => photo.color === e.currentTarget.value) ||
      product.photos[0]
  );
}

// export function handleAddToCart({
//   product,
//   color,
//   memory,
//   ram,
//   cartContext,
//   image_url,
//   quantity = 1,
// } : {
//   product: {
//     id: number,
//     title: string,
//     price: number,
//   },
//   color: Color,
//   memory: number,
//   ram: number,
//   cartContext: CartContextType
//   image_url: string,
//   quantity?: number,
// }
// ) {
//   if (!memory || !ram) return;


//   const toAddProduct: CartProductType = {
//     id: product.id,
//     title: product.title,
//     price: product.price,
//     color,
//     memory,
//     ram,
//     image_url,
//     quantity,
//   };

//   const existingProductIndex = cartContext.products.findIndex((cartProduct) =>
//     _.isEqual(cartProduct, {
//       ...toAddProduct,
//       quantity: cartProduct.quantity,
//       image_url: cartProduct.image_url,
//       // price: cartProduct.price,
//     })
//   );

//   let toastFlag = false;

//   if (existingProductIndex !== -1) {
//     const updatedProducts = [...cartContext.products];
//     updatedProducts[existingProductIndex].quantity += quantity;
//     if (updatedProducts[existingProductIndex].quantity === 0) {
//       toast.error("Product completely removed from cart");
//       toastFlag = true;
//       updatedProducts.splice(existingProductIndex, 1);
//     }
//     cartContext.setProducts(updatedProducts);
//   } else {
//     cartContext.setProducts([...cartContext.products, toAddProduct]);
//   }

//   if (!toastFlag && quantity > 0) {
//     toast.success("Product added to cart");
//   } else if (!toastFlag && quantity < 0) {
//     toast.warn("Product removed from cart");
//   }
// }

export function handleAddToCart({
  id,
  title,
  price,
  color,
  memory,
  ram,
  cartContext,
  image_url,
  quantity = 1,
} : {
  id: number,
  title: string,
  price: number,
  color: Color,
  memory: number,
  ram: number,
  cartContext: CartContextType
  image_url: string,
  quantity?: number,
}
) {
  if (!memory || !ram) return;


  const toAddProduct: CartProductType = {
    id,
    title,
    price,
    color,
    memory,
    ram,
    image_url,
    quantity,
  };

  const existingProductIndex = cartContext.products.findIndex((cartProduct) =>
    _.isEqual(cartProduct, {
      ...toAddProduct,
      quantity: cartProduct.quantity,
      image_url: cartProduct.image_url,
      price: cartProduct.price,
    })
  );

  let toastFlag = false;

  if (existingProductIndex !== -1) {
    const updatedProducts = [...cartContext.products];
    updatedProducts[existingProductIndex].quantity += quantity;
    if (updatedProducts[existingProductIndex].quantity === 0) {
      toast.success("Product completely removed from cart");
      toastFlag = true;
      updatedProducts.splice(existingProductIndex, 1);
    }
    cartContext.setProducts(updatedProducts);
  } else {
    cartContext.setProducts([...cartContext.products, toAddProduct]);
  }

  if (!toastFlag && quantity > 0) {
    toast.success("Product added to cart");
  } else if (!toastFlag && quantity < 0) {
    toast.success("Product removed from cart");
  }
}