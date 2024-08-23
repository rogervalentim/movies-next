import { Clapperboard } from "lucide-react";
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
  return (
    <Link href={`/person/${id}`}>
      <div className="relative transition-transform duration-300 group-hover:scale-105">
        {profile_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
            alt={name}
            width={0}
            height={0}
            quality={100}
            sizes="100vh"
            className="rounded-lg w-full border border-border  h-64 lg:h-80 object-cover"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-64 lg:h-80 bg-[#3a3cff] rounded-lg relative transition-transform duration-300 group-hover:scale-105">
            <Clapperboard size={24} className="text-white" />
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent rounded-lg">
          <div className="flex flex-col space-y-1">
            <span className="text-lg font-bold text-white truncate">
              {name}
            </span>
            <span className="text-sm text-gray-300 font-semibold truncate">
              {character === "" ? "Sem nome do personagem" : character}
              {job === "" ? "Sem o nome da função" : job}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
