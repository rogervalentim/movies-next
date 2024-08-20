"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { PersonDetailsData } from "../types";

export function usePersonDetails(id: number) {
  const [personDetails, setPersonDetails] = useState<PersonDetailsData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPersonDetail() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=pt-BR`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setPersonDetails(data);
      } catch (error) {
        setError("Error fetching person details.");
      }
    }

    fetchPersonDetail();
  }, [id]);

  return { personDetails, error };
}
