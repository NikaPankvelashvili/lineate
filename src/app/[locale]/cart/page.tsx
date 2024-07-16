"use client";

import React, { useContext } from "react";
import { CartContext } from "@/src/providers/CartContext";
import { CartContextType } from "@/src/types/cartTypes";
import { IoClose, IoAdd, IoRemove } from "react-icons/io5";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { FaExternalLinkAlt } from "react-icons/fa";
import cn from "classnames";
import Image from "next/image";
import { handleAddToCart } from "@/src/components/product/utils/productDetailed";
import Link from "next/link";
import _ from "lodash";
import { mapMemoryToString } from "@/src/components/product/utils/products";

const CartPage = () => {
  const cartContext: CartContextType = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartContext.products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  };

  console.log(cartContext.products);

  return (
    <main className="px-[8%] dark:bg-[#161617] py-24">
      {/* <h1 className="text-5xl">Cart Items</h1>
      <div className="flex flex-col gap-9">
        {cartContext.products.map((product) => (
          <div key={product.id} className="border-2 p-2">
            <div className="flex w-full justify-between">
              <h2>{product.title}</h2>
              <button
                onClick={() =>
                  handleAddToCart({
                    product,
                    color: product.color,
                    memory: product.memory,
                    ram: product.ram,
                    cartContext,
                    image_url: product.image_url,
                    quantity: -product.quantity,
                  })
                }
                className={cn("p-2 rounded-full", {
                  "bg-red-500": product.quantity > 1,
                  "bg-red-300": product.quantity === 1,
                })}
              >
                REMOVE
              </button>
            </div>
            <p>{product.price}</p>
            <div className="flex gap-5">
              <button
                onClick={() =>
                  handleAddToCart({
                    product,
                    color: product.color,
                    memory: product.memory,
                    ram: product.ram,
                    cartContext,
                    image_url: product.image_url,
                    quantity: -1,
                  })
                }
              >
                -
              </button>
              <p>{product.quantity}</p>
              <button
                onClick={() =>
                  handleAddToCart({
                    product,
                    color: product.color,
                    memory: product.memory,
                    ram: product.ram,
                    cartContext,
                    image_url: product.image_url,
                    quantity: 1,
                  })
                }
              >
                +
              </button>
            </div>
            <p>{`Memory ${product.memory}GB`}</p>
            <p>{`Ram ${product.ram}GB`}</p>
            <div
              className={`p-2 rounded-full`}
              style={{ background: product.color.colorCode }}
            ></div>
            <Image
              src={product.image_url}
              alt={product.title}
              width={350}
              height={350}
            />
          </div>
        ))}
      </div> */}
      <div className="bg-white dark:bg-[#161617]">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {cartContext.products.length === 0 && (
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
                {cartContext.products.map((product, productIdx) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <Image
                        alt={product.title}
                        src={product.image_url}
                        className="h-24 w-24 rounded-md object-cover object-center  sm:h-48 sm:w-48"
                        width={500}
                        height={500}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0 h-full">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                href={`/products/${product.id}`}
                                className="font-medium text-gray-700 flex items-center gap-1 hover:text-gray-800 dark:text-white"
                              >
                                {product.title}{" "}
                                <FaExternalLinkAlt fontSize={10} />
                              </Link>
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

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="flex items-center font-medium text-gray-400 gap-1 absolute right-0 bottom-0">
                            <span className="sr-only">
                              quantity, {product.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart({
                                  product,
                                  color: product.color,
                                  memory: product.memory,
                                  ram: product.ram,
                                  cartContext,
                                  image_url: product.image_url,
                                  quantity: -1,
                                });
                              }}
                            >
                              <IoRemove
                                fontSize={20}
                                aria-hidden="true"
                                className="hover:text-gray-500 dark:text-white"
                              />
                            </button>
                            <span className="text-gray-700 dark:text-white">
                              {product.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart({
                                  product,
                                  color: product.color,
                                  memory: product.memory,
                                  ram: product.ram,
                                  cartContext,
                                  image_url: product.image_url,
                                });
                              }}
                            >
                              <IoAdd
                                fontSize={20}
                                aria-hidden="true"
                                className="hover:text-gray-500 dark:text-white"
                              />
                            </button>
                          </div>

                          <div className="absolute right-0 top-0">
                            <button
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart({
                                  product,
                                  color: product.color,
                                  memory: product.memory,
                                  ram: product.ram,
                                  cartContext,
                                  image_url: product.image_url,
                                  quantity: -product.quantity,
                                });
                              }}
                            >
                              <span className="sr-only">Remove</span>
                              <IoClose aria-hidden="true" className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="absolute left-0 bottom-0">
                            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                              ${product.price}
                            </p>
                          </div>
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
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 dark:bg-[#2b2b2c]"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900 dark:text-white"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4 ">
                <div className="flex items-center justify-between ">
                  <dt className="text-sm text-gray-600 dark:text-gray-200">
                    Subtotal
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    ${calculateTotalPrice().toFixed(2)}
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
                      <HiMiniQuestionMarkCircle
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
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
                      <HiMiniQuestionMarkCircle
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    $
                    {cartContext.products.length == 0
                      ? Number(0).toFixed(2)
                      : 8.32}
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
                      : Number(calculateTotalPrice()) + 8.32 + 5}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={cartContext.products?.length === 0}
                  className="w-full rounded-md border border-transparent bg-[#0071e3] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  {/* <Link className="" href="/checkout">Checkout</Link> */}
                  Checkout
                </button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
