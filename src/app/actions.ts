"use server";

import { revalidatePath } from "next/cache";
import { CartProductType } from "../types/cartTypes";
import { createBlog, deleteBlogById, deleteProductById, EditProfile, getUserId, updateBlogById } from "./api";
import { redirect } from "next/navigation";
import { User } from "../types/user";
import { AddBlogType, BlogType } from "../types/blogTypes";

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