"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Post = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const posts = useSelector((state: RootState) => state.posts.value);

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </div>
  );
};

export default Post;
