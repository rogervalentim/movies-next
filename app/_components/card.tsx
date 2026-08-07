import { Clapperboard, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { extractYear } from "../utils/format-date";

interface CardProps {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  href: string;
  release_date?: string;
  first_air_date?: string;
  mediaLabel?: "Filme" | "Série";
}

export function Card({
  id,
  poster_path,
  title,
  name,
  vote_average,
  href,
  release_date,
  first_air_date,
  mediaLabel
}: CardProps) {
  const label = title || name || "Título não informado";
  const year = extractYear(release_date || first_air_date);
  const rating = Number.isFinite(vote_average) ? vote_average : 0;

  return (
    <article className="group w-[68%] min-w-[68%] shrink-0 min-[430px]:w-[calc(50%_-_0.5rem)] min-[430px]:min-w-[calc(50%_-_0.5rem)] sm:w-[calc(33.333%_-_0.7rem)] sm:min-w-[calc(33.333%_-_0.7rem)] lg:w-[calc(20%_-_0.8rem)] lg:min-w-[calc(20%_-_0.8rem)] 2xl:w-[calc(16.666%_-_0.85rem)] 2xl:min-w-[calc(16.666%_-_0.85rem)]">
      <Link
        href={`${href}/${id}`}
        className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]"
        aria-label={`Ver detalhes de ${label}`}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-card transition duration-300 group-hover:-translate-y-1 group-hover:border-red-500/50 group-hover:shadow-glow motion-reduce:transform-none">
          {poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={`Pôster de ${label}`}
              fill
              sizes="(max-width: 429px) 68vw, (max-width: 767px) 46vw, (max-width: 1023px) 31vw, (max-width: 1535px) 18vw, 15vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.045] motion-reduce:transform-none"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-950 to-[#151515] text-red-400">
              <Clapperboard className="size-9" aria-hidden="true" />
              <span className="sr-only">Imagem indisponível</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent" />
          {rating > 0 && (
            <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full border border-white/10 bg-black/75 px-2 py-1 text-xs font-bold text-white backdrop-blur-md">
              <Star className="size-3.5 fill-emerald-400 text-emerald-400" aria-hidden="true" />
              {rating.toFixed(1)}
            </div>
          )}
        </div>
        <div className="pt-3">
          <h3 className="truncate text-sm font-semibold text-slate-100 transition-colors group-hover:text-red-400 sm:text-base" title={label}>
            {label}
          </h3>
          <p className="mt-1 flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
            {year && <span>{year}</span>}
            {year && mediaLabel && <span aria-hidden="true">•</span>}
            {mediaLabel && <span>{mediaLabel}</span>}
          </p>
        </div>
      </Link>
    </article>
  );
}
