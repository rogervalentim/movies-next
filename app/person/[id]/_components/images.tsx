"use client";

import { apiKey } from "@/app/utils/api-key";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImagesProps {
  id: number;
}

interface ImagesData {
  id: number;
  file_path: string;
}

export function Images({ id }: ImagesProps) {
  const [imagesData, setImagesData] = useState<ImagesData[]>([]);

  useEffect(() => {
    fetchImagesData();
  }, []);

  async function fetchImagesData() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${id}/images?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setImagesData(data.profiles);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {imagesData.map((image) => (
          <a
            href={`https://image.tmdb.org/t/p/w780/${image.file_path}`}
            key={image.id}
            target="_blank"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${image?.file_path}`}
              width={0}
              height={0}
              quality={100}
              sizes="100vh"
              className="rounded-lg shadow-md border border-border w-full h-72"
              alt={image.file_path}
            />
          </a>
        ))}
      </section>
    </>
  );
}
