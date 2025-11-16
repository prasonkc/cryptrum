"use client";
import * as React from "react";
import ForumCard from "@/components/ForumCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

const LandingPage = () => {
  const [api, setApi] = React.useState<CarouselApi>();

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

  return (
    <div className="h-screen w-screen" onWheel={handleScroll}>
      <Carousel
        className="w-full max-w-[70%] m-auto flex"
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({delay: 3000})]}
        setApi={setApi}
      >
        <CarouselContent className="ml-1 my-5">
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
    </div>
  );
};

export default LandingPage;
