"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { TracingBeam } from "@/components/ui/tracing-beam";
import {
  Menu,
  Search,
  Bell,
  User,
  TrendingUp,
  Clock,
  Eye,
  Bot,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import ScrambledText from "@/components/ui/shadcn-io/scrambled-text";
import { Particles } from "@/components/ui/shadcn-io/particles";
import { LampContainer } from "@/components/ui/lamp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PostCard = ({ glass, index }: { glass: string; index: number }) => {
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
              <CardTitle className="mb-2">
                Exploring Modern Web Development
              </CardTitle>
              <CardDescription>
                A deep dive into the latest trends and best practices in
                building scalable web applications
              </CardDescription>
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

const Dashboard = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isNavbar, setIsNavbar] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbar(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const glass =
    resolvedTheme === "dark"
      ? "backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl"
      : "backdrop-blur-xl bg-black/10 border border-black/20 shadow-xl";

  const navGlass =
    resolvedTheme === "dark"
      ? "backdrop-blur-xl bg-black/80 border-b border-white/20 shadow-2xl"
      : "backdrop-blur-xl bg-gray/10 border-b border-black/20 shadow-2xl";

  return (
    <div className="min-h-screen relative">
      <Particles
        className="absolute inset-0"
        quantity={300}
        ease={80}
        staticity={50}
        color={resolvedTheme == "dark" ? `#ffffff` : "#000000"}
        size={1.2}
      />
      {/* Navbar */}
      <AnimatePresence>
        {isNavbar && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className={`fixed top-0 left-0 right-0 z-50 ${navGlass}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
                  >
                    <Menu className="w-5 h-5" />
                  </motion.button>
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-200 bg-clip-text text-transparent"
                  >
                    Cryptrum
                  </motion.h1>
                </div>

                <motion.div
                  className="hidden md:flex items-center flex-1 max-w-md mx-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <motion.input
                      type="text"
                      placeholder="Search posts..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      animate={{
                        boxShadow: searchFocused
                          ? "0 0 0 3px rgba(147, 51, 234, 0.1)"
                          : "0 0 0 0px rgba(147, 51, 234, 0)",
                      }}
                    />
                  </div>
                </motion.div>

                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg transition-colors relative"
                  >
                    <Popover>
                      <PopoverTrigger className="flex items-center justify-center">
                          <Bell/>
                      </PopoverTrigger>

                      <PopoverContent className={`${glass} bg-gray-700 flex flex-col gap-2 cursor-alias`}>
                        notifications goes here
                      </PopoverContent>
                      </Popover>
                    <motion.span
                      className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Popover>
                      <PopoverTrigger>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </PopoverTrigger>

                        <PopoverContent className={`${glass} bg-gray-700 w-25 py-3 px-5 m-0 flex flex-col gap-2 cursor-alias`}>
                        <motion.div
                          whileTap={{ scale: 0.90 }}
                          onClick={() => {router.push("/profile")}}
                        >
                          Profile
                        </motion.div>
                        <motion.div
                          whileTap={{ scale: 0.90 }}
                        >
                          Logout
                        </motion.div>
                      </PopoverContent>
                    </Popover>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="w-full pt-8 pb-4"
      >
        <div className="w-[90%] sm:w-[85%] lg:w-[80%] max-w-6xl mx-auto">
          <LampContainer className="min-h-[60vh]">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="text-center text-4xl md:text-6xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent mb-6"
            >
              <ScrambledText
                className="text-center mb-10"
                radius={120}
                duration={1}
                speed={0.6}
                scrambleChars="!@#$%^&*()_+"
                style={{
                  color: "currentColor",
                  fontSize: "clamp(1rem, 3vw, 3rem)",
                  fontFamily: "inherit",
                }}
              >
                Welcome to your Dashboard
              </ScrambledText>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              <LiquidButton
                className="m-5"
                onClick={() => {
                  router.push("/profile");
                }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  Check Profile
                </motion.p>
              </LiquidButton>

              <LiquidButton
                onClick={() => {
                  router.push("/create-post");
                }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  Create a Post
                </motion.p>
              </LiquidButton>
            </motion.div>
          </LampContainer>
        </div>
      </motion.div>

      {/* Content Section */}
      <TracingBeam className="w-full min-h-screen px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-5 lg:gap-6 pt-4 pb-12">
          {Array.from({ length: 10 }).map((_, i) => (
            <PostCard key={i} glass={glass} index={i} />
          ))}
        </div>
      </TracingBeam>
    </div>
  );
};

export default Dashboard;
