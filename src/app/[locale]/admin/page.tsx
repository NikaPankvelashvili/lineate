import { User } from "@/src/types/user";
import React from "react";
import { getUserInfo } from "../../api";
import { redirect } from "next/navigation";
import { getI18n } from "@/src/locales/server";
import LinkToSection from "@/src/components/admin/LinkToSection";

const AdminPage = async () => {
  const user: User = await getUserInfo();

  const t = await getI18n();

  if (user.isadmin === false) {
    redirect("/");
  }

  return (
    <main className="dark:bg-dark-primary bg-light-primary min-h-screen  text-white px-[8%] py-20">
      <h1 className="text-5xl dark:text-white mb-20">
        {t("adminPanel").toLocaleUpperCase()}
      </h1>
      <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
        <LinkToSection target="products" />
        <LinkToSection target="orders" />
        <LinkToSection target="users" />
        <LinkToSection target="blogs" />
      </div>
    </main>
  );
};

export default AdminPage;
