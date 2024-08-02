"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { Card } from "./card";

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
      <section className="flex gap-4 overflow-x-scroll lg:gap-5   [&::-webkit-scrollbar]:hidden">
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
