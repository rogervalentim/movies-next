"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { InfoCard } from "@/app/_components/info-card";
import { Loading } from "@/app/_components/loading";
import { apiKey } from "@/app/utils/api-key";
import { extractYear } from "@/app/utils/format-date";

interface CreditsProps {
  id: number;
}

interface CreditsData {
  id: number;
  poster_path: string | null;
  name?: string;
  title?: string;
  vote_average: number;
  popularity?: number;
  media_type: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
}

export function Credits({ id }: CreditsProps) {
  const [creditsData, setCreditsData] = useState<CreditsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCreditsData() {
      try {
        setIsLoading(true);
        setHasError(false);
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}&language=pt-BR`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Failed to fetch credits");

        const data = await response.json();
        const cast = Array.isArray(data.cast) ? data.cast : [];
        const uniqueCredits = cast.reduce(
          (acc: CreditsData[], current: CreditsData) => {
            const alreadyIncluded = acc.some(
              (item) =>
                item.id === current.id &&
                item.media_type === current.media_type,
            );
            if (
              !alreadyIncluded &&
              (current.media_type === "movie" || current.media_type === "tv")
            ) {
              acc.push(current);
            }
            return acc;
          },
          [],
        );

        setCreditsData(uniqueCredits);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setHasError(true);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    fetchCreditsData();
    return () => controller.abort();
  }, [id]);

  const sortedCredits = useMemo(
    () =>
      [...creditsData].sort((a, b) => {
        const dateA = a.release_date || a.first_air_date || "";
        const dateB = b.release_date || b.first_air_date || "";
        return (
          dateB.localeCompare(dateA) ||
          (b.popularity || 0) - (a.popularity || 0)
        );
      }),
    [creditsData],
  );

  if (isLoading) return <Loading />;

  if (hasError || sortedCredits.length === 0) {
    return (
      <div className="glass-panel flex min-h-48 flex-col items-center justify-center rounded-2xl px-6 text-center">
        <Clapperboard className="size-8 text-primary" />
        <h3 className="mt-4 font-semibold text-foreground">
          {hasError ? "Filmografia indisponível" : "Nenhum trabalho encontrado"}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasError
            ? "Não foi possível carregar os trabalhos agora."
            : "A filmografia desta pessoa ainda não foi catalogada."}
        </p>
      </div>
    );
  }

  return (
    <section>
      <p className="mb-4 text-sm text-muted-foreground">
        {sortedCredits.length}{" "}
        {sortedCredits.length === 1
          ? "trabalho encontrado"
          : "trabalhos encontrados"}
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sortedCredits.map((credit) => {
          const href = credit.media_type === "movie" ? "/movie" : "/serie";
          const year = extractYear(
            credit.release_date || credit.first_air_date,
          );

          return (
            <Link
              href={`${href}/${credit.id}`}
              key={`${credit.media_type}-${credit.id}`}
            >
              <InfoCard
                name={credit.name}
                title={credit.title}
                poster_path={credit.poster_path || undefined}
                media_type={credit.media_type}
                year={year}
                vote_average={credit.vote_average || 0}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
