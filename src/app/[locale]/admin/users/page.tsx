import { getUsers } from "@/src/app/api";
import { getI18n } from "@/src/locales/server";
import { User } from "@/src/types/user";
import Image from "next/image";
import Link from "next/link";
import { IoMdReturnLeft } from "react-icons/io";
import HighlightUser from "@/src/components/admin/HighlightUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADMIN | Users",
  description:
    "The Napplet Store is the best place to buy Apple products from all around the world. Find the latest iPhones, MacBooks, Apple Watches, and more.",
};

const AdminUsersPage = async () => {
  const users: User[] = await getUsers();
  const t = await getI18n();

  return (
    <main className="w-full mx-auto px-[8%] py-20 dark:bg-dark-primary bg-light-primary text-white">
      <h2 className="text-5xl font-semibold mb-20 dark:text-white ">
        <div className="flex justify-center items-center gap-4">
          <Link href={`/admin`} className="cursor-pointer hover:opacity-70">
            <IoMdReturnLeft />
          </Link>
          {t("users")}
        </div>
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("name")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("email")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("nickname")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("phone")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("address")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("isAdmin")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                {t("avatar")}
              </th>
              <th className="px-4 py-2 dark:text-white dark:bg-dark-secondary bg-light-secondary">
                ID
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User, index: Number) => (
              <HighlightUser user={user} index={index} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminUsersPage;
