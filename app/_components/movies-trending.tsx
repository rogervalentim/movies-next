"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { Card } from "./card";

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
      console.log("movies trending", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="flex gap-4 overflow-x-scroll px-5 lg:gap-5  lg:px-0 [&::-webkit-scrollbar]:hidden">
        {moviesTrendingData.map((movie) => (
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
    </>
  );
}
