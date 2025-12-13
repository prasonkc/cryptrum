"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "@/redux/fetchPosts";
import { convertLexicalToHtml } from "@/redux/slice/LexicalToHTML";
import { selectHtmlByPostId } from "@/redux/slice/LexicalToHTML";

const Post = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.value);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const post = posts.find((p) => Number(p.id) === Number(id));

  useEffect(() => {
    if (post?.body) {
      dispatch(
        convertLexicalToHtml({ key: `post-${post.id}`, lexicalJson: post.body })
      );
    }
  }, [dispatch, post]);

  const html = useSelector(selectHtmlByPostId(Number(id)));

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Post;
