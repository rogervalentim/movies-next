"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PersonImageProps {
  backdrop_path: string | undefined;
  profile_path: string;
  name: string;
  latestWorkName: string | undefined;
  latestWorkTitle: string | undefined;
  personName: string;
}

export default function PersonImage({
  backdrop_path,
  profile_path,
  name,
  latestWorkName,
  latestWorkTitle,
  personName
}: PersonImageProps) {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="relative w-full lg:hidden">
      <div className="relative h-[25rem]  w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
          alt={name}
          width={0}
          height={0}
          quality={100}
          sizes="100vh"
          className="h-full w-full object-cover bg-muted "
          loading="lazy"
        />

        <div className=" flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] font-medium text-[#323232]">
          <p className="text-sm ">{latestWorkTitle || latestWorkName}</p>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center">
          <Image
            src={`https://image.tmdb.org/t/p/w342${profile_path}`}
            alt={name}
            width={0}
            height={0}
            quality={100}
            sizes="100vh"
            className="h-40 w-28 md:h-48 md:w-32 object-cover bg-muted rounded-lg  shadow-md"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex items-center">
        <Button
          className="absolute left-4 top-4 rounded-full text-black bg-white hover:text-white hover:bg-gradient-to-b from-[#3a3cff] to-[#2a18ff]"
          size="icon"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>
        <div className="absolute right-2 top-4 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] font-medium text-[#323232]">
          <p className="text-sm ">{latestWorkTitle || latestWorkName}</p>
        </div>
      </div>
    </div>
  );
}
