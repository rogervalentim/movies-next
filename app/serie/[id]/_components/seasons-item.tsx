import { Clapperboard, PlayCircle, Star } from "lucide-react";
import Image from "next/image";

interface SeasonsItemProps {
  poster_path: string;
  vote_average: number;
  name: string;
  episode_count: number;
}

export function SeasonsItem({
  poster_path,
  vote_average,
  name,
  episode_count
}: SeasonsItemProps) {
  return (
    <article className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-[#151515] text-left shadow-card transition duration-300 group-hover:-translate-y-1 group-hover:border-red-500/50 group-hover:shadow-glow motion-reduce:transform-none">
      {poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={`Pôster de ${name}`}
          fill
          sizes="(max-width: 430px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-red-950 to-[#151515] text-red-300">
          <Clapperboard className="size-9" />
          <span className="text-xs text-zinc-400">Pôster indisponível</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

      {vote_average > 0 && (
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
          <Star className="size-3.5 fill-red-500 text-red-500" />
          {vote_average.toFixed(1)}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          <PlayCircle className="size-3.5" />
          {episode_count} {episode_count === 1 ? "episódio" : "episódios"}
        </div>
        <h3 className="line-clamp-2 text-base font-bold leading-tight text-white sm:text-lg">
          {name}
        </h3>
        <p className="mt-1 text-xs text-zinc-400">Toque para explorar</p>
      </div>
    </article>
  );
}
