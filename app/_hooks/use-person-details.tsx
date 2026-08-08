"use client";

import { useCallback, useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { PersonDetailsData } from "../types";

export function usePersonDetails(id: number) {
  const [personDetails, setPersonDetails] = useState<PersonDetailsData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const refetch = useCallback(() => {
    setPersonDetails(null);
    setError(null);
    setRequestVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPersonDetail() {
      try {
        setError(null);
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=pt-BR`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setPersonDetails(data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setError("Não foi possível carregar os dados desta pessoa.");
      }
    }

    fetchPersonDetail();
    return () => controller.abort();
  }, [id, requestVersion]);

  return { personDetails, error, refetch };
}
