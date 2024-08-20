"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";

interface CombinedCreditsData {
  original_title: string;
  backdrop_path: string;
  vote_average: number;
  popularity: number;
  name: string;
  title: string;
  release_date: string;
}

export function useCombinedCredits(id: number) {
  const [latestWork, setLatestWork] = useState<CombinedCreditsData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCombinedCredits() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}&language=pt-BR`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        const sortedMovies = data.cast.sort(
          (a: CombinedCreditsData, b: CombinedCreditsData) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );

        setLatestWork(sortedMovies[0]);
      } catch (error) {
        setError("Error fetching movie details.");
      }
    }

    fetchCombinedCredits();
  }, [id]);

  return { latestWork, error };
}
