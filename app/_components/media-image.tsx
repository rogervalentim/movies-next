"use client";

import { DrawerComponent } from "@/app/_components/drawer-component";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, Clapperboard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MediaImageProps {
  backdrop_path: string | undefined;
  profile_path?: string;
  poster_path?: string;
  name?: string;
  title?: string;
}

export default function MediaImage({
  backdrop_path,
  profile_path,
  poster_path,
  name,
  title
}: MediaImageProps) {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="relative w-full lg:px-32 lg:pt-4 flex flex-col">
      <div className="relative h-[15rem] lg:h-auto w-full">
        {backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
            alt={name || "" || title || ""}
            width={0}
            height={0}
            quality={100}
            sizes="100vh"
            className="h-[15rem] lg:h-[20rem] w-full brightness-50 border border-border lg:rounded-lg bg-muted "
            loading="lazy"
          />
        ) : (
          <div className="flex justify-center items-center h-[15rem] lg:h-[20rem] w-full  bg-[#3a3cff]  shadow-md">
            <Clapperboard size={40} className="text-white" />
          </div>
        )}

        <div className="absolute mt-[-8rem] left-4 flex items-center">
          <Image
            src={`https://image.tmdb.org/t/p/w342${profile_path || poster_path}`}
            alt={name || "" || title || ""}
            width={0}
            height={0}
            quality={100}
            sizes="100vh"
            className="h-56  w-40  object-cover bg-muted border border-border rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <Button
          className="absolute lg:hidden left-4 top-4 text-primary transition"
          size="icon"
          variant="outline"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          size="icon"
          className="absolute lg:hidden right-4 top-4 text-primary transition"
          variant="outline"
        >
          <DrawerComponent />
        </Button>
      </div>
    </div>
  );
}
