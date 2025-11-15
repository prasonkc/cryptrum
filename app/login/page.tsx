"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  AppDispatch } from "@/redux/store";
import { setError } from "@/redux/slice/ErrorSlice";

export default function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm bg-secondary outline-1">
        <CardHeader>
          <CardTitle>Login or Sign Up</CardTitle>
          <CardAction>
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={() => {
                setIsLogin(!isLogin);
              }}
            >
              {!isLogin ? "Login" : "Signup"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {!isLogin && (
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Your Username"
                      required
                    />
                  </div>
                )}
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer hover:border-b border-white"
            // ------------------------only for testing---------------------------
            onClick={() => {
              dispatch(setError("Login clicked"));
            }}
          >
            {!isLogin ? "Signup" : "Login"}
          </Button>
          <Button className="w-full cursor-pointer" variant={"outline"}>
            {!isLogin ? "Signup with Google" : "Login with Google"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
