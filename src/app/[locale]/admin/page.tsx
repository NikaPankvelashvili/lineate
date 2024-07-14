import { User } from "@/src/types/user";
import React from "react";
import { getUserInfo } from "../../api";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getI18n } from "@/src/locales/server";

const AdminPage = async () => {
  const user: User = await getUserInfo();

  const t = await getI18n();

  if (user.isadmin === false) {
    redirect("/");
  }

  return (
    <div className="flex gap-5">
      <Link href={"/admin/products"}>{t("products")}</Link>
      <Link href={"/admin/orders"}>{t("orders")}</Link>
      <Link href={"/admin/users"}>{t("users")}</Link>
      <Link href={"/admin/blogs"}>{t("blogs")}</Link>
    </div>
  );
};

export default AdminPage;
