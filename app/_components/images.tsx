"use client";

import { apiKey } from "@/app/utils/api-key";
import Image from "next/image";
import { Loading } from "./loading";
import { useQuery } from "@tanstack/react-query";

interface ImagesData {
  file_path: string;
}

interface ImagesApiResponse {
  backdrops: ImagesData[];
  posters: ImagesData[];
}

interface ImagesProps {
  id: number;
  contentType: string;
}

export default function Images({ id, contentType }: ImagesProps) {
  const { data: images, isLoading: movieImagesIsLoading } =
    useQuery<ImagesApiResponse>({
      queryKey: ["get-images", id],
      queryFn: async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/${contentType}/${id}/images?api_key=${apiKey}`
        );
        const data = await response.json();
        return data;
      },
      enabled: !!id
    });

  if (movieImagesIsLoading) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="text-sm font-semibold text-primary">
        Imagens de fundo {images?.backdrops.length}
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pt-4 gap-4">
        {images?.backdrops.map((item) => (
          <a
            href={`https://image.tmdb.org/t/p/w780/${item.file_path}`}
            key={item.file_path}
            target="_blank"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w780/${item.file_path}`}
              alt="image"
              width={0}
              height={0}
              quality={100}
              sizes="100vh"
              className="rounded-lg shadow-md border border-border bg-muted w-full h-auto object-cover"
              loading="lazy"
            />
          </a>
        ))}
      </section>

      <h1 className="text-sm font-semibold text-primary pt-4">
        Cartazes {images?.posters.length}
      </h1>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4 items-center gap-4">
        {images?.posters.map((item) => (
          <a
            href={`https://image.tmdb.org/t/p/w500/${item.file_path}`}
            key={item.file_path}
            target="_blank"
          >
            <Image
              key={item.file_path}
              src={`https://image.tmdb.org/t/p/w500/${item.file_path}`}
              alt="image"
              width={0}
              height={0}
              quality={100}
              sizes="100vh"
              className="rounded-lg shadow-md border bg-muted border-border w-full h-auto"
              loading="lazy"
            />
          </a>
        ))}
      </section>
    </>
  );
}
