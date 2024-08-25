"use client";

import { Card } from "@/app/_components/card";
import { CarouselButton } from "@/app/_components/carousel-button";
import { Button } from "@/app/_components/ui/button";
import { useCarousel } from "@/app/_hooks/use-carousel";
import { apiKey } from "@/app/utils/api-key";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MoviesTopRatedData {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

export function MoviesTopRated() {
  const [moviesTopRatedData, setMoviesTopRatedData] = useState<
    MoviesTopRatedData[]
  >([]);

  const {
    isLeftDisabled,
    isRightDisabled,
    scrollLeft,
    scrollRight,
    carouselRef
  } = useCarousel();

  useEffect(() => {
    fetchMoviesTopRated();
  }, []);

  async function fetchMoviesTopRated() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMoviesTopRatedData(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between  lg:px-0">
        <div className="flex gap-3 items-center">
          <h2 className="font-semibold text-primary lg:text-lg">
            Filmes melhores classificados
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
          <Link href="/movies-top-rated">
            Ver todos
            <ChevronRightIcon size={16} />
          </Link>
        </Button>
      </div>
      <section
        ref={carouselRef}
        className="flex gap-4 overflow-x-scroll  lg:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {moviesTopRatedData.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            poster_path={item.poster_path}
            title={item.title}
            vote_average={item.vote_average}
            href="/movie"
          />
        ))}
      </section>
    </>
  );
}
