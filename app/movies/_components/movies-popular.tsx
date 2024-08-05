"use client";

import { Card } from "@/app/_components/card";
import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";

interface MoviesPopularData {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

export function MoviesPopular() {
  const [moviesPopularData, setMoviesPopularData] = useState<
    MoviesPopularData[]
  >([]);

  useEffect(() => {
    fetchMoviesPopular();
  }, []);

  async function fetchMoviesPopular() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMoviesPopularData(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex gap-4 overflow-x-scroll  lg:gap-5 [&::-webkit-scrollbar]:hidden">
      {moviesPopularData.map((item) => (
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
  );
}
