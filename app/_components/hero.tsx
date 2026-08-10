"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ChevronRight,
  Clapperboard,
  Play,
  RotateCcw,
  Star,
} from "lucide-react";
import { apiKey } from "../utils/api-key";
import { extractYear } from "../utils/format-date";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface HeroProps {
  contentType: "movie" | "tv" | string;
}

interface HeroItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

interface Video {
  key: string;
  name: string;
  type: string;
  site: string;
}

export function Hero({ contentType }: HeroProps) {
  const normalizedType = contentType === "tv" ? "tv" : "movie";
  const [items, setItems] = useState<HeroItem[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const loadHero = useCallback(
    async (signal: AbortSignal) => {
      setIsLoading(true);
      setError(false);
      try {
        const [trendingResponse, genresResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/trending/${normalizedType}/day?api_key=${apiKey}&language=pt-BR`,
            { signal },
          ),
          fetch(
            `https://api.themoviedb.org/3/genre/${normalizedType}/list?api_key=${apiKey}&language=pt-BR`,
            { signal },
          ),
        ]);
        if (!trendingResponse.ok || !genresResponse.ok) {
          throw new Error("Falha ao carregar destaque");
        }
        const [trendingData, genresData] = await Promise.all([
          trendingResponse.json(),
          genresResponse.json(),
        ]);
        setItems(
          (trendingData.results ?? [])
            .filter((item: HeroItem) => item.poster_path)
            .slice(0, 3),
        );
        setGenres(genresData.genres ?? []);
        setActiveIndex(0);
      } catch (requestError) {
        if ((requestError as Error).name !== "AbortError") setError(true);
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    },
    [normalizedType],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadHero(controller.signal);
    return () => controller.abort();
  }, [loadHero, retryKey]);

  const activeItem = items[activeIndex];

  useEffect(() => {
    if (!activeItem) return;
    const controller = new AbortController();
    setTrailer(null);
    fetch(
      `https://api.themoviedb.org/3/${normalizedType}/${activeItem.id}/videos?api_key=${apiKey}&language=pt-BR`,
      { signal: controller.signal },
    )
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        const videos = (data.results ?? []) as Video[];
        setTrailer(
          videos.find(
            (video) => video.site === "YouTube" && video.type === "Trailer",
          ) ??
            videos.find((video) => video.site === "YouTube") ??
            null,
        );
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [activeItem, normalizedType]);

  useEffect(() => {
    if (
      items.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 8000);
    return () => window.clearInterval(interval);
  }, [items.length]);

  const activeGenres = useMemo(() => {
    if (!activeItem) return [];
    return activeItem.genre_ids
      .map((genreId) => genres.find((genre) => genre.id === genreId)?.name)
      .filter(Boolean)
      .slice(0, 3) as string[];
  }, [activeItem, genres]);

  if (isLoading) {
    return (
      <div
        className="skeleton-shimmer min-h-[650px] w-full rounded-[1.5rem] sm:min-h-[610px] lg:min-h-[620px]"
        aria-label="Carregando destaque"
      />
    );
  }

  if (error || !activeItem) {
    return (
      <div className="glass-panel flex h-[440px] flex-col items-center justify-center rounded-[1.5rem] p-8 text-center">
        <Clapperboard className="size-10 text-red-400" />
        <h1 className="mt-4 text-2xl font-bold text-white">
          O destaque não pôde ser carregado
        </h1>
        <p className="mt-2 max-w-md text-slate-400">
          A conexão com o catálogo falhou. Tente novamente em instantes.
        </p>
        <Button
          variant="outline"
          className="mt-5"
          onClick={() => setRetryKey((value) => value + 1)}
        >
          <RotateCcw className="size-4" /> Tentar novamente
        </Button>
      </div>
    );
  }

  const title = activeItem.title || activeItem.name || "Título não informado";
  const year = extractYear(
    activeItem.release_date || activeItem.first_air_date,
  );
  const detailsHref =
    normalizedType === "tv"
      ? `/serie/${activeItem.id}`
      : `/movie/${activeItem.id}`;

  return (
    <section
      className="relative isolate min-h-[650px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#080808] shadow-[0_30px_80px_-32px_rgba(0,0,0,0.95)] sm:min-h-[610px] lg:min-h-[620px]"
      aria-label="Destaques do CineVerse"
    >
      <Image
        key={activeItem.id}
        src={`https://image.tmdb.org/t/p/original${activeItem.poster_path}`}
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1536px) 94vw, 1400px"
        className="scale-105 object-cover object-[70%_24%] opacity-60 blur-[2px] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700 lg:object-[76%_28%] lg:opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/70 to-black/10 lg:bg-gradient-to-r lg:from-[#070707] lg:via-[#070707]/90 lg:to-[#070707]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(229,9,20,0.22),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent" />

      <div className="relative z-10 grid min-h-[650px] items-end gap-10 px-5 py-8 sm:min-h-[610px] sm:px-9 sm:py-10 lg:min-h-[620px] lg:grid-cols-[minmax(0,1fr)_310px] lg:items-center lg:px-14 lg:py-12 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-16">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-500/15 px-3 py-1.5 text-red-100 shadow-[0_8px_30px_-14px_rgba(239,68,68,0.9)] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.9)]" />
              Em alta hoje
            </span>
            <span>{normalizedType === "tv" ? "Série" : "Filme"}</span>
          </div>

          <h1 className="max-w-[16ch] text-4xl font-black leading-[0.96] tracking-[-0.045em] text-white drop-shadow-2xl sm:text-5xl lg:text-6xl xl:text-7xl">
            {title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-200">
            {activeItem.vote_average > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 font-bold text-emerald-100 backdrop-blur-md">
                <Star className="size-3.5 fill-emerald-400 text-emerald-400" />
                {activeItem.vote_average.toFixed(1)}
              </span>
            )}
            {year && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 backdrop-blur-md">
                <Calendar className="size-3.5 text-slate-400" /> {year}
              </span>
            )}
            {activeGenres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-slate-300 backdrop-blur-md"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-200 line-clamp-3 sm:text-base sm:leading-7 lg:text-lg">
            {activeItem.overview ||
              "A sinopse deste título ainda não está disponível."}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={detailsHref}
              className="cinematic-button w-full min-[460px]:w-auto"
            >
              Ver detalhes <ChevronRight className="size-4" />
            </Link>
            {trailer && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-white/15 bg-black/35 px-5 text-white backdrop-blur-md hover:bg-white/10 hover:text-white min-[460px]:w-auto"
                    aria-label={`Assistir trailer de ${title}`}
                  >
                    <Play className="size-4 fill-current" /> Assistir trailer
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[calc(100%_-_2rem)] max-w-5xl border-white/10 bg-[#0c0c0c] p-2 sm:p-4">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Trailer de {title}</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video overflow-hidden rounded-xl bg-black">
                    <iframe
                      title={`Trailer de ${title}`}
                      src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                      className="h-full w-full border-0"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div
            className="mt-8 flex items-center gap-2"
            role="tablist"
            aria-label="Selecionar destaque"
          >
            {items.map((item, index) => {
              const itemTitle =
                item.title || item.name || `Destaque ${index + 1}`;
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Exibir ${itemTitle}`}
                  aria-selected={isActive}
                  className={`group flex h-10 items-center overflow-hidden rounded-full border text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "max-w-[190px] border-red-400/40 bg-red-500/20 px-3 text-white"
                      : "w-10 justify-center border-white/10 bg-black/35 text-slate-400 hover:border-white/25 hover:text-white"
                  }`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {isActive && (
                    <span className="ml-2 truncate border-l border-white/15 pl-2">
                      {itemTitle}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="relative hidden justify-center lg:flex"
          aria-hidden="true"
        >
          <div className="absolute -inset-8 rounded-full bg-red-500/15 blur-3xl" />
          <div className="relative aspect-[2/3] w-full max-w-[310px] rotate-[1.5deg] overflow-hidden rounded-[1.4rem] border border-white/15 bg-zinc-900 p-1.5 shadow-[0_34px_80px_-22px_rgba(0,0,0,1)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.015] xl:max-w-[330px]">
            <div className="relative size-full overflow-hidden rounded-[1.05rem]">
              <Image
                key={`poster-${activeItem.id}`}
                src={`https://image.tmdb.org/t/p/w780${activeItem.poster_path}`}
                alt=""
                fill
                sizes="330px"
                className="object-cover motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                #{String(activeIndex + 1).padStart(2, "0")} em destaque
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
