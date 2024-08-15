"use client";

import { Search } from "@/app/_components/search";
import { apiKey } from "@/app/utils/api-key";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { extractYear } from "@/app/utils/format-date";
import { SearchItem } from "./search-item";
import { PaginationLists } from "@/app/_components/pagination-lists";

interface SearchResult {
  id: number;
  name: string;
  title: string;
  profile_path: string | null;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string | null;
  media_type: string;
  known_for_department: string;
}

interface SearchResponse {
  results: SearchResult[];
  total_pages: number;
}

export function SearchComponent() {
  const [searchData, setSearchData] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const {
    data: searchResults,
    isLoading: searchIsLoading,
    isError
  } = useQuery<SearchResponse>({
    queryKey: ["search", searchData, page],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${searchData}&api_key=${apiKey}&include_adult=false&language=pt-BR&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar dados.");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        throw error;
      }
    },
    enabled: !!searchData && page > 0
  });

  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    setSearchData(event.target.value);
    setPage(1);
  }

  function handlePageChange(newPage: number): void {
    setPage(newPage);
  }

  return (
    <div className="min-h-screen">
      <Search searchData={searchData} handleSearch={handleSearch} />

      <div className="pt-4">
        {searchData === "" ? (
          <h1 className="text-muted-foreground text-2xl text-center font-semibold">
            Digite algo...
          </h1>
        ) : (
          <h1 className="text-muted-foreground text-2xl text-center font-semibold">
            Resultados da busca por {searchData}
          </h1>
        )}
        {searchIsLoading && <p>Carregando...</p>}
        {isError && <p>Erro ao buscar dados.</p>}
        {searchResults && (
          <>
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-5 pt-4">
              {searchResults.results.map((result) => {
                const year = extractYear(
                  result.release_date || result.first_air_date
                );

                return (
                  <Link
                    href={
                      result.media_type === "tv"
                        ? `/serie/${result.id}`
                        : result.media_type === "movie"
                          ? `/movie/${result.id}`
                          : result.media_type === "person"
                            ? `/person/${result.id}`
                            : "/"
                    }
                    key={result.id}
                    className="relative aspect-square w-full group"
                  >
                    <SearchItem
                      title={result?.title}
                      name={result?.name}
                      poster_path={result?.poster_path || ""}
                      profile_path={result?.profile_path || ""}
                      media_type={result?.media_type}
                      vote_average={result?.vote_average}
                      known_for_department={result?.known_for_department}
                      year={year}
                    />
                  </Link>
                );
              })}
            </section>
            <PaginationLists
              currentPage={page}
              totalPages={searchResults.total_pages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
