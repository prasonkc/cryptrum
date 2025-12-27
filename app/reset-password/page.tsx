"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AppDispatch } from "@/redux/store";
import { setError } from "@/redux/slice/ErrorSlice";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (!token) {
      dispatch(setError("Invalid Token!"));
      return;
    }

    const { error } = await authClient.resetPassword({
      token,
      newPassword,
    });

    if (error) {
      dispatch(setError(error.message as string));
    } else {
      alert("Password reset success");
      router.push("/");
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center">
        <form className={cn("grid items-center gap-6")}>
          <div className="w-100 m-auto bg-gray-950 flex flex-col gap-5 p-10 rounded-3xl">
            <h1 className="mx-auto font-extrabold text-2xl">
              Reset Your Password
            </h1>
            <div className="grid gap-3">
              <Input
                id="password"
                placeholder="Your New Password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className="w-[80%] mx-auto"
              />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-[40%] hover:scale-105 transition-all cursor-pointer mx-auto"
              onClick={handleUpdate}
            >
              Set Password
            </Button>
          </div>
        </form>
      </div>
    </Suspense>
  );
}
