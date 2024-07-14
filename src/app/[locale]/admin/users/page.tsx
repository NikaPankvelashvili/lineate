import { getUsers } from "@/src/app/api";
import { getI18n } from "@/src/locales/server";
import { User } from "@/src/types/user";
import React from "react";

const AdminUsersPage = async () => {
  const users: User[] = await getUsers();
  const t = await getI18n();

  return (
    <div>
      <h1>{t("users")}</h1>
      {users.length === 0 && <div>No users</div>}
      <div className="flex flex-col gap-5">
        {users.map((user) => {
          return (
            <div key={user.id} className="">
              <div>{user.email}</div>
              <div>{user.name}</div>
              <div>{user.isadmin}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminUsersPage;
