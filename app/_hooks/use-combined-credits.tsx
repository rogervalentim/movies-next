"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";

interface CombinedCreditsData {
  id: number;
  original_title: string;
  backdrop_path: string;
  vote_average: number;
  popularity: number;
  name: string;
  title: string;
  release_date: string;
  first_air_date: string;
  media_type: "movie" | "tv";
}

export function useCombinedCredits(id: number) {
  const [latestWork, setLatestWork] = useState<CombinedCreditsData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCombinedCredits() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}&language=pt-BR`,
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        const credits = Array.isArray(data.cast) ? data.cast : [];
        const sortedMovies = [...credits]
          .filter((credit: CombinedCreditsData) => credit.backdrop_path)
          .sort(
            (a: CombinedCreditsData, b: CombinedCreditsData) =>
              new Date(b.release_date || b.first_air_date || 0).getTime() -
              new Date(a.release_date || a.first_air_date || 0).getTime(),
          );

        setLatestWork(sortedMovies[0] || null);
      } catch (error) {
        setError("Error fetching movie details.");
      }
    }

    fetchCombinedCredits();
  }, [id]);

  return { latestWork, error };
}
