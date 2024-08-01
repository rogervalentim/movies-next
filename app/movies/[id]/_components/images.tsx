"use client";

import { apiKey } from "@/app/utils/api-key";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImagesProps {
  id: number;
}

interface ImagesData {
  file_path: string;
}

export function Images({ id }: ImagesProps) {
  const [posters, setPosters] = useState<ImagesData[]>([]);
  const [backdrops, setBackdrops] = useState<ImagesData[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`
      );
      const data = await response.json();
      setPosters(data.posters);
      setBackdrops(data.backdrops);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="grid grid-cols-2 gap-4 space-y-4">
        <h1 className="text-sm font-semibold text-[#323232]">
          Cartazes {posters.length}
        </h1>
        {posters.map((item) => (
          <Image
            key={item.file_path}
            src={`https://image.tmdb.org/t/p/w780/${item.file_path}`}
            alt="image"
            width={0}
            height={0}
            quality={100}
            sizes="100vh"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 space-y-4">
        <h1 className="text-sm font-semibold text-[#323232]">
          Imagens de fundo {backdrops.length}
        </h1>
        {backdrops.map((item) => (
          <Image
            key={item.file_path}
            src={`https://image.tmdb.org/t/p/w1280/${item.file_path}`}
            alt="image"
            width={0}
            height={0}
            quality={100}
            sizes="100vh"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        ))}
      </section>
    </>
  );
}
