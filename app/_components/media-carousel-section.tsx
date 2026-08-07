"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { apiKey } from "../utils/api-key";
import { useCarousel } from "../_hooks/use-carousel";
import { Card } from "./card";
import { CardSkeleton } from "./card-skeleton";
import { CarouselButton } from "./carousel-button";
import { SectionHeading } from "./section-heading";
import { Button } from "./ui/button";

interface MediaItem {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

interface MediaCarouselSectionProps {
  endpoint: string;
  title: string;
  description?: string;
  viewAllHref?: string;
  contentType: "movie" | "tv";
}

export function MediaCarouselSection({
  endpoint,
  title,
  description,
  viewAllHref,
  contentType
}: MediaCarouselSectionProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const { isLeftDisabled, isRightDisabled, progress, scrollLeft, scrollRight, carouselRef } = useCarousel();

  const loadItems = useCallback(async (signal: AbortSignal) => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=pt-BR`,
        { signal }
      );
      if (!response.ok) throw new Error("Falha ao carregar conteúdos");
      const data = await response.json();
      setItems(data.results ?? []);
    } catch (requestError) {
      if ((requestError as Error).name !== "AbortError") setError(true);
    } finally {
      if (!signal.aborted) setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    const controller = new AbortController();
    loadItems(controller.signal);
    return () => controller.abort();
  }, [loadItems, retryKey]);

  return (
    <section aria-label={title}>
      <SectionHeading title={title} description={description} href={viewAllHref}>
        {!isLoading && !error && items.length > 0 && (
          <div className="hidden items-center gap-2 sm:flex">
            <CarouselButton direction="left" onClick={scrollLeft} disabled={isLeftDisabled} />
            <CarouselButton direction="right" onClick={scrollRight} disabled={isRightDisabled} />
          </div>
        )}
      </SectionHeading>

      {error ? (
        <div className="glass-panel flex min-h-44 flex-col items-center justify-center rounded-2xl p-6 text-center">
          <AlertCircle className="mb-3 size-6 text-red-400" />
          <p className="font-semibold text-white">Não foi possível carregar esta seleção.</p>
          <p className="mt-1 text-sm text-slate-400">Verifique sua conexão e tente novamente.</p>
          <Button className="mt-4" variant="outline" onClick={() => setRetryKey((value) => value + 1)}>
            Tentar novamente
          </Button>
        </div>
      ) : (
        <>
          <div
            ref={carouselRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:gap-4 lg:gap-5"
            tabIndex={0}
            aria-label={`Carrossel: ${title}`}
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)
              : items.map((item) => (
                  <Card
                    key={item.id}
                    {...item}
                    href={contentType === "tv" ? "/serie" : "/movie"}
                    mediaLabel={contentType === "tv" ? "Série" : "Filme"}
                  />
                ))}
          </div>
          {!isLoading && items.length > 0 && (
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]" aria-hidden="true">
              <div className="h-full rounded-full bg-gradient-to-r from-red-700 to-red-500 transition-[width]" style={{ width: `${Math.max(8, progress)}%` }} />
            </div>
          )}
        </>
      )}
    </section>
  );
}
