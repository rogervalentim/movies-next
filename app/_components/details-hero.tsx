"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clapperboard, Clock3, ExternalLink, Play, Star } from "lucide-react";
import { useVideos } from "../_hooks/use-videos";
import { apiKey } from "../utils/api-key";
import { extractYear } from "../utils/format-date";
import { formatDuration } from "../utils/format-duration";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface Genre {
  id: number;
  name: string;
}

interface DetailsHeroProps {
  id: number;
  contentType: "movie" | "tv";
  title: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average: number;
  genres: Genre[];
  date?: string;
  runtime?: number;
  seasons?: number;
  imdbId?: string;
}

export function DetailsHero({
  id,
  contentType,
  title,
  overview,
  poster_path,
  backdrop_path,
  vote_average,
  genres,
  date,
  runtime,
  seasons,
  imdbId
}: DetailsHeroProps) {
  const router = useRouter();
  const { data: videos = [] } = useVideos(id, contentType);
  const [externalImdbId, setExternalImdbId] = useState(imdbId || "");
  const trailer = videos.find((video) => video.site === "YouTube" && video.type === "Trailer") ?? videos.find((video) => video.site === "YouTube");

  useEffect(() => {
    if (imdbId) return;
    const controller = new AbortController();
    fetch(`https://api.themoviedb.org/3/${contentType}/${id}/external_ids?api_key=${apiKey}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setExternalImdbId(data.imdb_id || ""))
      .catch(() => undefined);
    return () => controller.abort();
  }, [contentType, id, imdbId]);

  const year = extractYear(date);
  const safeRating = Number.isFinite(vote_average) ? vote_average : 0;

  return (
    <section className="relative isolate min-h-[590px] overflow-hidden border-b border-white/[0.08] bg-[#080808] sm:min-h-[640px] lg:min-h-[680px]">
      {backdrop_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(229,9,20,0.2),transparent_38%),linear-gradient(135deg,#181818,#080808)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-black/25" />

      <div className="page-container relative z-10 flex min-h-[590px] items-end pb-10 pt-20 sm:min-h-[640px] sm:pb-12 lg:min-h-[680px] lg:items-center lg:pb-10 lg:pt-16">
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => router.back()}
          className="absolute left-4 top-5 bg-black/35 text-white backdrop-blur-md sm:left-6 lg:left-10 xl:left-16"
          aria-label="Voltar"
        >
          <ArrowLeft className="size-5" />
        </Button>

        <div className="grid w-full items-end gap-7 lg:grid-cols-[230px_minmax(0,720px)] lg:items-center lg:gap-10">
          <div className="hidden aspect-[2/3] overflow-hidden rounded-2xl border border-white/15 bg-[#151515] shadow-2xl lg:block">
            {poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={`Pôster de ${title}`}
                width={500}
                height={750}
                sizes="230px"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-red-400"><Clapperboard className="size-10" /><span className="text-xs text-slate-400">Pôster indisponível</span></div>
            )}
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red-400">{contentType === "tv" ? "Série" : "Filme"}</p>
            <h1 className="max-w-[18ch] text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white drop-shadow-xl sm:text-5xl lg:text-6xl">{title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
              <span className="inline-flex items-center gap-1.5 font-semibold text-white"><Star className="size-4 fill-emerald-400 text-emerald-400" /> {safeRating > 0 ? safeRating.toFixed(1) : "Sem nota"}</span>
              {year ? <span className="inline-flex items-center gap-1.5"><Calendar className="size-4" /> {year}</span> : <span>Data não informada</span>}
              {runtime ? <span className="inline-flex items-center gap-1.5"><Clock3 className="size-4" /> {formatDuration(runtime)}</span> : null}
              {seasons ? <span>{seasons} {seasons === 1 ? "temporada" : "temporadas"}</span> : null}
            </div>

            {genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {genres.map((genre) => <span key={genre.id} className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-md">{genre.name}</span>)}
              </div>
            )}

            <p className="mt-5 max-w-[65ch] text-sm leading-6 text-slate-200 sm:text-base sm:leading-7 line-clamp-5">{overview || "A sinopse deste título ainda não foi informada."}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              {trailer && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button aria-label={`Assistir trailer de ${title}`}><Play className="size-4 fill-current" /> Assistir trailer</Button>
                  </DialogTrigger>
                  <DialogContent className="w-[calc(100%_-_2rem)] max-w-5xl border-white/10 bg-[#0c0c0c] p-2 sm:p-4">
                    <DialogHeader className="sr-only"><DialogTitle>Trailer de {title}</DialogTitle></DialogHeader>
                    <div className="aspect-video overflow-hidden rounded-xl bg-black">
                      <iframe title={`Trailer de ${title}`} src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`} className="h-full w-full border-0" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {externalImdbId && (
                <Button asChild variant="outline" className="bg-black/30 text-white backdrop-blur-md">
                  <a href={`https://www.imdb.com/title/${externalImdbId}/`} target="_blank" rel="noreferrer" aria-label={`Abrir ${title} no IMDb em uma nova aba`}>
                    IMDb <ExternalLink className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
