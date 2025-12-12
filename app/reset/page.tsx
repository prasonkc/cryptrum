"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setError } from "@/redux/slice/ErrorSlice";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReCAPTCHA from "react-google-recaptcha";
import React from "react";

export default function RequestResetPage() {
  const [email, setEmail] = useState("");
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!captchaToken) {
      dispatch(setError("Please complete the captcha"));
      return;
    }

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });

    if (error) {
      dispatch(setError(error.message as string));
    } else {
      alert("Please check your email");
    }
  }

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className={cn("grid items-center gap-6")}>
        <div className="w-100 m-auto bg-gray-950 flex flex-col gap-5 p-10 rounded-3xl">
          <h1 className="mx-auto font-extrabold text-2xl">
            Reset Your Password
          </h1>
          <div className="grid gap-3">
            <Input
              id="email"
              placeholder="yourname@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-[80%] mx-auto"
            />
          </div>

          <div className="m-auto">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={handleCaptchaChange}
            />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-[30%] hover:scale-105 transition-all cursor-pointer mx-auto"
            onClick={handleSubmit}
          >
            Send Link
          </Button>
        </div>
      </form>
    </div>
  );
}