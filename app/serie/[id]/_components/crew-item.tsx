import { ArrowUpRight, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CrewItemProps {
  id: number;
  profile_path: string;
  character?: string;
  name: string;
  job?: string;
}

export function CrewItem({
  id,
  profile_path,
  character,
  name,
  job
}: CrewItemProps) {
  const role = character || job || "Participação não informada";

  return (
    <Link
      href={`/person/${id}`}
      className="group block rounded-2xl focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]"
      aria-label={`Ver perfil de ${name}`}
    >
      <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-card transition duration-300 group-hover:-translate-y-1 group-hover:border-red-500/40 motion-reduce:transform-none">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#1c1c1c]">
          {profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${profile_path}`}
              alt={`Foto de ${name}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-red-950 to-[#151515] text-red-300">
              <UserRound className="size-9" />
              <span className="text-xs text-zinc-400">Sem foto</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
        </div>

        <div className="flex items-start justify-between gap-3 p-4">
          <div className="min-w-0">
            <h4 className="truncate font-bold text-white transition-colors group-hover:text-red-300">
              {name}
            </h4>
            <p className="mt-1 truncate text-sm text-zinc-400">{role}</p>
          </div>
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-zinc-600 transition-colors group-hover:text-red-400" />
        </div>
      </article>
    </Link>
  );
}
