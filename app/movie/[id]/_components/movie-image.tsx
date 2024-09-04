"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MovieImageProps {
  backdrop_path: string;
  poster_path: string;
  title: string;
}

export default function MovieImage({
  backdrop_path,
  poster_path,
  title
}: MovieImageProps) {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="relative w-full lg:hidden">
      <div className="relative h-[25rem]  w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
          alt={title}
          width={0}
          height={0}
          quality={100}
          sizes="100vh"
          className="h-full w-full object-cover  bg-muted"
          loading="lazy"
        />

        <div className="absolute bottom-4 left-4 flex items-center">
          <Image
            src={`https://image.tmdb.org/t/p/w342${poster_path}`}
            alt={title}
            width={0}
            height={0}
            quality={100}
            sizes="100vh"
            className="h-40 w-28 md:h-48 md:w-32 object-cover bg-muted rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </div>

      <Button
        className="absolute left-4 top-4 rounded-full text-black bg-white hover:text-white hover:bg-gradient-to-b from-[#3a3cff] to-[#2a18ff]"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
}
