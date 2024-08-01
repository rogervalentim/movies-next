"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MovieImageProps {
  backdrop_path: string;
  title: string;
}

export function MovieImage({ backdrop_path, title }: MovieImageProps) {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="relative h-[25rem] w-full lg:hidden">
      <Image
        src={`https://image.tmdb.org/t/p/w780/${backdrop_path}`}
        alt={title}
        fill
        className="object-cover"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white  text-foreground hover:text-white hover:bg-gradient-to-b  from-[#3a3cff] to-[#2a18ff]"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
}
