"use client";
import React, { useState, useEffect } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Menu, Search, Bell, User, TrendingUp, Clock, Eye } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const PostCard = ({ glass, index }: { glass: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 1000) + 100);
  const [likes] = useState(Math.floor(Math.random() * 50) + 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-full max-w-[600px]"
    >
      <Card
        className={`
          rounded-2xl p-4
          transition-all duration-300
          ${glass}
          relative overflow-hidden
        `}
      >
        {/* Animated gradient background on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardTitle className="mb-2">Exploring Modern Web Development</CardTitle>
                <CardDescription>
                  A deep dive into the latest trends and best practices in building scalable web applications
                </CardDescription>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
            >
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                Featured
              </Badge>
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
                stiffness: 200
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

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

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
      : "backdrop-blur-xl bg-white/80 border-b border-black/20 shadow-2xl";

  return (
    <div className="min-h-screen relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Animated Navbar */}
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
                    className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                  >
                    Dashboard
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
                          : "0 0 0 0px rgba(147, 51, 234, 0)"
                      }}
                    />
                  </div>
                </motion.div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
                  >
                    <Bell className="w-5 h-5" />
                    <motion.span
                      className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <User className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Parallax */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`
            w-[90%] sm:w-[85%] lg:w-[80%] mx-auto
            rounded-3xl p-8 sm:p-12 lg:p-16
            my-6 sm:my-8 lg:my-10
            flex flex-col items-center justify-center
            text-center
            min-h-[50vh] sm:min-h-[55vh] lg:min-h-[60vh]
            ${glass}
            relative overflow-hidden
          `}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 100%" }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent relative z-10"
          >
            Welcome to Your Dashboard
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-6 sm:mb-8 px-4 relative z-10"
          >
            Discover curated content, insights, and updates from across the platform
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold transition-all"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 rounded-xl border border-white/20 font-semibold transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <TracingBeam className="w-full min-h-screen px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-5 lg:gap-6 pt-4 pb-12">
          {Array.from({ length: 10 }).map((_, i) => (
            <PostCard key={i} glass={glass} index={i} />
          ))}
        </div>
      </TracingBeam>

      {/* Animated Scroll Progress Indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center
            ${glass}
            relative
          `}
          whileHover={{ scale: 1.1 }}
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-300/20"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              style={{
                pathLength: scrollYProgress,
              }}
              strokeDasharray="0 1"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div 
            className="text-sm font-semibold relative z-10"
            key={Math.round(scrollYProgress.get() * 100)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;