"use client";

import { Card } from "@/app/_components/card";
import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";
import { useCarousel } from "../_hooks/use-carousel";
import { CarouselButton } from "./carousel-button";

interface RecommendedProps {
  id: number;
  title: string;
  contentType: string;
}

interface RecommendedData {
  id: number;
  poster_path: string;
  name: string;
  title: string;
  vote_average: number;
  href: string;
}

export function Recommended({ id, title, contentType }: RecommendedProps) {
  const [recommendedMovies, setRecommendedMovies] = useState<RecommendedData[]>(
    []
  );
  const [hasMovies, setHasMovies] = useState<boolean>(false);

  useEffect(() => {
    fetchRecommendedMovies();
  }, [id]);

  const { isRightDisabled, scrollLeft, scrollRight, carouselRef } =
    useCarousel();

  async function fetchRecommendedMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}/recommendations?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setRecommendedMovies(data.results);
      setHasMovies(data.results.length > 0);
    } catch (error) {
      console.log(error);
    }
  }

  if (!hasMovies) {
    return null;
  }

  return (
    <>
      <div className="lg:px-0">
        <div className="flex gap-3 items-center">
          <h2 className="font-semibold text-primary lg:text-lg">{title}</h2>
          <div className="hidden lg:flex items-center gap-3">
            <CarouselButton
              direction="left"
              onClick={scrollLeft}
              disabled={false}
            />
            <CarouselButton
              direction="right"
              onClick={scrollRight}
              disabled={isRightDisabled}
            />
          </div>
        </div>
      </div>
      <section
        ref={carouselRef}
        className="flex gap-4 overflow-x-scroll lg:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {recommendedMovies.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            name={movie.name}
            vote_average={movie.vote_average}
            href={contentType === "tv" ? "/serie" : "/movie"}
          />
        ))}
      </section>
    </>
  );
}
