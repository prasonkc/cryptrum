import ForumCard from "@/components/ForumCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const page = () => {
  return (
    <div className="h-screen w-screen">
      <Carousel className="w-full max-w-[70%] m-auto flex" opts={{align: "start", loop: true}}>
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>{" "}
    </div>
  );
};

export default page;
