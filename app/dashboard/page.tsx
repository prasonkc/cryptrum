"use client"
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
  return (
  <div >
      <Card className={`outline-none border-none gap-4 w-200 m-auto ${resolvedTheme == "dark"? "shadow-white": "shadow-black"}`}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2">
          <Badge variant="outline">Outline</Badge>
          <Badge variant="outline">Hello World</Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
