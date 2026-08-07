import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

interface CastCardProps {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export function CastCard({ id, name, character, profile_path }: CastCardProps) {
  return (
    <article className="group w-40 min-w-40 shrink-0 sm:w-44 sm:min-w-44">
      <Link href={`/person/${id}`} className="block rounded-2xl focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]" aria-label={`Ver perfil de ${name}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-card transition duration-300 group-hover:-translate-y-1 group-hover:border-red-500/50 motion-reduce:transform-none">
          {profile_path ? (
            <Image src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={`Foto de ${name}`} fill sizes="176px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-red-950 to-[#151515] text-red-200"><User className="size-9" /><span className="text-xs text-slate-400">Sem foto</span></div>
          )}
        </div>
        <div className="min-h-[74px] pt-3">
          <h3 className="truncate text-sm font-semibold text-white group-hover:text-red-400" title={name}>{name}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{character || "Personagem não informado"}</p>
        </div>
      </Link>
    </article>
  );
}
