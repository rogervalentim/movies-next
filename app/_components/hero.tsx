"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight, Clapperboard, Play, RotateCcw, Star } from "lucide-react";
import { apiKey } from "../utils/api-key";
import { extractYear } from "../utils/format-date";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface HeroProps {
  contentType: "movie" | "tv" | string;
}

interface HeroItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
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

  const loadHero = useCallback(async (signal: AbortSignal) => {
    setIsLoading(true);
    setError(false);
    try {
      const [trendingResponse, genresResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/trending/${normalizedType}/day?api_key=${apiKey}&language=pt-BR`, { signal }),
        fetch(`https://api.themoviedb.org/3/genre/${normalizedType}/list?api_key=${apiKey}&language=pt-BR`, { signal })
      ]);
      if (!trendingResponse.ok || !genresResponse.ok) throw new Error("Falha ao carregar destaque");
      const [trendingData, genresData] = await Promise.all([trendingResponse.json(), genresResponse.json()]);
      setItems((trendingData.results ?? []).filter((item: HeroItem) => item.backdrop_path).slice(0, 3));
      setGenres(genresData.genres ?? []);
      setActiveIndex(0);
    } catch (requestError) {
      if ((requestError as Error).name !== "AbortError") setError(true);
    } finally {
      if (!signal.aborted) setIsLoading(false);
    }
  }, [normalizedType]);

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
    fetch(`https://api.themoviedb.org/3/${normalizedType}/${activeItem.id}/videos?api_key=${apiKey}&language=pt-BR`, {
      signal: controller.signal
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        const videos = (data.results ?? []) as Video[];
        setTrailer(
          videos.find((video) => video.site === "YouTube" && video.type === "Trailer") ??
            videos.find((video) => video.site === "YouTube") ??
            null
        );
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [activeItem, normalizedType]);

  useEffect(() => {
    if (items.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    return <div className="skeleton-shimmer h-[520px] w-full rounded-[1.25rem] sm:h-[570px] lg:h-[620px]" aria-label="Carregando destaque" />;
  }

  if (error || !activeItem) {
    return (
      <div className="glass-panel flex h-[440px] flex-col items-center justify-center rounded-[1.25rem] p-8 text-center">
        <Clapperboard className="size-10 text-red-400" />
        <h1 className="mt-4 text-2xl font-bold text-white">O destaque não pôde ser carregado</h1>
        <p className="mt-2 max-w-md text-slate-400">A conexão com o catálogo falhou. Tente novamente em instantes.</p>
        <Button variant="outline" className="mt-5" onClick={() => setRetryKey((value) => value + 1)}>
          <RotateCcw className="size-4" /> Tentar novamente
        </Button>
      </div>
    );
  }

  const title = activeItem.title || activeItem.name || "Título não informado";
  const year = extractYear(activeItem.release_date || activeItem.first_air_date);
  const detailsHref = normalizedType === "tv" ? `/serie/${activeItem.id}` : `/movie/${activeItem.id}`;

  return (
    <section className="relative isolate h-[520px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#101010] shadow-card sm:h-[570px] lg:h-[620px]" aria-label="Destaques do CineVerse">
      <Image
        key={activeItem.id}
        src={`https://image.tmdb.org/t/p/original${activeItem.backdrop_path}`}
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1536px) 94vw, 1400px"
        className="object-cover object-center motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,transparent_0,rgba(7,10,15,0.2)_42%,rgba(7,10,15,0.65)_100%)]" />

      <div className="relative z-10 flex h-full max-w-3xl flex-col justify-end px-5 pb-28 pt-24 sm:px-8 sm:pb-32 lg:justify-center lg:px-14 lg:pb-20 lg:pt-20">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 sm:text-sm">
          <span className="rounded-full border border-red-500/30 bg-red-500/15 px-3 py-1 text-red-200">Em alta hoje</span>
          <span>{normalizedType === "tv" ? "Série" : "Filme"}</span>
        </div>

        <h1 className="max-w-[16ch] text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white drop-shadow-2xl sm:text-5xl lg:text-7xl">
          {title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-200">
          {year && (
            <span className="inline-flex items-center gap-1.5"><Calendar className="size-4 text-slate-400" /> {year}</span>
          )}
          {activeItem.vote_average > 0 && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-white">
              <Star className="size-4 fill-emerald-400 text-emerald-400" /> {activeItem.vote_average.toFixed(1)}
            </span>
          )}
          {activeGenres.map((genre) => <span key={genre} className="text-slate-300">{genre}</span>)}
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-200 line-clamp-3 sm:text-base sm:leading-7 lg:text-lg">
          {activeItem.overview || "A sinopse deste título ainda não está disponível."}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={detailsHref} className="cinematic-button">
            Ver detalhes <ChevronRight className="size-4" />
          </Link>
          {trailer && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-black/35 px-5 text-white backdrop-blur-sm" aria-label={`Assistir trailer de ${title}`}>
                  <Play className="size-4 fill-current" /> Assistir trailer
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[calc(100%_-_2rem)] max-w-5xl border-white/10 bg-[#0c0c0c] p-2 sm:p-4">
                <DialogHeader className="sr-only"><DialogTitle>Trailer de {title}</DialogTitle></DialogHeader>
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
      </div>

      <div className="absolute inset-x-4 bottom-4 z-20 grid grid-cols-3 gap-2 sm:inset-x-8 sm:bottom-6 lg:left-auto lg:right-8 lg:w-[480px]">
        {items.map((item, index) => {
          const itemTitle = item.title || item.name || `Destaque ${index + 1}`;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Exibir ${itemTitle}`}
              aria-pressed={activeIndex === index}
              className={`min-h-16 overflow-hidden rounded-xl border px-3 py-2 text-left text-xs font-semibold backdrop-blur-md transition sm:min-h-[72px] sm:text-sm ${
                activeIndex === index
                  ? "border-red-500/60 bg-red-500/25 text-white shadow-glow"
                  : "border-white/10 bg-black/45 text-slate-300 hover:border-white/25 hover:bg-black/60 hover:text-white"
              }`}
            >
              <span className="line-clamp-2">{itemTitle}</span>
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
