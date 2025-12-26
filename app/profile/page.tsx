"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const Profile = () => {
  const { data: session } = authClient.useSession();

  if (!session) {
    return;
  }

  const name = session?.user.name;
  const initial = name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
  return (
    <div className="w-full h-screen">
      <div className="max-w-[70%] p-10 my-10 rounded-2xl  bg-gray-950 m-auto">
        <Avatar className="w-20 h-20 cursor-pointer">
          <AvatarImage src={""} />
          <Edit2 width={50} className="absolute" />
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
          <div className="space-y-4">
            <div className="flex justify-end mb-2 gap-2"></div>
            {[1, 2, 3].map((post) => (
              <div key={post} className="p-4 bg-gray-900 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">
                    Post Title {post}
                  </h3>
                  <div className="flex gap-3">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 mt-2">
                  This is a short description of post {post}. Replace with
                  actual post content.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
