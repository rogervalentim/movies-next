"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { Card } from "./card";
import { Button } from "./ui/button";
import Link from "next/link";
import { CarouselButton } from "./carousel-button";
import { ChevronRightIcon } from "lucide-react";
import { useCarousel } from "../_hooks/use-carousel";

interface MoviesTrendingProps {
  id: number;
  poster_path: string;
  title: string | undefined;
  vote_average: number;
  href: string;
}

export function MoviesTrending() {
  const [moviesTrendingData, setMoviesTrendingData] = useState<
    MoviesTrendingProps[]
  >([]);
  const {
    isLeftDisabled,
    isRightDisabled,
    scrollLeft,
    scrollRight,
    carouselRef
  } = useCarousel();

  useEffect(() => {
    fetchMoviesTrending();
  }, []);

  async function fetchMoviesTrending() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMoviesTrendingData(data.results);
      console.log("movies trending", data.total_results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between lg:px-0">
        <div className="flex gap-3 items-center">
          <h2 className="font-semibold text-primary lg:text-lg">
            Filmes em tendência
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
          <Link href="/movies-trending">
            Ver todos
            <ChevronRightIcon size={16} />
          </Link>
        </Button>
      </div>

      <section
        ref={carouselRef}
        className="flex gap-4 overflow-x-scroll lg:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {moviesTrendingData.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
            href="/movie"
          />
        ))}
      </section>
    </>
  );
}
