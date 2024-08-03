import { Clapperboard, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface CardProps {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  href: string;
}

export function Card({
  id,
  poster_path,
  title,
  name,
  vote_average,
  href
}: CardProps) {
  return (
    <>
      <div className="w-44  min-w-44">
        <div className="w-full space-y-2 lg:h-96 lg:w-[180px]">
          <div className="relative aspect-square w-full">
            {poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={poster_path}
                width={0}
                height={0}
                quality={100}
                sizes="100vh"
                className="rounded-lg shadow-md w-full h-56 lg:h-60 object-cover"
              />
            ) : (
              <div className="flex justify-center items-center w-full h-56 lg:h-60 bg-[#3a3cff] rounded-lg shadow-md">
                <Clapperboard size={24} className="text-white" />
              </div>
            )}

            <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] text-[#323232]">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">{vote_average.toFixed(2)}</span>
            </div>
          </div>

          <span className="block text-lg truncate text-[#323232]">
            {title || name}
          </span>

          <Button className="bg-gradient-to-b w-full  rounded-md from-[#3a3cff] to-[#2a18ff] hover:bg-gradient-to-b hover:from[#2a18ff] hover:to-[#1e0ae3]">
            <Link href={`${href}/${id}`}>Ver detalhes</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
