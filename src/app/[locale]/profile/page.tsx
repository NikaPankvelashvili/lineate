import { User } from "@/src/types/user";
import { getUserInfo } from "@/src/app/api";
import ProfileClient from "@/src/components/profile/ProfileClient";
import Link from "next/link";
import { getI18n } from "@/src/locales/server";
import UploadPage from "@/src/components/profile/UploadPage";

const ProfilePage = async () => {
  const user: User = await getUserInfo();
  const t = await getI18n();

  return (
    // <main>
    //   <ProfileClient user={user} />
    // </main>
    <main className="bg-light-primary dark:bg-dark-primary px-[8%] flex flex-col items-center min-h-screen">
      <p className="text-5xl text-white mt-24 mb-12">{t("editProfile")}</p>
      <div className="flex flex-col items-center justify-center">
        <div className="px-[4%] pb-10 flex flex-row justify-center items-center  gap-20 max-md:gap-12 max-sm:flex-col">
          <div className="flex flex-col gap-3 justify-center items-center">
            <UploadPage userImage={user?.image_url} />
          </div>
          <div className="flex flex-col justify-center gap-8">
            <ProfileClient user={user} />
            {/* <Link
            href={"profile/orders"}
            className="block  px-6 py-3 text-center text-sm w-40 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {t("myOrders")}
          </Link> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
