"use client";
import React, { useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { Editor } from "@/components/blocks/editor-00/editor";
import { SerializedEditorState } from "lexical";
import { lexicalJsonToText } from "@/lib/lexicalToText";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState<SerializedEditorState | null>(null);
  const { data: session } = authClient.useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !editorState || !session?.user?.id) return;

    try {
      const res = await axios.post("/api/create", {
        title,
        body: JSON.stringify(editorState),
        userId: session.user.id,
        plainText: lexicalJsonToText(JSON.stringify(editorState)),
      });

      const postId = Number(res.data.post.id);
      window.location.href = `/post/${postId}`;
    } catch (err) {
      console.log(err);
    }
  };

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
        <Editor onChange={setEditorState} />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
