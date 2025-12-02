"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: session, isPending } = authClient.useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !session?.user?.id) return;

    try {
      await axios.post("/api/create", {
        title,
        body: content,
        userId: session.user.id,
      });

      // This will push to post later
      router.push("/dashboard");
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
