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
    <div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </div>
  );
};

export default Post;
