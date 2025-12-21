"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
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
    <div>
      {/* Post section */}
      <div className="min-h-screen">
        <div className="max-w-2xl w-full mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>

      {/* Comments section */}
      <div className="text-white" >
        <div className="max-w-2xl mx-auto p-6">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          {/* New Comment */}
          <div className="mb-6">
            <textarea
              placeholder="Write a comment..."
              className="w-full bg-black border border-gray-700 rounded-lg p-3 resize-none focus:outline-none focus:ring focus:ring-gray-600 text-white"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200">
                Post Comment
              </button>
            </div>
          </div>

          {/* Comment List */}
          <div className="space-y-4">
            <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
              <div className="text-sm font-medium">Username</div>
              <div className="text-sm text-gray-400 mt-1">
                Sample comment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;