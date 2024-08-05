"use client";

import { Card } from "@/app/_components/card";
import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";

interface MoviesNowPlayingData {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

export function MoviesNowPlaying() {
  const [moviesNowPlayingData, setMoviesNowPlayingData] = useState<
    MoviesNowPlayingData[]
  >([]);

  useEffect(() => {
    fetchMoviesNowPlaying();
  }, []);

  async function fetchMoviesNowPlaying() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMoviesNowPlayingData(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex gap-4 overflow-x-scroll  lg:gap-5 [&::-webkit-scrollbar]:hidden">
      {moviesNowPlayingData.map((item) => (
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
