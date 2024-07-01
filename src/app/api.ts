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
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-products`, {
    // `http://localhost:3000/api/get-products`, {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const products = data.products?.rows || [];
  return products;
}
