"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ForumCard = () => {
  // Task make it responsive
  return (
    <div className="w-[400px] h-[300px]">
      <Card className={`cursor-pointer border-2 shadow-x transition-transform hover:scale-105 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl`}>
        <CardHeader className=" flex items-center ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <CardTitle className="text-lg">Lorem ipsum dolor </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-relaxed max-w-prose space-y-2 space-x-1.5">
            Card Content is a content that im going to write within tie card
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
            corrupti rem asperiores praesentium expedita totam officia quaerat,
            porro dolorum natus suscipit iste?Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ut, architecto. Lorem ipsum dolor sit
            amet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumCard;
