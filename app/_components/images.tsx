"use client";

import { apiKey } from "@/app/utils/api-key";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loading } from "./loading";

interface ImagesProps {
  id: number;
  contentType: string;
}

interface ImagesData {
  file_path: string;
}

export default function Images({ id, contentType }: ImagesProps) {
  const [posters, setPosters] = useState<ImagesData[]>([]);
  const [backdrops, setBackdrops] = useState<ImagesData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}/images?api_key=${apiKey}`
      );
      const data = await response.json();
      setPosters(data.posters);
      setBackdrops(data.backdrops);
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="text-sm font-semibold text-primary">
        Imagens de fundo {backdrops.length}
      </h1>
      <section className="grid grid-cols-1 lg:grid-cols-4 pt-4 gap-4">
        {backdrops.map((item) => (
          <a
            href={`https://image.tmdb.org/t/p/w1280/${item.file_path}`}
            key={item.file_path}
            target="_blank"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w1280/${item.file_path}`}
              alt="image"
              width={0}
              height={0}
              quality={100}
              sizes="100vh"
              className="rounded-lg shadow-md w-full h-auto object-cover"
              loading="lazy"
            />
          </a>
        ))}
      </section>

      <h1 className="text-sm font-semibold text-primary pt-4">
        Cartazes {posters.length}
      </h1>
      <section className="grid grid-cols-2 lg:grid-cols-4 pt-4 items-center gap-4">
        {posters.map((item) => (
          <a
            href={`https://image.tmdb.org/t/p/w780/${item.file_path}`}
            key={item.file_path}
            target="_blank"
          >
            <Image
              key={item.file_path}
              src={`https://image.tmdb.org/t/p/w780/${item.file_path}`}
              alt="image"
              width={0}
              height={0}
              quality={100}
              sizes="100vh"
              className="rounded-lg shadow-md w-full h-auto"
              loading="lazy"
            />
          </a>
        ))}
      </section>
    </>
  );
}
