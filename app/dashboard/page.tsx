"use client";
import { useTheme } from "next-themes";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Menu, Search, Bell } from "lucide-react";
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
import { authClient } from "@/lib/auth-client";
import { fetchPosts } from "../../redux/fetchPosts";
import { resetPosts } from "@/redux/slice/latestPostsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.value);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isNavbar, setIsNavbar] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const router = useRouter();
  const { data: session } = authClient.useSession();
  // Ensure we have a valid image path - if it's a relative path, it should work with Next.js
  const displayImage = session?.user.image ? session.user.image : "";
  const displayName = session?.user.name || "";
  const initials = displayName.charAt(0).toUpperCase() + (displayName.charAt(1)?.toUpperCase() || "");

  useEffect(() => {
    setMounted(true);

    dispatch(resetPosts());
    dispatch(fetchPosts());

    const handleScroll = () => {
      setIsNavbar(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

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
                        <Bell />
                      </PopoverTrigger>

                      <PopoverContent
                        className={`${glass} dark:bg-gray-700 flex flex-col gap-2 cursor-alias`}
                      >
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
                          <AvatarImage src={displayImage} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                      </PopoverTrigger>

                      <PopoverContent
                        className={`${glass} dark:bg-gray-700 w-25 py-3 px-5 m-0 flex flex-col gap-2 cursor-alias`}
                      >
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            router.push("/profile");
                          }}
                        >
                          Profile
                        </motion.div>
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          onClick={async () => {
                            await authClient.signOut({
                              fetchOptions: {
                                onSuccess: () => {
                                  router.push("/");
                                },
                              },
                            });
                          }}
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
                onClick={async () => {
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
                  Share your thoughts
                </motion.p>
              </LiquidButton>
            </motion.div>
          </LampContainer>
        </div>
      </motion.div>

      {/* Content Section */}
      <TracingBeam className="w-full min-h-screen px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-5 lg:gap-6 pt-4 pb-12">
          {/* Fetch the posts from the database */}
          {posts.map((post, i) => {
            return (
              <PostCard
                key={post.id}
                glass={glass}
                index={i}
                title={post.title}
                content={post.plainText}
                onClick={() => router.push(`/post/${post.id}`)}
              />
            );
          })}
        </div>
      </TracingBeam>
    </div>
  );
};

export default Dashboard;
