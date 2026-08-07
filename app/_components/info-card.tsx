import { Clapperboard, Star, User } from "lucide-react";
import Image from "next/image";

interface InfoCardProps {
  title?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
  media_type?: string;
  vote_average: number;
  known_for_department?: string;
  year: string;
}

export function InfoCard({
  title,
  name,
  poster_path,
  profile_path,
  media_type,
  vote_average,
  year,
  known_for_department
}: InfoCardProps) {
  const label = title || name || "Nome não informado";
  const isPerson = media_type === "person" || Boolean(profile_path && !poster_path);
  const typeLabel = media_type === "movie" ? "Filme" : media_type === "tv" ? "Série" : isPerson ? "Pessoa" : undefined;

  return (
    <article className="group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-card transition duration-300 group-hover:-translate-y-1 group-hover:border-red-500/50 group-hover:shadow-glow motion-reduce:transform-none">
        {poster_path || profile_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path || profile_path}`}
            alt={isPerson ? `Foto de ${label}` : `Pôster de ${label}`}
            fill
            sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, (max-width: 1279px) 22vw, 18vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-red-950 to-[#151515] text-red-200">
            {isPerson ? <User className="size-9" /> : <Clapperboard className="size-9" />}
            <span className="text-xs text-slate-400">Imagem indisponível</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
        {vote_average > 0 && !isPerson && (
          <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/75 px-2 py-1 text-xs font-bold text-white backdrop-blur-md">
            <Star className="size-3.5 fill-emerald-400 text-emerald-400" />
            {vote_average.toFixed(1)}
          </span>
        )}
        {typeLabel && (
          <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-slate-100 backdrop-blur-md">
            {typeLabel}
          </span>
        )}
      </div>
      <div className="pt-3">
        <h2 className="truncate text-sm font-semibold text-white transition-colors group-hover:text-red-400 sm:text-base" title={label}>{label}</h2>
        <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
          {year || (isPerson ? known_for_department || "Pessoa" : "Data não informada")}
        </p>
      </div>
    </article>
  );
}
