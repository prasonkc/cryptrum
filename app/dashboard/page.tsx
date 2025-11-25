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
import { TracingBeam } from "@/components/ui/tracing-beam";

// Glassmorphic card component
const PostCard = ({ glass }: { glass: string }) => {
  return (
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
  );
};

const Dashboard = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const glass =
    resolvedTheme === "dark"
      ? "backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl"
      : "backdrop-blur-xl bg-black/10 border border-black/20 shadow-xl";

  return (
    <TracingBeam>
      <div className="flex flex-col items-center gap-5 p-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <PostCard key={i} glass={glass} />
        ))}
      </div>
    </TracingBeam>
  );
};

export default Dashboard;
