"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { MovieDetailsData } from "../types";

export function useMovieDetails(id: number) {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovieDetail() {
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") setError("Não foi possível carregar os detalhes deste filme.");
      }
    }

    fetchMovieDetail();
    return () => controller.abort();
  }, [id, retryKey]);

  return { movieDetails, error, refetch: () => setRetryKey((value) => value + 1) };
}
