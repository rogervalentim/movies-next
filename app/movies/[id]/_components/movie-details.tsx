"use client";

import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";
import { MovieImage } from "./movie-image";
import { Button } from "@/app/_components/ui/button";
import {
  ChevronRightIcon,
  Film,
  Image as ImageLucide,
  Smile,
  Users
} from "lucide-react";
import { RecommendedMovies } from "./recommended-movies";
import { SimilarMovies } from "./similar-movies";
import { GiRevolver } from "react-icons/gi";
import { FaRegSadCry } from "react-icons/fa";
import { Cast } from "./cast";

interface MovieDetailsProps {
  id: number;
}

interface MovieDetailsData {
  backdrop_path: string;
  overview: string;
  title: string;
}

export function MovieDetails({ id }: MovieDetailsProps) {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const [showActors, setShowActors] = useState(true);

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  async function fetchMovieDetail() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`
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
          <MovieImage
            backdrop_path={movieDetails.backdrop_path}
            title={movieDetails.title}
          />

          <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 lg:hidden ">
            <div className="px-5 space-y-2">
              <h1 className="mb-3 mt-1 text-xl font-semibold">
                {movieDetails.title}
              </h1>
              <h3 className="font-semibold">Descrição</h3>
              <p className="text-sm text-muted-foreground">
                {movieDetails.overview}
              </p>
            </div>

            <div className="flex  gap-4 overflow-x-scroll px-5 lg:hidden  [&::-webkit-scrollbar]:hidden pt-10">
              <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
                <Users size={20} />
                <span className="text-sm font-semibold text-[#323232]">
                  Atores
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
                <ImageLucide size={20} />
                <span className="text-sm font-semibold text-[#323232]">
                  Imagens
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
                <Film size={20} />
                <span className="text-sm font-semibold text-[#323232]">
                  Videos
                </span>
              </div>
            </div>

            <div className="pt-10 px-5">
              <Cast id={id} />
            </div>

            <div className="space-y-4 pt-10 px-5 lg:px-32">
              <div className="flex items-center justify-between lg:px-0">
                <h2 className="font-semibold text-[#323232]">
                  Filmes recomendados
                </h2>

                <Button
                  variant="ghost"
                  className="h-fit p-0 text-[#3a3cff] hover:bg-transparent"
                  asChild
                >
                  <span>
                    Ver todos
                    <ChevronRightIcon size={16} />
                  </span>
                </Button>
              </div>
              <RecommendedMovies id={id} />
            </div>

            <div className="space-y-4 pt-10 px-5 lg:px-32">
              <div className="flex items-center justify-between lg:px-0">
                <h2 className="font-semibold text-[#323232]">
                  Filmes como este
                </h2>

                <Button
                  variant="ghost"
                  className="h-fit p-0 text-[#3a3cff] hover:bg-transparent"
                  asChild
                >
                  <span>
                    Ver todos
                    <ChevronRightIcon size={16} />
                  </span>
                </Button>
              </div>
              <SimilarMovies id={id} />
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
