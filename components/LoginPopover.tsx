"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatefulButton } from "./ui/stateful-button";
import { XIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setError } from "@/redux/slice/ErrorSlice";
import { useRouter } from "next/navigation";
import { resolve } from "path";
import ReCAPTCHA from "react-google-recaptcha";

interface LoginPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginPopover({ open, onOpenChange }: LoginPopoverProps) {
  const [isLogin, setIsLogin] = React.useState(true);
  const glass = "backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl";

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Login Form */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={cn(
            "w-full max-w-md p-6",
            glass,
            "rounded-2xl",
            "animate-in fade-in-0 zoom-in-95 duration-200"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-6 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0"
              onClick={() => onOpenChange(false)}
            >
              <XIcon className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-semibold mb-2">
              {isLogin ? "Login" : "Signup"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLogin
                ? "Enter your credentials to access your account."
                : "Create a new account to get started."}
            </p>
          </div>

          <AuthForm isLogin={isLogin} toggle={() => setIsLogin(!isLogin)} />
        </div>
      </div>
    </>
  );
}

function AuthForm({
  className,
  isLogin,
  toggle,
}: {
  className?: string;
  isLogin: boolean;
  toggle: () => void;
}) {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(setError("Email and password are required"));
      throw new Error("Missing email or password");
    }

    if (!captchaToken) {
      dispatch(setError("Please complete the captcha"));
      return;
    }

    try {
      const response = isLogin
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({
            email,
            password,
            name: username,
            fetchOptions: {
              headers: {
                "x-captcha-response": captchaToken,
              },
            },
          });

      if (response.error) {
        dispatch(setError(response.error.message as string));
        throw new Error(response.error.message);
      }

      recaptchaRef.current?.reset();
      console.log(isLogin ? "logged in" : "Signup success");
      router.push("/dashboard");
      return resolve;
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : "Unknown error"));
      throw err;
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="flex justify-end -mt-2">
        <Button
          variant="link"
          className="text-sm cursor-pointer p-0"
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          {isLogin ? "Create an account" : "Already have an account?"}
        </Button>
      </div>

      <div className="grid gap-3">
        {!isLogin && (
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Your username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
        )}

        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          {isLogin && (
            <a href="#" className="text-sm underline-offset-4 hover:underline">
              Forgot?
            </a>
          )}
        </div>
        <Input
          id="password"
          type="password"
          placeholder="Your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className="m-auto">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={handleCaptchaChange}
        />
      </div>

      <StatefulButton
        type="button"
        className="w-20 m-auto rounded-lg hover:scale-110 transition-all cursor-pointer border border-white"
        onClick={(e) => handleLogin(e)}
        onComplete={() => console.log("Success")}
        onError={(err) => console.error("Login/signup failed:", err)}
      >
        {isLogin ? "Login" : "Sign Up"}
      </StatefulButton>

      <Button
        type="button"
        variant="outline"
        className="w-full hover:scale-105 transition-all cursor-pointer"
        onClick={async () => {
          await authClient.signIn.social({
            provider: "github",
            callbackURL: "/dashboard",
          });
        }}
      >
        {isLogin ? "Login with Github" : "Sign Up with Github"}
      </Button>
    </form>
  );
}
