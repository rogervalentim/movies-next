import Image from "next/image";
import { Button } from "./ui/button";

interface CastCardProps {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export function CastCard({ id, name, character, profile_path }: CastCardProps) {
  return (
    <div className="w-44  min-w-44">
      <div className="w-full space-y-2 lg:h-96 lg:w-[180px]">
        <div className="relative aspect-square w-full">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
            alt={name}
            width={0}
            height={0}
            quality={100}
            sizes="100vh"
            className="rounded-lg shadow-md w-full h-60 object-cover"
          />
        </div>

        <span className="block text-lg truncate text-[#323232]">{name}</span>
        <span className="block text-base truncate text-muted-foreground">
          {character}
        </span>

        <Button className="bg-gradient-to-b w-full rounded-md from-[#3a3cff] to-[#2a18ff] hover:bg-gradient-to-b hover:from[#2a18ff] hover:to-[#1e0ae3]">
          Ver detalhes
        </Button>
      </div>
    </div>
  );
}
