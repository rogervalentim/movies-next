import { Clapperboard, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InfoCardProps {
  id?: number;
  title?: string;
  href?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
  media_type?: string;
  vote_average: number;
  known_for_department?: string;
  year: string;
}

export function InfoCard({
  id,
  title,
  name,
  href,
  poster_path,
  profile_path,
  media_type,
  vote_average,
  year,
  known_for_department
}: InfoCardProps) {
  return (
    <Link href={`${href}/${id}`}>
      <div className="relative transition-transform duration-300 group-hover:scale-105 hover:shadow-lg rounded-lg overflow-hidden">
        {poster_path || profile_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500/${poster_path || profile_path}`}
            alt={(title || name) ?? ""}
            width={500}
            height={750}
            quality={100}
            className="rounded-lg w-full h-64 lg:h-96 object-cover border border-border"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-64 lg:h-96 bg-gradient-to-r bg-[#3a3cff] rounded-lg text-white text-lg">
            <Clapperboard />
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h3 className="text-lg font-medium mb-2 line-clamp-2">
            {title || name}
          </h3>

          <div className="flex justify-between items-center text-sm">
            {year && (
              <span className="bg-white text-black px-2 py-1 rounded-md">
                {year}
              </span>
            )}

            {media_type && (
              <span className="bg-[#3a3cff] text-gray-300 px-2 py-1 rounded-md">
                {media_type === "movie"
                  ? "Filme"
                  : media_type === "tv"
                    ? "Série"
                    : known_for_department === "Acting"
                      ? "Pessoa"
                      : "Indefinido"}
              </span>
            )}
          </div>

          {vote_average > 0 && (
            <div className="absolute left-2 top-2 flex items-center gap-1 bg-white px-2 py-1 rounded-full text-gray-800 shadow-sm">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-sm">
                {vote_average.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
