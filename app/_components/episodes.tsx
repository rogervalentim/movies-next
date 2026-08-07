"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AlertCircle,
  ArrowRight,
  Clock3,
  Layers3,
  PlayCircle,
  Star
} from "lucide-react";
import { apiKey } from "../utils/api-key";
import { formatDuration } from "../utils/format-duration";
import { Button } from "./ui/button";

interface EpisodesProps {
  id: number;
  onShowSeasons: () => void;
}

interface EpisodesData {
  name: string;
  overview: string;
  id: number;
  runtime: number;
  season_number: number;
  still_path: string;
  episode_number: number;
  vote_average: number;
}

export function Episodes({ id, onShowSeasons }: EpisodesProps) {
  const [episodeData, setEpisodeData] = useState<EpisodesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBestEpisode() {
      setIsLoading(true);
      setIsError(false);

      try {
        const seriesResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`,
          { signal: controller.signal }
        );

        if (!seriesResponse.ok) {
          throw new Error("Não foi possível carregar a série");
        }

        const seriesData = await seriesResponse.json();
        const seasonNumbers = Array.from(
          { length: seriesData.number_of_seasons ?? 0 },
          (_, index) => index + 1
        );

        const seasonResponses = await Promise.all(
          seasonNumbers.map((season) =>
            fetch(
              `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${apiKey}&language=pt-BR`,
              { signal: controller.signal }
            )
          )
        );

        const seasons = await Promise.all(
          seasonResponses.filter((response) => response.ok).map((response) => response.json())
        );
        const episodes: EpisodesData[] = seasons.flatMap(
          (season) => season.episodes ?? []
        );
        const bestEpisode = episodes.reduce<EpisodesData | null>(
          (best, episode) =>
            !best || episode.vote_average > best.vote_average ? episode : best,
          null
        );

        setEpisodeData(bestEpisode);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setIsError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchBestEpisode();

    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <div className="skeleton-shimmer min-h-[380px] rounded-[1.75rem] border border-white/10" aria-label="Carregando episódio em destaque" />
    );
  }

  if (isError || !episodeData) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-[1.75rem] border border-white/10 bg-[#101010] p-8 text-center">
        <AlertCircle className="size-8 text-red-400" />
        <h2 className="mt-4 text-xl font-bold text-white">Destaque indisponível</h2>
        <p className="mt-2 max-w-md text-sm text-zinc-400">
          Ainda assim, você pode explorar todas as temporadas e episódios.
        </p>
        <Button className="mt-5 gap-2 bg-red-600 text-white hover:bg-red-500" onClick={onShowSeasons}>
          <Layers3 className="size-4" /> Ver temporadas
        </Button>
      </div>
    );
  }

  return (
    <section className="relative isolate min-h-[420px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101010] shadow-card" aria-labelledby="featured-episode-title">
      {episodeData.still_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w1280${episodeData.still_path}`}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1400px"
          className="-z-20 object-cover object-center opacity-60"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-transparent to-black/20" />

      <div className="flex min-h-[420px] items-end p-6 sm:p-8 lg:p-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-red-300">
            <PlayCircle className="size-4" /> Episódio em destaque
          </div>

          <p className="mt-5 text-sm font-bold text-red-400">
            T{String(episodeData.season_number).padStart(2, "0")} · EP{String(episodeData.episode_number).padStart(2, "0")}
          </p>
          <h2 id="featured-episode-title" className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
            {episodeData.name}
          </h2>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
            {episodeData.overview || "Sinopse ainda não disponível para este episódio."}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-zinc-200">
            {episodeData.vote_average > 0 && (
              <span className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-red-500/25 bg-red-500/10 px-3">
                <Star className="size-3.5 fill-red-500 text-red-500" />
                {episodeData.vote_average.toFixed(1)}
              </span>
            )}
            {episodeData.runtime > 0 && (
              <span className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-black/45 px-3 backdrop-blur-md">
                <Clock3 className="size-3.5" /> {formatDuration(episodeData.runtime)}
              </span>
            )}
          </div>

          <Button
            className="mt-7 min-h-11 gap-2 bg-red-600 px-5 text-white shadow-glow hover:bg-red-500"
            onClick={onShowSeasons}
          >
            Explorar temporadas <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
