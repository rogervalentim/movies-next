"use client";

import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";
import { MovieImage } from "./movie-image";
import { Film, Image as ImageLucide, StarIcon, Users } from "lucide-react";
import { Loading } from "@/app/_components/loading";
import { Videos } from "@/app/_components/videos";
import { Images } from "@/app/_components/images";
import { Cast } from "@/app/_components/cast";
import { Recommended } from "@/app/_components/recommended";
import { Similar } from "@/app/_components/similar";

interface MovieDetailsProps {
  id: number;
}

interface MovieDetailsData {
  poster_path: string;
  overview: string;
  title: string;
  vote_average: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}

export function MovieDetails({ id }: MovieDetailsProps) {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const [showActors, setShowActors] = useState(true);
  const [showImages, setShowImages] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

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

  function toggleActors() {
    setShowActors(true);
    setShowImages(false);
    setShowVideos(false);
  }

  function toggleImages() {
    setShowActors(false);
    setShowImages(true);
    setShowVideos(false);
  }

  function toggleVideos() {
    setShowVideos(true);
    setShowActors(false);
    setShowImages(false);
  }

  return (
    <div>
      {movieDetails ? (
        <>
          <MovieImage
            poster_path={movieDetails.poster_path}
            title={movieDetails.title}
          />

          <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl space-y-4 rounded-tr-3xl bg-white py-5 lg:hidden ">
            <div className="px-5 space-y-4">
              <div className="flex justify-between items-start">
                <h1 className="text-xl font-semibold">{movieDetails.title}</h1>
                <div className="flex items-center gap-1 rounded-full bg-foreground px-1.5 py-[2px] text-white">
                  <StarIcon
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span className="font-semibold text-lg">
                    {movieDetails.vote_average.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 overflow-x-scroll  lg:hidden [&::-webkit-scrollbar]:hidden">
                {movieDetails.genres.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="flex items-center justify-center gap-3 font-semibold rounded-full bg-white px-4 py-3 shadow-md"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <h3 className="font-semibold">Descrição</h3>
              <p className="text-sm text-muted-foreground">
                {movieDetails.overview.length === 0
                  ? "Esse filme não tem descrição"
                  : movieDetails.overview}
              </p>
            </div>

            <div className="flex gap-4 overflow-x-scroll px-5 lg:hidden [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                className={`flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-md ${
                  showActors
                    ? "bg-[#3a3cff] text-white active:bg-[#3a3cff]"
                    : "bg-white text-[#323232] hover:bg-[#3a3cff] hover:text-white"
                }`}
                onClick={toggleActors}
              >
                <Users size={20} />
                <span className="text-sm font-semibold">Elenco</span>
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-md ${
                  showImages
                    ? "bg-[#3a3cff] text-white active:bg-[#3a3cff]"
                    : "bg-white text-[#323232] hover:bg-[#3a3cff] hover:text-white"
                }`}
                onClick={toggleImages}
              >
                <ImageLucide size={20} />
                <span className="text-sm font-semibold">Imagens</span>
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-md ${
                  showVideos
                    ? "bg-[#3a3cff] text-white active:bg-[#3a3cff]"
                    : "bg-white text-[#323232] hover:bg-[#3a3cff] hover:text-white"
                }`}
                onClick={toggleVideos}
              >
                <Film size={20} />
                <span className="text-sm font-semibold">Videos</span>
              </button>
            </div>

            {showActors && (
              <div className=" px-5">
                <Cast id={id} contentType="movie" />
              </div>
            )}

            {showImages && (
              <div className=" px-5 space-y-4">
                <Images id={id} contentType="movie" />
              </div>
            )}

            {showVideos && (
              <div className=" px-5">
                <Videos id={id} contentType="movie" />
              </div>
            )}

            <div className="space-y-4 px-5 lg:px-32">
              <Recommended
                id={id}
                title="Filmes recomendados"
                contentType="movie"
              />
            </div>

            <div className="space-y-4  px-5 lg:px-32">
              <Similar id={id} title="Filmes como este" contentType="movie" />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
