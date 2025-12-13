"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "@/redux/fetchPosts";
import { $generateHtmlFromNodes } from "@lexical/html";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { createHeadlessEditor } from "@lexical/headless";

const Post = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.value);

const lexicalToHtml = (serializedState: string) => {
  const editor = createHeadlessEditor({
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
    ],
  });

  const editorState = editor.parseEditorState(serializedState);
  editor.setEditorState(editorState);

  let html = "";
  editorState.read(() => {
    html = $generateHtmlFromNodes(editor);
  });

  return html;
};


  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const post = posts.find((p) => Number(p.id) === Number(id));

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: lexicalToHtml(post.body) }} />
    </div>  );
};

export default Post;
