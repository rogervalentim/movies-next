"use client";

import { apiKey } from "@/app/utils/api-key";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SerieDetailsProps {
  id: number;
}

interface SerieDetailsData {
  backdrop_path: string;
  overview: string;
  name: string;
}

export function SerieDetails({ id }: SerieDetailsProps) {
  const [movieDetails, setMovieDetails] = useState<SerieDetailsData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  async function fetchMovieDetail() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      setError("Error fetching movie details.");
      console.error(error);
    }
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {movieDetails ? (
        <>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
            alt={movieDetails.name}
            width={300}
            height={300}
          />
          <h1>{movieDetails.name}</h1>
          <p>{movieDetails.overview}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
