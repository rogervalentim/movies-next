import { Clapperboard, Star } from "lucide-react";
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
    <div
      className="relative transition-transform duration-300 group hover:scale-105"
      id="seasons"
    >
      {poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={name}
          width={0}
          height={0}
          quality={100}
          sizes="100vh"
          className="rounded-lg w-full border border-border brightness-50 h-64 lg:h-96"
        />
      ) : (
        <div className="flex justify-center items-center w-full h-60 lg:h-96 bg-[#3a3cff] rounded-lg">
          <Clapperboard size={24} className="text-white" />
        </div>
      )}
      <div className="flex justify-between">
        {vote_average > 0 && (
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] text-[#323232]">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-semibold">{vote_average?.toFixed(2)}</span>
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-center items-start px-4 text-white rounded-lg">
          <span className="text-lg font-medium line-clamp-2 py-1">{name}</span>

          {episode_count && (
            <div className="flex justify-start items-center gap-[2px]">
              <span className="text-lg font-medium text-muted-foreground py-1">
                {episode_count} Episódios
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
