"use client";

import { Card } from "@/app/_components/card";
import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";

interface RecommendedMoviesProps {
  id: number;
}

interface RecommendedMoviesData {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  href: string;
}

export function RecommendedMovies({ id }: RecommendedMoviesProps) {
  const [recommendedMovies, setRecommendedMovies] = useState<
    RecommendedMoviesData[]
  >([]);

  useEffect(() => {
    fetchRecommendedMovies();
  }, [id]);

  async function fetchRecommendedMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setRecommendedMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex gap-4 overflow-x-scroll  lg:gap-5  [&::-webkit-scrollbar]:hidden">
      {recommendedMovies.map((movie) => (
        <Card
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
          vote_average={movie.vote_average}
          href="/movies"
        />
      ))}
    </section>
  );
}
