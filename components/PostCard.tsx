import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Eye } from "lucide-react";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import React from "react";

const PostCard = ({
  glass,
  index,
  title,
  content,
  onClick,
}: {
  glass: string;
  index: number;
  title: string;
  content: string;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [views] = [0];
  const [likes] = [0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-full max-w-[700px]"
      onClick={onClick}
    >
      <Card
        className={`
          rounded-2xl p-4
          transition-all duration-300
          ${glass}
          relative overflow-hidden
        `}
      >
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="mb-2">{title}</CardTitle>
              <CardDescription>{content}</CardDescription>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.1 + 0.3,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Badge className="text-white border-0">Featured</Badge>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            className="flex gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{views}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </motion.div>
        </CardHeader>

        <CardFooter className="flex gap-2 flex-wrap relative z-10">
          {["React", "Next.js", "TypeScript"].map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * 0.1 + 0.5 + i * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge variant="outline" className="cursor-pointer">
                {tag}
              </Badge>
            </motion.div>
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default memo(PostCard, (prev, next) => {
  return (
    prev.title === next.title &&
    prev.content === next.content &&
    prev.glass === next.glass &&
    prev.index === next.index
  );
});
