"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { SerieDetailsData } from "../types";

export function useSerieDetails(id: number) {
  const [serieDetails, setSerieDetails] = useState<SerieDetailsData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSerieDetail() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setSerieDetails(data);
      } catch (error) {
        setError("Error fetching movie details.");
      }
    }

    fetchSerieDetail();
  }, [id]);

  return { serieDetails, error };
}
