"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

const Dashboard = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const glass =
    resolvedTheme === "dark"
      ? "backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl"
      : "backdrop-blur-xl bg-black/10 border border-black/20 shadow-xl";

  return (
    <div className="flex justify-center p-4">
      <Card
        className={`
          w-full max-w-[600px]
          rounded-2xl p-4
          transition-all duration-300
          ${glass}
        `}
      >
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>

        <CardFooter className="flex gap-2 flex-wrap">
          <Badge variant="outline">Outline</Badge>
          <Badge variant="outline">Hello World</Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
