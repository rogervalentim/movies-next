"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { SerieDetailsData } from "../types";

export function useSerieDetails(id: number) {
  const [serieDetails, setSerieDetails] = useState<SerieDetailsData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchSerieDetail() {
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setSerieDetails(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") setError("Não foi possível carregar os detalhes desta série.");
      }
    }

    fetchSerieDetail();
    return () => controller.abort();
  }, [id, retryKey]);

  return { serieDetails, error, refetch: () => setRetryKey((value) => value + 1) };
}
