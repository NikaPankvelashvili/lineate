import { getI18n } from "@/src/locales/server";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

type TargetType = "products" | "orders" | "users" | "blogs";

const LinkToSection = async ({ target }: { target: TargetType }) => {
  const t = await getI18n();

  return (
    <Link href={`/admin/${target}`}>
      <div className="h-36 dark:bg-dark-secondary bg-light-secondary w-full rounded-md dark:text-white dark:hover:bg-[#1d1d1e] hover:bg-[#605f5f] p-4 transition-all duration-300">
        <span className="text-3xl flex justify-center items-center gap-2 h-full">
          {t(target).toLocaleUpperCase()}
          <FiExternalLink />
        </span>
      </div>
    </Link>
  );
};

export default LinkToSection;
