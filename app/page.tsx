"use client";
import * as React from "react";
import ForumCard from "@/components/ForumCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Earth from "@/components/ui/globe";
import { useTheme } from "next-themes";
import { RandomizedTextEffect } from '@/components/ui/text-randomized';
import { RetroGrid } from "@/components/ui/shadcn-io/retro-grid";
import { LoginPopover } from "@/components/LoginPopover";

const LandingPage = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const { resolvedTheme } = useTheme();
  const [openLogin, setOpenLogin] = React.useState(false);

  let scrollTimeout: NodeJS.Timeout | null = null;
  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    if (scrollTimeout) return;
    if (e.deltaY > 20) {
      api?.scrollNext();
    } else if (e.deltaY < -20) {
      api?.scrollPrev();
    }
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
    }, 400);
  };

  function handleMagneticButtonClick(){
    setOpenLogin(!openLogin)
  }

  return (
<div
  className="min-h-screen flex flex-col overflow-hidden"
  onWheel={handleScroll}
>      <div className="main-content flex flex-col items-center justify-center pt-20 gap-6">
        <h1 className="heading text-center text-3xl">Welcome to the <b> <RandomizedTextEffect text='Encrypted'/></b> Forum</h1>

        <MagneticButton variant={"outline"} className="cursor-pointer" onClick={handleMagneticButtonClick}>
          Login
        </MagneticButton>

        <LoginPopover open={openLogin} onOpenChange={setOpenLogin} />

        <div className="w-full flex justify-center">
          <Earth
            dark={resolvedTheme === "dark" ? 1 : 0.05}
            baseColor={
              resolvedTheme === "dark"
                ? [0.25, 0.55, 1.0]
                : [0.88, 0.88, 0.88]
            }
            glowColor={
              resolvedTheme === "dark"
                ? [0.27, 0.58, 0.9]
                : [0.01, 0.01, 0.01]
            }
          />
        </div>
      </div>

      <Carousel
        className="w-full max-w-[70%] mx-auto md:mt-10"
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 3000 })]}
        setApi={setApi}
      >
        <CarouselContent className="ml-1 mt-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <ForumCard />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <RetroGrid
      className="md:flex hidden"
      angle={70}
      cellSize={100}
      opacity={0.3}
      lightLineColor="#64748b"
      darkLineColor="#475569"
    />
    </div>
  );
};

export default LandingPage;
