"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ExternalLink, ImagesIcon } from "lucide-react";
import { Loading } from "@/app/_components/loading";
import { apiKey } from "@/app/utils/api-key";

interface ImagesProps {
  id: number;
  personName: string;
}

interface ImagesData {
  file_path: string;
  vote_average?: number;
}

export function Images({ id, personName }: ImagesProps) {
  const [imagesData, setImagesData] = useState<ImagesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchImagesData() {
      try {
        setIsLoading(true);
        setHasError(false);
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}/images?api_key=${apiKey}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        const profiles = Array.isArray(data.profiles) ? data.profiles : [];
        setImagesData(
          [...profiles].sort(
            (a: ImagesData, b: ImagesData) =>
              (b.vote_average || 0) - (a.vote_average || 0),
          ),
        );
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setHasError(true);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    fetchImagesData();
    return () => controller.abort();
  }, [id]);

  if (isLoading) return <Loading />;

  if (hasError || imagesData.length === 0) {
    return (
      <div className="glass-panel flex min-h-48 flex-col items-center justify-center rounded-2xl px-6 text-center">
        <ImagesIcon className="size-8 text-primary" />
        <h3 className="mt-4 font-semibold text-foreground">
          {hasError ? "Galeria indisponível" : "Nenhuma foto encontrada"}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasError
            ? "Não foi possível carregar as imagens agora."
            : "A galeria desta pessoa ainda não possui imagens."}
        </p>
      </div>
    );
  }

  return (
    <section>
      <p className="mb-4 text-sm text-muted-foreground">
        {imagesData.length}{" "}
        {imagesData.length === 1 ? "foto disponível" : "fotos disponíveis"}
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {imagesData.map((image, index) => (
          <a
            href={`https://image.tmdb.org/t/p/original${image.file_path}`}
            key={image.file_path}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow motion-reduce:transform-none"
            aria-label={`Abrir foto ${index + 1} de ${personName} em tamanho original`}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              fill
              quality={88}
              sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, (max-width: 1279px) 22vw, 18vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
              alt={`Foto ${index + 1} de ${personName}`}
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3 pb-3 pt-10 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              Abrir imagem <ExternalLink className="size-3.5" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
