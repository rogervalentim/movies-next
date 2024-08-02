"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SerieImageProps {
  backdrop_path: string;
  name: string;
}

export function SerieImage({ backdrop_path, name }: SerieImageProps) {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="relative h-[25rem] w-full lg:hidden">
      <Image
        src={`https://image.tmdb.org/t/p/w780/${backdrop_path}`}
        alt={name}
        fill
        className="object-cover"
      />

      <div className="flex">
        <Button
          className="absolute left-4 top-4 rounded-full bg-white  text-foreground hover:text-white hover:bg-gradient-to-b  from-[#3a3cff] to-[#2a18ff]"
          size="icon"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          className="absolute right-4 top-4 rounded-full bg-white  text-foreground hover:text-white hover:bg-gradient-to-b  from-[#3a3cff] to-[#2a18ff]"
          size="icon"
        >
          <Link href="/">
            <Home />
          </Link>
        </Button>
      </div>
    </div>
  );
}
