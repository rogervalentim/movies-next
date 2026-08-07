"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  Clapperboard,
  Film,
  Layers3,
  LoaderCircle
} from "lucide-react";
import { apiKey } from "../utils/api-key";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

interface CollectionProps {
  id: number | undefined;
  name: string | undefined;
  backdrop_path: string | undefined;
  poster_path: string | undefined;
}

interface CollectionPart {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
}

interface CollectionData {
  overview: string;
  parts: CollectionPart[];
}

export function Collection({
  id,
  name,
  backdrop_path,
  poster_path
}: CollectionProps) {
  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function fetchCollection() {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}&language=pt-BR`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Não foi possível carregar a coleção");
        }

        const data: CollectionData = await response.json();
        setCollectionData(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setIsError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchCollection();

    return () => controller.abort();
  }, [id]);

  const backgroundPath = backdrop_path || poster_path;
  const parts = collectionData?.parts ?? [];
  const totalTitles = parts.length;

  return (
    <section
      className="relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101010] shadow-card"
      aria-labelledby="collection-title"
    >
      {backgroundPath && (
        <Image
          src={`https://image.tmdb.org/t/p/w1280${backgroundPath}`}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1400px"
          className="-z-20 object-cover object-center opacity-55"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-transparent to-black/20" />
      <div className="absolute inset-y-0 left-0 -z-10 w-1 bg-gradient-to-b from-red-500 via-red-700 to-transparent" />

      <div className="flex min-h-[390px] flex-col justify-end p-6 sm:p-8 lg:min-h-[440px] lg:p-12">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-red-300">
            <Layers3 className="size-4" /> Universo completo
          </div>

          <h2
            id="collection-title"
            className="max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {name}
          </h2>

          <p className="mt-4 max-w-2xl line-clamp-3 text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
            {collectionData?.overview ||
              "Reúna todos os capítulos desta história e explore a coleção na ordem que preferir."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-black/45 px-3 text-sm font-medium text-zinc-200 backdrop-blur-md">
              <Film className="size-4 text-red-400" />
              {isLoading
                ? "Carregando títulos"
                : `${totalTitles} ${totalTitles === 1 ? "filme" : "filmes"}`}
            </span>

            {isError ? (
              <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 text-sm text-red-200">
                <AlertCircle className="size-4" /> Coleção indisponível
              </span>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    disabled={isLoading || totalTitles === 0}
                    className="min-h-11 gap-2 rounded-xl bg-red-600 px-5 text-white shadow-glow hover:bg-red-500"
                  >
                    {isLoading ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      <Layers3 className="size-4" />
                    )}
                    Explorar coleção
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-[calc(100%_-_2rem)] max-w-6xl border-white/10 bg-[#0c0c0c] p-0 text-white">
                  <ScrollArea className="max-h-[88dvh]">
                    <div className="p-5 sm:p-7 lg:p-8">
                      <DialogHeader className="pr-8 text-left">
                        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-red-400">
                          <Layers3 className="size-4" /> Coleção
                        </div>
                        <DialogTitle className="text-2xl font-black tracking-tight sm:text-3xl">
                          {name}
                        </DialogTitle>
                        <DialogDescription className="max-w-3xl pt-2 leading-6 text-zinc-400">
                          {collectionData?.overview ||
                            "Todos os filmes deste universo reunidos em um só lugar."}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {parts.map((item, index) => {
                          const imagePath = item.backdrop_path || item.poster_path;
                          const year = item.release_date?.slice(0, 4);

                          return (
                            <Link
                              key={item.id}
                              href={`/movie/${item.id}`}
                              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151515] transition duration-300 hover:-translate-y-1 hover:border-red-500/45 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-red-500 motion-reduce:transform-none"
                              aria-label={`Ver detalhes de ${item.title}`}
                            >
                              <div className="relative aspect-video overflow-hidden bg-[#1c1c1c]">
                                {imagePath ? (
                                  <Image
                                    src={`https://image.tmdb.org/t/p/w780${imagePath}`}
                                    alt={`Cena de ${item.title}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-950 to-[#151515] text-red-300">
                                    <Clapperboard className="size-9" />
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                                <span className="absolute left-3 top-3 grid size-8 place-items-center rounded-full border border-white/15 bg-black/65 text-xs font-bold text-white backdrop-blur-md">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                              </div>

                              <div className="p-4">
                                <div className="flex items-start justify-between gap-3">
                                  <h3 className="line-clamp-2 font-bold text-white transition-colors group-hover:text-red-300">
                                    {item.title}
                                  </h3>
                                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-zinc-500 transition group-hover:text-red-400" />
                                </div>
                                {year && (
                                  <p className="mt-1 text-xs font-semibold text-red-400">
                                    {year}
                                  </p>
                                )}
                                <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
                                  {item.overview || "Sinopse ainda não disponível."}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
