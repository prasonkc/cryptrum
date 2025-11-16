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

  React.useEffect(() => {
    if (!api) {
      return;
    }

    // DO something to scroll manually
  }, [api]);

  return (
    <div className="h-screen w-screen">
      <Carousel
        className="w-full max-w-[70%] m-auto flex"
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({delay: 2000})]}
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
