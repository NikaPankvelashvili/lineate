import { User } from "@/src/types/user";
import { getUserInfo } from "@/src/app/api";
import ProfileClient from "@/src/components/profile/ProfileClient";

const ProfilePage = async () => {
  const user: User = await getUserInfo();

  return (
    <main>
      <ProfileClient user={user} />
    </main>
  );
};

export default ProfilePage;
