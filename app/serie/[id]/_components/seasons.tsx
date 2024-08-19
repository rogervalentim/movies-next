"use client";

import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";
import { SeasonsItem } from "./seasons-item";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/app/_components/ui/dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { formatDuration } from "@/app/utils/format-duration";
import { formatDate } from "@/app/utils/format-date";

interface SeasonsProps {
  id: number;
}

interface SeasonsData {
  episode_count: number;
  id: number;
  name: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  season_number: number;
}

interface EpisodeData {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  runtime: number;
  still_path: string;
  vote_average: number;
}

export function Seasons({ id }: SeasonsProps) {
  const [seasonsData, setSeasonsData] = useState<SeasonsData[]>([]);
  const [episodesData, setEpisodesData] = useState<EpisodeData[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      fetchSeasons();
    }
  }, [id]);

  async function fetchSeasons() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch series details");
      }
      const data = await response.json();
      setSeasonsData(data.seasons);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchEpisodes(seasonNumber: number) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${apiKey}&language=pt-BR`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch episodes");
      }
      const data = await response.json();
      setEpisodesData(data.episodes);
      console.log(data.episodes);
      setSelectedSeason(seasonNumber);
    } catch (error) {
      console.log(error);
    }
  }

  const selectedSeasonData = seasonsData.find(
    (season) => season.season_number === selectedSeason
  );

  return (
    <>
      {seasonsData.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-5 pt-4">
          {seasonsData.map((season) => (
            <button
              key={season.id}
              onClick={() => fetchEpisodes(season.season_number)}
            >
              <SeasonsItem
                poster_path={season.poster_path}
                name={season.name}
                vote_average={season.vote_average}
                episode_count={season.episode_count}
              />
            </button>
          ))}
        </div>
      )}

      {selectedSeason !== null && (
        <Dialog
          modal
          open={selectedSeason !== null}
          onOpenChange={() => setSelectedSeason(null)}
        >
          <DialogContent className="max-w-screen-lg pb-10">
            <ScrollArea className="max-h-[80dvh] md:pr-4">
              <DialogHeader>
                <DialogTitle>Temporada {selectedSeason}</DialogTitle>
                <DialogDescription>
                  {selectedSeasonData?.overview || "Descrição não disponível."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  mt-4">
                {episodesData?.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center bg-background border border-border rounded-lg shadow"
                  >
                    {item.still_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w780${item.still_path}`}
                        alt={item.name}
                        width={0}
                        height={0}
                        quality={100}
                        sizes="100vh"
                        className="rounded-t-lg shadow-md h-60  w-full"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full h-56 lg:h-60 bg-[#3a3cff] rounded-lg shadow-md" />
                    )}
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-lg font-bold tracking-tight text-primary">
                        {item.name}
                      </h5>
                      <p className="mb-3 font-normal text-muted-foreground">
                        {item.overview}
                      </p>
                      <div className="flex gap-3 items-center">
                        <div className="text-primary">
                          {item.vote_average.toFixed(2)}
                        </div>
                        <div>{formatDuration(item.runtime)}</div>
                        <div>{formatDate(item.air_date)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
