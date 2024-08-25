"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { Card } from "./card";
import { CarouselButton } from "./carousel-button";
import { useCarousel } from "../_hooks/use-carousel";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

interface SeriesTrendingProps {
  id: number;
  poster_path: string;
  name: string | undefined;
  vote_average: number;
  href: string;
}

export function SeriesTrending() {
  const [moviesTrendingData, setMoviesTrendingData] = useState<
    SeriesTrendingProps[]
  >([]);

  useEffect(() => {
    fetchMoviesTrending();
  }, []);

  const {
    isLeftDisabled,
    isRightDisabled,
    scrollLeft,
    scrollRight,
    carouselRef
  } = useCarousel();

  async function fetchMoviesTrending() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMoviesTrendingData(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between lg:px-0">
        <div className="flex gap-3 items-center">
          <h2 className="font-semibold text-primary lg:text-lg">
            Séries em tendência
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
          <Link href="/series-trending">
            Ver todos
            <ChevronRightIcon size={16} />
          </Link>
        </Button>
      </div>

      <section
        ref={carouselRef}
        className="flex gap-4 overflow-x-scroll lg:gap-5   [&::-webkit-scrollbar]:hidden"
      >
        {moviesTrendingData.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            name={movie.name}
            vote_average={movie.vote_average}
            href="/serie"
          />
        ))}
      </section>
    </>
  );
}
