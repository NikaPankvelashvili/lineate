"use server";

import { revalidatePath } from "next/cache";
import { CartProductType } from "../types/cartTypes";
import { createBlog, createProduct, deleteBlogById, deleteProductById, editProduct, EditProfile, getUserId, updateBlogById } from "./api";
import { redirect } from "next/navigation";
import { User } from "../types/user";
import { AddBlogType, BlogType } from "../types/blogTypes";
import { AddProductType, Product, ProductType } from "../types/products";

export const handleAddToCartDB = async (products: CartProductType[]) => {
  "use server";
  
  const userId = await getUserId();


  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/add-products-to-cart`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          products,
        }),
      }
    );
    revalidatePath("/cart");

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};


export const checkout = async (filteredProducts: CartProductType[],
  user: User) => {
  await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ products: filteredProducts, user }),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if (response.url) {
        redirect(response.url);
      }
    });
};


export async function editProfileInfo(formData: any) {
  const { userSub, name, phone, address } = formData;

  try {
    await EditProfile(userSub, name, phone, address);
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error in editProfileInfo:", error);
    throw error;
  }
}


export const deleteProduct: (id: number) => Promise<void> = async (id: number) => {
  await deleteProductById(id);
  revalidatePath("/product")
  revalidatePath("/admin")
  revalidatePath("/admin/products")
};


export const deleteBlog: (id: number) => Promise<void> = async (id: number) => {
  await deleteBlogById(id);
  revalidatePath("/admin");
  revalidatePath("/blog");
};

// export async function createAddBlogAction(blogData: AddBlogType) {
//   const {title_en,title_ka,description_en,description_ka,image_url,approved,type, user_id} = blogData
//    revalidatePath("/blog")
//    revalidatePath("/admin")
//    createBlog(title_en, title_ka ,description_en, description_ka,image_url, approved, type, user_id);
// }

export async function createAddBlogAction(blogData: AddBlogType) {
  const { title, description, image_url, approved, type, user_id } = blogData;
  console.log("blogData", blogData);
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  createBlog({title, description, image_url, approved, type, user_id});
}

// export async function updateBlog( blog: BlogType) {
//   const {id, title,description,image_url } = blog;
//   revalidatePath("/admin");
//   revalidatePath("/blog");
//   updateBlogById(id,title,description,image_url);
// }

export async function updateBlog(blog: BlogType) {
  const { id, title, description, image_url } = blog;
  revalidatePath("/admin");
  revalidatePath("/blog");
  await updateBlogById(id, title, description, image_url);
}


export async function createAddProductAction(productData: AddProductType) {
  const {title, description, price, type, stock, photos, ram, colors, memories} = productData;
  revalidatePath("/product")
  revalidatePath("/admin")
  revalidatePath("/admin/products")
  await createProduct({title, description, price, type, stock, photos, ram,colors, memories});
}

// export async function editProductAction({productData}: {productData: Product}) {
//   const {id, title, description, price, type, stock, photos, ram, colors, memories } = productData;

//   revalidatePath("/product");
//   revalidatePath(`/product/${id}`);
//   revalidatePath("/admin");

//   await editProduct({id, title, description, price, stock, type, colors, memories, ram, photos});
// }

export async function editProductAction({ productData }: {productData: Product}) {
  const {id, title, description, price, type, stock, photos, ram, colors, memories } = productData;

  revalidatePath("/product");
  revalidatePath(`/product/${id}`);
  revalidatePath("/admin");

  await editProduct({id, title, description, price, stock, type, colors, memories, ram, photos});
}

export async function createRefund(charge: string) {
  revalidatePath("/admin");
  await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/create-refund", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ charge }),
  });
}