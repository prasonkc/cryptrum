"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginPopover({ open, onOpenChange }: LoginPopoverProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isLogin, setIsLogin] = React.useState(true);

  const glass = 
    "backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={cn("sm:max-w-[420px]", glass, "rounded-2xl")}>
          <DialogHeader>
            <DialogTitle>{isLogin ? "Login" : "Signup"}</DialogTitle>
            <DialogDescription>
              {isLogin
                ? "Enter your credentials to access your account."
                : "Create a new account to get started."}
            </DialogDescription>
          </DialogHeader>

          <AuthForm isLogin={isLogin} toggle={() => setIsLogin(!isLogin)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={cn(glass, "rounded-t-2xl")}>
        <DrawerHeader className="text-left">
          <DrawerTitle>{isLogin ? "Login" : "Signup"}</DrawerTitle>
          <DrawerDescription>
            {isLogin
              ? "Enter your credentials to access your account."
              : "Create a new account to get started."}
          </DrawerDescription>
        </DrawerHeader>

        <AuthForm className="px-4" isLogin={isLogin} toggle={() => setIsLogin(!isLogin)} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
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
            <Input id="username" placeholder="Your username" />
          </div>
        )}

        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
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
        <Input id="password" type="password" placeholder="Your password" />
      </div>

      <Button variant={"secondary"} type="submit" className="w-full hover:scale-110 transition-all cursor-pointer">
        {isLogin ? "Login" : "Sign Up"}
      </Button>

      <Button variant="outline" className="w-full hover:scale-105 transition-all cursor-pointer">
        {isLogin ? "Login with Google" : "Sign Up with Google"}
      </Button>
    </form>
  );
}
