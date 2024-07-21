import { getSession } from "@auth0/nextjs-auth0";
import { AddBlogType, TranslatedText } from "../types/blogTypes";
import { AddProductType, Product } from "../types/products";

export async function getProductDetail(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-products/${id}`, {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const product = data.products?.rows ? data.products.rows[0] : null;
  return product;
}

export async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-products`, {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const products = data.products?.rows || [];
  return products;
}



// users 

export async function getUsers() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-users`
      , {
      cache: "no-store",
    }
  );
  const { users } = await response.json();
  return users?.rows;
}

export async function getUserInfo() {
  const id = await getUserId();

  if (!id) {
    return null;
  }

  const userSubId = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-users/${id}`,
    {
      cache: "no-store",
    }
  );

  const userInfo = await userSubId.json();

  if (!userInfo && !userInfo.user && !userInfo.user.rows || userInfo.user.rows.length === 0) {
    return null;
  }

  const userDetail = userInfo.user.rows[0];
  return userDetail;
}


export async function getUserId() {
  const session = await getSession();
  const user = session?.user;
  const id = user?.sub;
 
  if (!id) {
    return null;
  }

  const userSubId = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-id/${id}`,
    {
      cache: "no-store",
    }
  );
  const userSerialId = await userSubId.json();
  const userId = userSerialId.usersId;

  return userId;
}


// Cart 

export async function getCart(){
  const id = await getUserId();

  if (!id) {
    return [];
  }

  const products = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-cart/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await products.json();

  const [cart] = data.cart.rows;

  if (!cart) return [];

  return cart.products;
}


// Orders
export const getOrders = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/orders`, {
    cache: "no-store",
  });
  const orders = await res.json();
  return orders;
};


// Blogs

export async function getBlogs(){
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-blogs`, {
      cache: "no-store",

    }
  );
  const { blogs } = await response.json();
  return blogs?.rows;
}


export async function getBlogDetail(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-blogs/${id}`, {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const blogDetail = data.blogs?.rows ? data.blogs.rows[0] : null;

  return blogDetail;
}

export async function getBlogType(type: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-blogs-type/${type}`, {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const blogDetail = data.blogs?.rows ? data.blogs.rows[0] : null;

  return blogDetail;
}


export async function EditProfile(userSub: string, name: string, phone: string, address: string) {
  console.log(userSub, name, phone, address);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/edit-profileInfo`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify({
        userSub,
        name,
        phone,
        address,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update profile:", errorData);
      throw new Error("Failed to update profile");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export async function deleteProductById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-product/${id}`,
    {
      method: "DELETE",
      cache: "no-store",

    }
  );
}


export async function deleteBlogById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-blog/${id}`,
    {
      method: "DELETE",
      cache: "no-store",

    }
  );
}

// export async function createBlog(title_en:string,title_ka:string,description_en:string,description_ka:string,image_url:string | undefined, approved:boolean, type:string, user_id:number) {

//   return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/add-blog", {
//     method: "POST",
//     cache: "no-store",

//     body: JSON.stringify(
//       {
//         title: { en: title_en, ka: title_ka },
//         description: { en: description_en, ka: description_ka },
//         image_url,
//         approved,
//         type,
//         user_id
//       }
//     ),
//   });
// }

export async function createBlog({ title, description, image_url, type, user_id, approved }: AddBlogType) {
  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/add-blog`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      image_url,
      type,
      user_id,
      approved,
    }),
  });
}


// export async function updateBlogById(id:number,title:TranslatedText,description:TranslatedText,image_url:string | undefined) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/update-blog/${id}`,
//       {
//         method: "PUT",
//         cache: "no-store",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title,description,image_url }),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error);
//     }

//     return { success: true }; // Return success indicator
//   } catch (error) {
//     console.error("Error updating user:", error);
//     throw error;
//   }
// }

export async function updateBlogById(
  id: number,
  title: TranslatedText,
  description: TranslatedText,
  image_url: string | undefined
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/update-blog/${id}`,
      {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, image_url }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return { success: true }; // Return success indicator
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
}


export async function createProduct({ title, description, price, stock, type, colors, memories, ram, photos}: AddProductType) {
  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/add-product`, {
    method: "POST",
    cache: "no-store",

    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({ title, description, price, stock, type, colors, memories, ram, photos}),
  });
}

export async function editProduct(
  {id, title, description, price, stock, type, colors, memories, ram, photos}: Product
) {
  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/update-product/${id}`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title, description, price, stock, type, colors, memories, ram, photos}),
  });
}
