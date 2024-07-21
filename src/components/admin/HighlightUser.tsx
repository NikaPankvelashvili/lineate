"use client";

import { User } from "@/src/types/user";
import cn from "classnames";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";

const HighlightUser = ({ user, index }: { user: User; index: Number }) => {
  const [search, setSearch] = useQueryState("search", parseAsInteger);

  function defineBackroundColor(index: Number, user_id: Number) {
    return search === user_id
      ? "#FDE047"
      : Number(index) % 2
      ? "#2b2b2c"
      : "#161617";
  }

  return (
    <tr
      key={user.id}
      className={cn(["bg-white", "rounded-md", "shadow-md", "mb-4"])}
      style={{ backgroundColor: defineBackroundColor(index, user.id) }}
    >
      <td className="border px-4 py-2 dark:border-[#374151] dark:text-white">
        {user.name}
      </td>
      <td className="border px-4 py-2 dark:border-[#374151] dark:text-white">
        {user.email}
      </td>
      <td className="border px-4 py-2 dark:border-[#374151] dark:text-white">
        {user.nickname}
      </td>
      <td className="border px-4 py-2 dark:border-[#374151] dark:text-white">
        {user.phone}
      </td>
      <td className="border px-4 py-2 dark:border-[#374151] dark:text-white">
        {user.address}
      </td>
      <td className="border px-4 py-2 dark:border-[#374151] dark:text-white">
        {user.isadmin ? "✔" : "❌"}
      </td>
      <td className="border px-4 py-2 dark:border-[#374151] dark:text-white">
        <Image
          src={user.image_url}
          alt="User Avatar"
          width={50}
          height={50}
          className="w-10 h-10 rounded-full"
        />
      </td>
      <td className="border px-4 py-2 dark:border-[#374151] dark:text-white">
        {user.id}
      </td>
    </tr>
  );
};

export default HighlightUser;
