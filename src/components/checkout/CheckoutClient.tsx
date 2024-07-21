"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/src/types/user";
import { CartContext } from "@/src/providers/CartContext";
import { CartContextType, CartProductType } from "@/src/types/cartTypes";
import { checkout } from "@/src/app/actions";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { mapMemoryToString } from "../product/utils/products";
import _ from "lodash";
import { calculateTotalPrice } from "../cart/utils";
import { useRouter } from "next/navigation";

const CheckoutClient = ({ user }: { user: User }) => {
  const products: CartProductType[] = useContext(CartContext).products;
  const cartContext: CartContextType = useContext(CartContext);
  const [profile, setProfile] = useState<any>({
    name: "",
    address: "",
    phone: "",
    sub: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (products.length === 0) {
      router.push("/products");
    }
  }, []);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
        sub: user.sub || "",
      });
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await checkout(products, profile);
  };

  return (
    <main className="px-[8%] dark:bg-dark-primary bg-light-primary py-24">
      <div className="bg-white dark:bg-dark-primary bg-light-primary text-white">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Checkout
          </h1>

          <h3 className="dark:text-white text-xl font-bold mt-4">
            Total price: $
            {cartContext.products?.length === 0
              ? Number(0).toFixed(2)
              : Number(calculateTotalPrice({ cartContext })) * 1.02 + 5}
          </h3>
          <span className="text-[#0071e3]  mt-2">TAXES ARE INCLUDED</span>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {products.length === 0 && (
                  <li className="flex py-6 sm:py-10">
                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6 text-center w-full">
                      <div>
                        {/* <div className="flex justify-between"> */}
                        <h3 className="text-sm flex flex-col gap-4">
                          <span className="font-medium text-gray-700 text-xl text-center dark:text-white">
                            No items in cart
                          </span>
                          <Link
                            href="/products"
                            className="text-gray-500 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1 w-full justify-center"
                          >
                            Continue shopping
                            <FaExternalLinkAlt fontSize={10} />
                          </Link>
                        </h3>
                        {/* </div> */}
                      </div>
                    </div>
                  </li>
                )}
                {products.map((product, productIdx) => (
                  <li key={productIdx} className="flex py-6 sm:py-10">
                    {/* <div className="flex-shrink-0"> */}
                    {/* <Image
                          alt={product.title}
                          src={product.image_url}
                          className="h-24 w-24 rounded-md object-cover object-center  sm:h-48 sm:w-48"
                          width={500}
                          height={500}
                        /> */}
                    {/* </div> */}

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:flex sm:flex-col h-full">
                        <div className="flex items-center justify-between gap-2 flex-wrap max-sm:flex-col">
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              {/* <Link
                                  href={`/products/${product.id}`}
                                  className="font-medium text-gray-700 flex items-center gap-1 hover:text-gray-800 dark:text-white"
                                >
                                  {product.title}{" "}
                                  <FaExternalLinkAlt fontSize={10} />
                                </Link> */}
                              <span className="font-medium text-gray-700 dark:text-white">
                                {product.title}
                              </span>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500 dark:text-gray-400">
                              {`Color: ${_.upperFirst(
                                product.color.colorName
                              )}`}
                            </p>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500 dark:text-gray-400">
                              {product.memory &&
                                `Memory: ${mapMemoryToString(product.memory)}`}
                            </p>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500 dark:text-gray-400">
                              {product.ram && `Ram: ${product.ram}GB`}
                            </p>
                          </div>
                          {/* <p className="mt-1 text-sm font-medium text-gray-900">
                              {product.price}$
                            </p> */}
                        </div>
                        <div className="w-full border rounded border-gray-100 my-2"></div>

                        <div className="flex items-center justify-between gap-2 flex-wrap text-sm">
                          <div className="">
                            <p className="mt-1 font-medium text-gray-900 dark:text-white">
                              ${product.price}
                            </p>
                          </div>
                          <div className="flex items-center font-medium text-gray-400 gap-1 ">
                            <span className="text-gray-700 dark:text-white">
                              Quan: {product.quantity}
                            </span>
                          </div>

                          {/* <div className="absolute right-0 top-0">
                            </div> */}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 dark:bg-dark-secondary"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900 dark:text-white"
              >
                Shipping Details
              </h2>

              <dl className="mt-6 space-y-4 ">
                {/* <div className="flex items-center justify-between ">
                  <dt className="text-sm text-gray-600 dark:text-gray-200">
                    Subtotal
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    ${calculateTotalPrice({ cartContext }).toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600 dark:text-gray-200">
                    <span>Shipping estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500 dark:text-gray-200"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    $
                    {cartContext.products?.length === 0
                      ? Number(0).toFixed(2)
                      : 5}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600 dark:text-gray-200">
                    <span>Tax estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how tax is calculated
                      </span>
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    $
                    {cartContext.products.length == 0
                      ? Number(0).toFixed(2)
                      : (calculateTotalPrice({ cartContext }) * 0.02).toFixed(
                          2
                        )}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900 dark:text-white">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    $
                    {cartContext.products?.length === 0
                      ? Number(0).toFixed(2)
                      : Number(calculateTotalPrice({ cartContext })) * 1.02 + 5}
                  </dd>
                </div> */}
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      {"phone"}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full text-black overflow-x-scroll p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-primary dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={"phone"}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      {"name"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full text-black overflow-x-scroll p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-primary dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={"name"}
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="address"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      {"Address"}
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      className="w-full text-black overflow-x-scroll p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-primary dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={"Address"}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0071e3] hover:bg-[#0056b3] text-white dark:text-gray-200 p-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {"buy"}
                  </button>
                </form>
              </dl>

              <div className="mt-6 ">
                {/* { cartContext.products.length < 1 &&
                  <Link
                    className="w-full flex justify-center rounded-md border border-transparent bg-[#0071e3] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    href="/checkout"

                  >
                    Checkout
                  </Link>
                  } */}
                {/* <button
                  type="submit"
                  disabled={cartContext.products?.length === 0}
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   router.push("/checkout");
                  // }}
                  className={`w-full rounded-md border border-transparent bg-[#0071e3] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 ${
                    cartContext.products?.length === 0 && "cursor-not-allowed"
                  }`}
                >
                  Checkout
                </button> */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutClient;
