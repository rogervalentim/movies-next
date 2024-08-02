"use client";

import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";
import { SerieImage } from "./serie-image";
import { Users, Image as ImageLucide, Film } from "lucide-react";
import { Loading } from "@/app/_components/loading";
import { Videos } from "@/app/_components/videos";
import { Images } from "@/app/_components/images";
import { Cast } from "@/app/_components/cast";
import { Recommended } from "@/app/_components/recommended";
import { Similar } from "@/app/_components/similar";

interface SerieDetailsProps {
  id: number;
}

interface SerieDetailsData {
  backdrop_path: string;
  overview: string;
  name: string;
}

export function SerieDetails({ id }: SerieDetailsProps) {
  const [serieDetails, setSerieDetails] = useState<SerieDetailsData | null>(
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
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setSerieDetails(data);
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
      {serieDetails ? (
        <>
          <SerieImage
            backdrop_path={serieDetails.backdrop_path}
            name={serieDetails.name}
          />
          <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 lg:hidden ">
            <div className="px-5 space-y-2">
              <h1 className="mb-3 mt-1 text-xl font-semibold">
                {serieDetails.name}
              </h1>
              <h3 className="font-semibold">Descrição</h3>
              <p className="text-sm text-muted-foreground">
                {serieDetails.overview}
              </p>
            </div>

            <div className="flex gap-4 overflow-x-scroll px-5 lg:hidden [&::-webkit-scrollbar]:hidden pt-10">
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
              <div className="pt-10 px-5">
                <Cast id={id} contentType="tv" />
              </div>
            )}

            {showImages && (
              <div className="pt-10 px-5 space-y-4">
                <Images id={id} contentType="tv" />
              </div>
            )}

            {showVideos && (
              <div className="pt-10 px-5">
                <Videos id={id} contentType="tv" />
              </div>
            )}

            <div className="space-y-4 pt-10 px-5 lg:px-32">
              <Recommended
                id={id}
                contentType="tv"
                title="Séries Recomendadas"
              />
            </div>

            <div className="space-y-4 pt-10 px-5 lg:px-32">
              <Similar id={id} contentType="tv" title="Séries como esta" />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
