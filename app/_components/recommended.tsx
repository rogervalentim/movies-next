"use client";

import { Card } from "@/app/_components/card";
import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";

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
        <h2 className="font-semibold text-primary">{title}</h2>
      </div>
      <section className="flex gap-4 overflow-x-scroll lg:gap-5 [&::-webkit-scrollbar]:hidden">
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
