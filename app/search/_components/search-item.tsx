import { Clapperboard, Star } from "lucide-react";
import Image from "next/image";

interface SearchItemProps {
  title: string;
  name: string;
  poster_path: string;
  profile_path: string;
  media_type: string;
  vote_average: number;
  known_for_department: string;
  year: string;
}

export function SearchItem({
  title,
  name,
  poster_path,
  profile_path,
  media_type,
  vote_average,
  year,
  known_for_department
}: SearchItemProps) {
  return (
    <div className="relative transition-transform duration-300  group-hover:scale-105">
      {poster_path || profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500/${poster_path || profile_path}`}
          alt={title || name}
          width={0}
          height={0}
          quality={100}
          sizes="100vh"
          className="rounded-lg  w-full brightness-50 h-64 lg:h-96 "
        />
      ) : (
        <div className="flex justify-center items-center w-full h-60 lg:h-96 bg-[#3a3cff] rounded-lg relative transition-transform duration-300 group-hover:scale-105">
          <Clapperboard size={24} className="text-white" />
        </div>
      )}
      <div className="flex justify-between">
        {vote_average && (
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] text-[#323232]">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-semibold">{vote_average?.toFixed(2)}</span>
          </div>
        )}

        <div className="absolute right-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] text-[#323232]">
          <span className="font-semibold ml-2 text-sm text-gray-700">
            {media_type === "movie"
              ? "Filme"
              : media_type === "tv"
                ? "Série"
                : known_for_department === "Acting"
                  ? "Pessoa"
                  : known_for_department === ""
                    ? "Indefinido"
                    : ""}
          </span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-start px-4 text-white  rounded-lg">
          <span className="text-lg font-medium line-clamp-2 py-1">
            {title || name}
          </span>

          <div className="flex justify-start items-center gap-[2px] rounded-full bg-white px-2 text-[#323232]">
            <span className="text-lg font-medium line-clamp-2 py-1">
              {year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
