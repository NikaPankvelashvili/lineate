"use client";
import { deleteBlog } from "@/src/app/actions";
import React from "react";
import { TiDelete } from "react-icons/ti";

export default function DeleteBlog({ id }: { id: number }) {
  return (
    <TiDelete
      className="cursor-pointer"
      color="red"
      fontSize={30}
      onClick={() => deleteBlog(id)}
    />
  );
}
