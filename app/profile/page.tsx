"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserPost {
  id: number;
  title: string;
  body: string;
  plainText: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [localName, setLocalName] = useState(session?.user.name || "");
  const [localImage, setLocalImage] = useState(session?.user.image || "");
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Update local state when session changes
  useEffect(() => {
    if (session?.user) {
      setLocalName(session.user.name || "");
      setLocalImage(session.user.image || "");
    }
  }, [session]);

  // Fetch user's posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!session?.user?.id) return;

      try {
        setIsLoadingPosts(true);
        const response = await axios.get("/api/get-user-posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchUserPosts();
  }, [session?.user?.id]);

  if (!session) {
    return null;
  }

  const handleUpdateProfile = async (formData: FormData) => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);
      const response = await axios.post("/api/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data.user) {
        if (response.data.user.name) setLocalName(response.data.user.name);
        if (response.data.user.image !== undefined) setLocalImage(response.data.user.image || "");
        
        await authClient.getSession();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.error
        ? error.response.data.error
        : "Failed to update profile. Please try again.";
      alert(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEditName = async () => {
    const newName = prompt("Enter your new name", localName);
    if (newName && newName.trim() !== "" && newName !== localName) {
      const formData = new FormData();
      formData.append("name", newName.trim());
      await handleUpdateProfile(formData);
    }
  };

  const handleEditImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please select an image file (JPEG, PNG, GIF, or WebP).");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size too large. Maximum size is 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    await handleUpdateProfile(formData);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    try {
      setDeletingPostId(postId);
      await axios.delete(`/api/delete-post?postId=${postId}`);
      
      // Remove the post from the local state
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.error
        ? error.response.data.error
        : "Failed to delete post. Please try again.";
      alert(errorMessage);
    } finally {
      setDeletingPostId(null);
    }
  };

  const displayName = localName || session?.user.name || "";
  const displayImage = localImage || session?.user.image || "";
  const initial = displayName.charAt(0).toUpperCase() + (displayName.charAt(1)?.toUpperCase() || "");

  return (
    <div className="w-full h-screen">
      <div className="max-w-[70%] p-10 my-10 rounded-2xl  bg-gray-950 m-auto">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <Avatar 
              className="w-20 h-20 cursor-pointer" 
              onClick={handleEditImage}
              title="Click to change profile image"
            >
              <AvatarImage src={displayImage} />
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition-opacity cursor-pointer" onClick={handleEditImage}>
              <Edit2 size={16} className="text-white" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-white">{displayName}</span>
            <button
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleEditName}
              disabled={isUpdating}
              aria-label="Edit name"
            >
              <Edit2 size={20} />
            </button>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
          {isLoadingPosts ? (
            <div className="text-gray-400">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-gray-400">You haven&apos;t created any posts yet.</div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="p-4 bg-gray-900 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <h3 
                      className="text-lg font-bold text-white cursor-pointer hover:text-blue-400"
                      onClick={() => router.push(`/post/${post.id}`)}
                    >
                      {post.title}
                    </h3>
                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/post/${post.id}`)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        disabled={deletingPostId === post.id}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingPostId === post.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-2 line-clamp-2">
                    {post.plainText || "No description available"}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Created: {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
