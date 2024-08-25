"use client";

import { Card } from "@/app/_components/card";
import { CarouselButton } from "@/app/_components/carousel-button";
import { Button } from "@/app/_components/ui/button";
import { useCarousel } from "@/app/_hooks/use-carousel";
import { apiKey } from "@/app/utils/api-key";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SeriesTopRatedData {
  id: number;
  poster_path: string;
  name: string;
  vote_average: number;
}

export function SeriesTopRated() {
  const [seriesTopRatedData, setSeriesTopRatedData] = useState<
    SeriesTopRatedData[]
  >([]);
  const {
    isLeftDisabled,
    isRightDisabled,
    scrollLeft,
    scrollRight,
    carouselRef
  } = useCarousel();

  useEffect(() => {
    fetchSeriesTopRated();
  }, []);

  async function fetchSeriesTopRated() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setSeriesTopRatedData(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between lg:px-0">
        <div className="flex gap-3 items-center">
          <h2 className="font-semibold text-primary lg:text-lg">
            Séries melhores classificadas
          </h2>
          <div className="hidden lg:flex items-center gap-3">
            <CarouselButton
              direction="left"
              onClick={scrollLeft}
              disabled={isLeftDisabled}
            />
            <CarouselButton
              direction="right"
              onClick={scrollRight}
              disabled={isRightDisabled}
            />
          </div>
        </div>

        <Button
          variant="ghost"
          className="h-fit p-0 text-[#3a3cff] hover:bg-transparent"
          asChild
        >
          <Link href="/series-top-rated">
            Ver todos
            <ChevronRightIcon size={16} />
          </Link>
        </Button>
      </div>
      <section
        ref={carouselRef}
        className="flex gap-4 overflow-x-scroll  lg:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {seriesTopRatedData.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            poster_path={item.poster_path}
            name={item.name}
            vote_average={item.vote_average}
            href="/serie"
          />
        ))}
      </section>
    </>
  );
}
