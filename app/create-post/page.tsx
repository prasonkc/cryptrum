"use client";
import React, { useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: session } = authClient.useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !session?.user?.id) return;

    try {
      const res = await axios.post("/api/create", {
        title,
        body: content,
        userId: session.user.id,
      });

      let postId = await res.data.post.id;
      postId = Number(postId)

      window.location.href = `/post/${postId}`;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded p-2 h-40"
        />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreatePost
