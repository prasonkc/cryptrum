"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AppDispatch } from "@/redux/store";
import { setError } from "@/redux/slice/ErrorSlice";
import { useDispatch } from "react-redux";


export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"checking" | "ready" | "error">(
    token ? "ready" : "error"
  );
  
  const dispatch = useDispatch<AppDispatch>()

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (!token) {
      setStatus("error");
      return;
    }

    const { error } = await authClient.resetPassword({
      token,
      newPassword,
    });

    if (error) {
      dispatch(setError(error.message as string))
      setStatus("error");
    } else {
      console.log("Password reset success");
      setStatus("ready");
    }
  }

  if (status === "error")
    return <p>Invalid or expired reset link.</p>;

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Update Password</button>
    </form>
  );
}