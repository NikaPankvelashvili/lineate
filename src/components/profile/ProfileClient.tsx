"use client";

import { User } from "@/src/types/user";
import Image from "next/image";
import React, { useState } from "react";

const ProfileClient = ({ user }: { user: User }) => {
  return (
    <>
      <div>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Address: {user.address}</p>
        <Image
          src={user.image_url}
          alt="profile picture"
          width={100}
          height={100}
        />
      </div>
    </>
  );
};

export default ProfileClient;
