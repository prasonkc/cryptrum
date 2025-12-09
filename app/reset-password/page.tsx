"use client";
import React, { use, useState } from "react";
import { authClient } from "@/lib/auth-client";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  return (
    <div>
      <form action="POST">
        <input
          type="email"
          placeholder="example@yourmail.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button
          onClick={async (e) => {
            e.preventDefault();
            const { data, error } = await authClient.requestPasswordReset({
              email: email,
              redirectTo: "/reset-password",
            });

            if(error){
                console.log(error)
            }
          }}
        >
          Reset your password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
