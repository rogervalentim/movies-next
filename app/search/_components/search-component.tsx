"use client";

import { Search } from "@/app/_components/search";
import { apiKey } from "@/app/utils/api-key";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/app/_components/ui/pagination";
import Image from "next/image";
import { Clapperboard, Star } from "lucide-react";
import Link from "next/link";

const PAGE_LIMIT = 10;
const MAX_VISIBLE_PAGES = 10;

interface SearchResult {
  id: number;
  name: string;
  title: string;
  profile_path: string | null;
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
    isError,
    isFetching
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

  function handleNextPage(): void {
    if (searchResults && page < searchResults.total_pages) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function handlePrevPage(): void {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  function getPaginationRange(
    currentPage: number,
    totalPages: number
  ): number[] {
    const range: number[] = [];
    let start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

    if (end - start + 1 < MAX_VISIBLE_PAGES) {
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
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
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {searchResults.results.map((result) => (
                <Link
                  href={
                    result.media_type === "tv"
                      ? `/serie/${result.id}`
                      : `/movie/${result.id}`
                  }
                  key={result.id}
                  className="relative aspect-square w-full group"
                >
                  {result.poster_path ? (
                    <div className="relative  transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${result?.poster_path}`}
                        alt={result?.title || result?.name}
                        width={0}
                        height={0}
                        quality={100}
                        sizes="100vh"
                        className="rounded-lg shadow-md w-96 h-80 lg:h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg" />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center w-full h-80 lg:h-96 bg-[#3a3cff] rounded-lg relative  transition-transform duration-300 group-hover:scale-105">
                      <Clapperboard size={24} className="text-white" />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg" />
                    </div>
                  )}
                  <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] text-[#323232]">
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <span className="font-semibold">
                      {result?.vote_average?.toFixed(2)}
                    </span>
                  </div>
                  <span className="block text-lg pt-2 truncate text-primary">
                    {result?.title || result?.name}
                  </span>
                </Link>
              ))}
            </section>
            <Pagination>
              <PaginationContent className="pt-10">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePrevPage();
                    }}
                  />
                </PaginationItem>
                {getPaginationRange(page, searchResults.total_pages).map(
                  (pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        isActive={page === pageNumber}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                {searchResults.total_pages > MAX_VISIBLE_PAGES && (
                  <>
                    {page < searchResults.total_pages && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={(e) => {
                          e.preventDefault();
                          handleNextPage();
                        }}
                      />
                    </PaginationItem>
                  </>
                )}
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </div>
  );
}
