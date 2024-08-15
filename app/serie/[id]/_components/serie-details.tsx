"use client";

import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";
import { SerieImage } from "./serie-image";
import {
  Film,
  Image as ImageLucide,
  SquareChartGantt,
  StarIcon,
  Users
} from "lucide-react";
import { Loading } from "@/app/_components/loading";
import { Videos } from "@/app/_components/videos";
import { Images } from "@/app/_components/images";
import { Cast } from "@/app/_components/cast";
import { Recommended } from "@/app/_components/recommended";
import { Similar } from "@/app/_components/similar";
import { Button } from "@/app/_components/ui/button";
import { Collection } from "@/app/_components/collection";
import { Overview } from "@/app/_components/overview";

interface SerieDetailsProps {
  id: number;
}

interface SerieDetailsData {
  poster_path: string;
  overview: string;
  name: string;
  vote_average: number;
  original_name: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  language: string;
  production_companies: [
    {
      name: string;
    }
  ];
  networks: [
    {
      name: string;
    }
  ];
  created_by: [
    {
      id: number;
      name: string;
    }
  ];
  spoken_languages: [
    {
      name: string;
    }
  ];
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}

export function SerieDetails({ id }: SerieDetailsProps) {
  const [serieDetails, setSerieDetails] = useState<SerieDetailsData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const [showOverview, setShowOverview] = useState(true);
  const [showActors, setShowActors] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  useEffect(() => {
    fetchSerieDetail();
  }, [id]);

  async function fetchSerieDetail() {
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
      setError("Error fetching serie details.");
      console.error(error);
    }
  }

  if (error) {
    return <p>{error}</p>;
  }

  function toggleOverview() {
    setShowOverview(true);
    setShowActors(false);
    setShowImages(false);
    setShowVideos(false);
  }

  function toggleActors() {
    setShowActors(true);
    setShowOverview(false);
    setShowImages(false);
    setShowVideos(false);
  }

  function toggleImages() {
    setShowActors(false);
    setShowImages(true);
    setShowVideos(false);
    setShowOverview(false);
  }

  function toggleVideos() {
    setShowVideos(true);
    setShowActors(false);
    setShowImages(false);
    setShowOverview(false);
  }

  return (
    <div>
      {serieDetails ? (
        <>
          <SerieImage
            poster_path={serieDetails.poster_path}
            name={serieDetails.name}
          />

          <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl space-y-4 rounded-tr-3xl bg-background py-5 lg:hidden ">
            <div className="px-5 space-y-4">
              <div className="flex justify-between items-start">
                <h1 className="text-xl font-semibold">{serieDetails.name}</h1>
                <div className="flex items-center gap-1 rounded-full bg-foreground text-background px-1.5 py-[2px] ">
                  <StarIcon
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span className="font-semibold text-lg">
                    {serieDetails.vote_average.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto lg:hidden [&::-webkit-scrollbar]:hidden py-2">
                {serieDetails.genres.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-center font-semibold rounded-full bg-secondary text-secondary-foreground px-4 py-1.5  shadow-md whitespace-nowrap"
                  >
                    {item.name}
                  </div>
                ))}
              </div>

              <h3 className="font-semibold">Descrição</h3>
              <p className="text-sm text-muted-foreground">
                {serieDetails.overview.length === 0
                  ? "Essa série não tem descrição"
                  : serieDetails.overview}
              </p>
            </div>

            <div className="flex gap-2 overflow-x-scroll px-5 lg:hidden [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                className={`flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-md ${
                  showOverview
                    ? "bg-[#3a3cff] text-white active:bg-[#3a3cff]"
                    : "bg-secondary text-secondary-foreground hover:bg-[#3a3cff] hover:text-white"
                }`}
                onClick={toggleOverview}
              >
                <SquareChartGantt size={20} />
                <span className="text-sm font-semibold">Resumo</span>
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-md ${
                  showActors
                    ? "bg-[#3a3cff] text-white active:bg-[#3a3cff]"
                    : "bg-secondary text-secondary-foreground hover:bg-[#3a3cff] hover:text-white"
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
                    : "bg-secondary text-secondary-foreground hover:bg-[#3a3cff] hover:text-white"
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
                    : "bg-secondary text-secondary-foreground hover:bg-[#3a3cff] hover:text-white"
                }`}
                onClick={toggleVideos}
              >
                <Film size={20} />
                <span className="text-sm font-semibold">Videos</span>
              </button>
            </div>

            {showOverview && (
              <div className="px-5">
                <Overview
                  original_name={serieDetails.original_name}
                  created_by={serieDetails.created_by}
                  first_air_date={serieDetails.first_air_date}
                  last_air_date={serieDetails.last_air_date}
                  number_of_seasons={serieDetails.number_of_seasons}
                  number_of_episodes={serieDetails?.number_of_episodes}
                  networks={serieDetails.networks}
                  spoken_languages={serieDetails?.spoken_languages}
                  production_companies={serieDetails?.production_companies}
                />
              </div>
            )}

            {showActors && (
              <div className="px-5">
                <Cast id={id} contentType="tv" />
              </div>
            )}

            {showImages && (
              <div className="px-5 space-y-4">
                <Images id={id} contentType="tv" />
              </div>
            )}

            {showVideos && (
              <div className="px-5">
                <Videos id={id} contentType="tv" />
              </div>
            )}

            <div className="space-y-4  px-5 lg:px-32">
              <Recommended
                id={id}
                title="Séries recomendados"
                contentType="tv"
              />
            </div>

            <div className="space-y-4  px-5 lg:px-32">
              <Similar id={id} title="Séries como essa" contentType="tv" />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
