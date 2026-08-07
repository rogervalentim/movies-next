"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Layers3,
  LoaderCircle,
  PlayCircle,
  UsersRound
} from "lucide-react";
import { apiKey } from "@/app/utils/api-key";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/app/_components/ui/dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TabButton } from "@/app/_components/tab-button";
import { SeasonsItem } from "./seasons-item";
import { EpisodeItem } from "./episode-item";
import { CrewItem } from "./crew-item";

interface SeasonsProps {
  id: number;
}

interface SeasonsData {
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface CrewProps {
  id: number;
  name: string;
  job: string;
  profile_path: string;
}

interface GuestStarsProps {
  id: number;
  name: string;
  profile_path: string;
  character: string;
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
  crew?: CrewProps[];
  guest_stars?: GuestStarsProps[];
}

const TABS = {
  EPISODES: "episodes",
  CREW: "crew",
  GUEST_STARS: "guest-stars"
} as const;

export function Seasons({ id }: SeasonsProps) {
  const [seasonsData, setSeasonsData] = useState<SeasonsData[]>([]);
  const [episodesData, setEpisodesData] = useState<EpisodeData[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>(TABS.EPISODES);
  const [isLoadingSeasons, setIsLoadingSeasons] = useState(true);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);
  const [seasonsError, setSeasonsError] = useState(false);
  const [episodesError, setEpisodesError] = useState(false);

  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSeasons() {
      setIsLoadingSeasons(true);
      setSeasonsError(false);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Não foi possível carregar as temporadas");
        }

        const data = await response.json();
        setSeasonsData(data.seasons ?? []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setSeasonsError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingSeasons(false);
        }
      }
    }

    fetchSeasons();

    return () => controller.abort();
  }, [id]);

  async function fetchEpisodes(seasonNumber: number) {
    setSelectedSeason(seasonNumber);
    setActiveTab(TABS.EPISODES);
    setEpisodesData([]);
    setEpisodesError(false);
    setIsLoadingEpisodes(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${apiKey}&language=pt-BR`
      );

      if (!response.ok) {
        throw new Error("Não foi possível carregar os episódios");
      }

      const data = await response.json();
      setEpisodesData(data.episodes ?? []);
    } catch {
      setEpisodesError(true);
    } finally {
      setIsLoadingEpisodes(false);
    }
  }

  const selectedSeasonData = seasonsData.find(
    (season) => season.season_number === selectedSeason
  );

  const uniqueCrew = useMemo(() => {
    const crewMap = new Map<number, CrewProps>();
    episodesData.forEach((episode) =>
      episode.crew?.forEach((crewMember) =>
        crewMap.set(crewMember.id, crewMember)
      )
    );
    return Array.from(crewMap.values());
  }, [episodesData]);

  const uniqueGuestStars = useMemo(() => {
    const guestStarsMap = new Map<number, GuestStarsProps>();
    episodesData.forEach((episode) =>
      episode.guest_stars?.forEach((castMember) =>
        guestStarsMap.set(castMember.id, castMember)
      )
    );
    return Array.from(guestStarsMap.values());
  }, [episodesData]);

  const renderContent = () => {
    if (isLoadingEpisodes) {
      return (
        <div className="grid gap-4 lg:grid-cols-2" aria-label="Carregando episódios">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-[#151515]">
              <div className="skeleton-shimmer aspect-video" />
              <div className="space-y-3 p-5">
                <div className="skeleton-shimmer h-5 w-3/5 rounded-md" />
                <div className="skeleton-shimmer h-4 w-full rounded-md" />
                <div className="skeleton-shimmer h-4 w-4/5 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (episodesError) {
      return (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center text-red-100">
          <AlertCircle className="mx-auto size-8 text-red-400" />
          <p className="mt-3 font-semibold">Não foi possível carregar esta temporada.</p>
          <button
            type="button"
            className="mt-4 min-h-11 rounded-xl border border-red-500/35 px-4 text-sm font-semibold hover:bg-red-500/15"
            onClick={() => selectedSeason !== null && fetchEpisodes(selectedSeason)}
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    if (activeTab === TABS.CREW) {
      return uniqueCrew.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {uniqueCrew.map((crewMember) => (
            <CrewItem
              key={crewMember.id}
              id={crewMember.id}
              name={crewMember.name}
              profile_path={crewMember.profile_path}
              job={crewMember.job}
            />
          ))}
        </div>
      ) : (
        <EmptySeasonState message="A equipe desta temporada ainda não foi informada." />
      );
    }

    if (activeTab === TABS.GUEST_STARS) {
      return uniqueGuestStars.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {uniqueGuestStars.map((castMember) => (
            <CrewItem
              key={castMember.id}
              id={castMember.id}
              name={castMember.name}
              profile_path={castMember.profile_path}
              character={castMember.character}
            />
          ))}
        </div>
      ) : (
        <EmptySeasonState message="Não há participações especiais cadastradas." />
      );
    }

    return episodesData.length ? (
      <div className="grid gap-4 lg:grid-cols-2">
        {episodesData.map((item) => (
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
    ) : (
      <EmptySeasonState message="Nenhum episódio disponível para esta temporada." />
    );
  };

  if (seasonsError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center text-red-100">
        <AlertCircle className="mx-auto size-8 text-red-400" />
        <p className="mt-3 font-semibold">Não foi possível carregar as temporadas.</p>
      </div>
    );
  }

  return (
    <section aria-labelledby="seasons-title">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            Guia de episódios
          </p>
          <h2 id="seasons-title" className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Temporadas
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Escolha uma temporada para ver episódios, equipe e participações especiais.
          </p>
        </div>

        {!isLoadingSeasons && (
          <span className="inline-flex min-h-10 w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-semibold text-zinc-300">
            <Layers3 className="size-4 text-red-400" />
            {seasonsData.length} {seasonsData.length === 1 ? "temporada" : "temporadas"}
          </span>
        )}
      </div>

      {isLoadingSeasons ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" aria-label="Carregando temporadas">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton-shimmer aspect-[2/3] rounded-2xl" />
          ))}
        </div>
      ) : seasonsData.length ? (
        <div id="seasons" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {seasonsData.map((season) => (
            <button
              type="button"
              key={season.id}
              onClick={() => fetchEpisodes(season.season_number)}
              className="group rounded-2xl text-left focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]"
              aria-label={`Abrir ${season.name}, ${season.episode_count} episódios`}
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
      ) : (
        <EmptySeasonState message="Nenhuma temporada disponível para esta série." />
      )}

      <Dialog
        modal
        open={selectedSeason !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedSeason(null);
        }}
      >
        <DialogContent className="w-[calc(100%_-_2rem)] max-w-6xl border-white/10 bg-[#0c0c0c] p-0 text-white">
          <ScrollArea className="max-h-[90dvh]">
            <div className="p-5 sm:p-7 lg:p-8">
              <DialogHeader className="pr-8 text-left">
                <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-red-300">
                  <PlayCircle className="size-4" /> Guia da temporada
                </div>
                <DialogTitle className="text-2xl font-black tracking-tight sm:text-3xl">
                  {selectedSeasonData?.name || `Temporada ${selectedSeason}`}
                </DialogTitle>
                <DialogDescription className="max-w-3xl pt-2 leading-6 text-zinc-400">
                  {selectedSeasonData?.overview ||
                    "Explore todos os episódios e os profissionais que deram vida a esta temporada."}
                </DialogDescription>
              </DialogHeader>

              <div className="scrollbar-none mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Conteúdo da temporada">
                <TabButton
                  onClick={() => handleTabClick(TABS.EPISODES)}
                  isActive={activeTab === TABS.EPISODES}
                  label={`Episódios (${episodesData.length})`}
                />
                <TabButton
                  onClick={() => handleTabClick(TABS.CREW)}
                  isActive={activeTab === TABS.CREW}
                  label={`Equipe (${uniqueCrew.length})`}
                />
                <TabButton
                  onClick={() => handleTabClick(TABS.GUEST_STARS)}
                  isActive={activeTab === TABS.GUEST_STARS}
                  label={`Participações (${uniqueGuestStars.length})`}
                />
              </div>

              <div className="mt-5" role="tabpanel">
                {renderContent()}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function EmptySeasonState({ message }: { message: string }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.025] p-8 text-center">
      <UsersRound className="size-8 text-red-400" />
      <p className="mt-3 text-sm text-zinc-400">{message}</p>
    </div>
  );
}
