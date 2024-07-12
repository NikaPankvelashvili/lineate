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
import { CartProductType } from "@/src/types/cartTypes";
import { checkout } from "@/src/app/actions";
import Image from "next/image";

const CheckoutClient = ({ user }: { user: User }) => {
  const products: CartProductType[] = useContext(CartContext).products;
  const [profile, setProfile] = useState<any>({
    name: "",
    address: "",
    phone: "",
    sub: "",
  });

  console.log(products);

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
    <div>
      <div className="flex flex-col gap-10">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <p>{product.title}</p>
              <p>{product.price}</p>
              <p>{product.quantity}</p>
              <Image
                src={product.image_url}
                alt={product.title}
                width={150}
                height={150}
              />
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="w-96">
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
            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={"name"}
            required
          />
        </div>
        <div className="mb-4">
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
            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={"Address"}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#11545c] dark:bg-[#0f3d47] text-white dark:text-gray-200 p-3 rounded-md font-medium hover:bg-[#11555cc9] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {"buy"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutClient;
