import { User } from "@/src/types/user";
import { getUserInfo } from "@/src/app/api";
import Image from "next/image";

const ProfilePage = async () => {
  const user: User = await getUserInfo();

  return (
    <main>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>
      <div className="w-16 h-16">
        <Image src={user.image_url} alt={user.name} width={500} height={500} />
      </div>
    </main>
  );
};

export default ProfilePage;
