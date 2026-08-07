import { formatDate } from "@/app/utils/format-date";
import { formatDuration } from "@/app/utils/format-duration";
import { CalendarDays, Clock3, ImageOff, Star } from "lucide-react";
import Image from "next/image";

interface EpisodeItemData {
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  runtime: number;
  still_path: string;
  vote_average: number;
}

export function EpisodeItem({
  name,
  overview,
  air_date,
  episode_number,
  runtime,
  still_path,
  vote_average
}: EpisodeItemData) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-card transition duration-300 hover:border-red-500/35">
      <div className="relative aspect-video overflow-hidden bg-[#1c1c1c]">
        {still_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w780${still_path}`}
            alt={`Cena do episódio ${episode_number}: ${name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-red-950 to-[#151515] text-red-300">
            <ImageOff className="size-8" />
            <span className="text-xs text-zinc-400">Imagem indisponível</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-lg bg-red-600 px-2.5 py-1 text-xs font-black text-white shadow-lg">
          EP {String(episode_number).padStart(2, "0")}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <h4 className="text-lg font-bold tracking-tight text-white">{name}</h4>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
          {overview || "Sinopse ainda não disponível para este episódio."}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-zinc-300">
          {vote_average > 0 && (
            <span className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-2.5">
              <Star className="size-3.5 fill-red-500 text-red-500" />
              {vote_average.toFixed(1)}
            </span>
          )}
          {runtime > 0 && (
            <span className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5">
              <Clock3 className="size-3.5" /> {formatDuration(runtime)}
            </span>
          )}
          {air_date && (
            <span className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5">
              <CalendarDays className="size-3.5" /> {formatDate(air_date)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
