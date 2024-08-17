"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PaginationLists } from "@/app/_components/pagination-lists";
import { extractYear } from "@/app/utils/format-date";
import { apiKey } from "@/app/utils/api-key";
import Link from "next/link";
import { SeriesPopularItem } from "./series-popular-item";
import { Loading } from "@/app/_components/loading";

interface Serie {
  id: number;
  name: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  media_type: string;
}

interface SeriesResponse {
  results: Serie[];
  total_pages: number;
}

export function SeriesPopularDetails() {
  const [page, setPage] = useState<number>(1);

  const {
    data: serieData,
    isLoading,
    isError
  } = useQuery<SeriesResponse>({
    queryKey: ["series-popular", page],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR&page=${page}
`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar dados.");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5
  });

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  return (
    <div className="min-h-screen">
      {isLoading && <Loading />}
      {isError && <p>Erro ao buscar dados.</p>}

      {serieData && (
        <>
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-5 pt-4">
            {serieData.results.map((serie) => {
              const year = extractYear(serie.release_date);

              return (
                <Link
                  href={`/serie/${serie.id}`}
                  key={serie.id}
                  className="relative aspect-square w-full group"
                >
                  <SeriesPopularItem
                    name={serie.name}
                    poster_path={serie.poster_path || ""}
                    vote_average={serie.vote_average}
                    year={year}
                  />
                </Link>
              );
            })}
          </section>

          <PaginationLists
            currentPage={page}
            totalPages={serieData.total_pages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
