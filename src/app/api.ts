import { getSession } from "@auth0/nextjs-auth0";

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



// users Info

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