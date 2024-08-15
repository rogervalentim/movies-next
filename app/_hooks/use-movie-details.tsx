"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { MovieDetailsData } from "../types";

export function useMovieDetails(id: number) {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        setError("Error fetching movie details.");
      }
    }

    fetchMovieDetail();
  }, [id]);

  return { movieDetails, error };
}
