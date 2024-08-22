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
import { EpisodeItem } from "./episode-item";

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
  episode_number: number;
  runtime: number;
  still_path: string;
  vote_average: number;
  crew: [
    {
      id: number;
      profile_path: string;
      known_for_department: string;
    }
  ];
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
                  <EpisodeItem
                    key={item.id}
                    name={item.name}
                    still_path={item.still_path}
                    air_date={item.air_date}
                    overview={item.overview}
                    episode_number={item.episode_number}
                    runtime={item.runtime}
                    vote_average={item.vote_average}
                  />
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
