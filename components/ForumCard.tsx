"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ForumCardProps {
  title: string;
  content: string;
  user?: {
    name: string;
    image: string | null;
  } | null;
}

const ForumCard = ({ title, content, user }: ForumCardProps) => {
  const displayImage = user?.image || "";
  const displayName = user?.name || "";
  const initials = displayName.charAt(0).toUpperCase() + (displayName.charAt(1)?.toUpperCase() || "");

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <Card className="cursor-pointer shadow-xl transition-transform hover:scale-105 backdrop-blur-xl bg-white/10 border border-white/20 h-full flex flex-col gap-2">
        <CardHeader className="flex flex-row space-y-3 gap-3 justify-start items-center">
          <Avatar className="md:w-12 md:h-12 sm:h-7 sm:w-7">
            <AvatarImage src={displayImage} />
            <AvatarFallback>{initials || "U"}</AvatarFallback>
          </Avatar>
          <CardTitle className="md:text-2xl text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm leading-relaxed line-clamp-6">
            {content}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumCard;