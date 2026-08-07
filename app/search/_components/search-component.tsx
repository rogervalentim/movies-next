"use client";

import { Search } from "@/app/_components/search";
import { apiKey } from "@/app/utils/api-key";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Clapperboard, SearchX } from "lucide-react";
import { extractYear } from "@/app/utils/format-date";
import { PaginationLists } from "@/app/_components/pagination-lists";
import { InfoCard } from "@/app/_components/info-card";
import { Button } from "@/app/_components/ui/button";

type Filter = "multi" | "movie" | "tv" | "person";

interface SearchResult {
  id: number;
  name?: string;
  title?: string;
  profile_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  poster_path: string | null;
  media_type?: string;
  known_for_department?: string;
}

interface SearchResponse {
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

const filters: { value: Filter; label: string }[] = [
  { value: "multi", label: "Todos" },
  { value: "movie", label: "Filmes" },
  { value: "tv", label: "Séries" },
  { value: "person", label: "Pessoas" }
];

export function SearchComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchData, setSearchData] = useState(searchParams.get("q") ?? "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchData.trim());
  const [filter, setFilter] = useState<Filter>("multi");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const queryFromUrl = searchParams.get("q") ?? "";
    setSearchData(queryFromUrl);
    setDebouncedSearch(queryFromUrl.trim());
  }, [searchParams]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const normalized = searchData.trim();
      setDebouncedSearch(normalized);
      const nextUrl = normalized ? `/search?q=${encodeURIComponent(normalized)}` : "/search";
      router.replace(nextUrl, { scroll: false });
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [router, searchData]);

  const {
    data: searchResults,
    isLoading,
    isFetching,
    isError,
    refetch
  } = useQuery<SearchResponse>({
    queryKey: ["search", debouncedSearch, filter, page],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${filter}?query=${encodeURIComponent(debouncedSearch)}&api_key=${apiKey}&include_adult=false&language=pt-BR&page=${page}`
      );
      if (!response.ok) throw new Error("Erro ao buscar dados");
      return response.json();
    },
    enabled: Boolean(debouncedSearch),
    staleTime: 1000 * 60 * 5
  });

  function clearSearch() {
    setSearchData("");
    setPage(1);
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchData(event.target.value);
    setPage(1);
  }

  function selectFilter(nextFilter: Filter) {
    setFilter(nextFilter);
    setPage(1);
  }

  const results = searchResults?.results ?? [];

  return (
    <div className="min-h-[70vh] py-8 sm:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">Descobrir</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Encontre sua próxima história</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
          Pesquise no catálogo de filmes, séries e pessoas do TMDB.
        </p>
        <div className="mt-7 text-left">
          <Search searchData={searchData} handleSearch={handleSearch} clearSearch={clearSearch} />
        </div>
      </div>

      {debouncedSearch && (
        <div className="mt-8 flex flex-col gap-4 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-400">Resultados para</p>
            <h2 className="mt-1 text-2xl font-bold text-white">“{debouncedSearch}”</h2>
            {searchResults && <p className="mt-1 text-sm text-slate-400">{searchResults.total_results.toLocaleString("pt-BR")} resultados encontrados</p>}
          </div>
          <div className="scrollbar-none flex gap-2 overflow-x-auto" role="group" aria-label="Filtrar resultados">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => selectFilter(item.value)}
                aria-pressed={filter === item.value}
                className={`min-h-11 whitespace-nowrap rounded-xl border px-4 text-sm font-semibold transition ${
                  filter === item.value
                    ? "border-red-500/50 bg-red-500/20 text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!debouncedSearch ? (
        <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
          <Clapperboard className="size-10 text-red-400" />
          <h2 className="mt-4 text-xl font-bold text-white">O que você quer assistir hoje?</h2>
          <p className="mt-2 max-w-md text-sm text-slate-400">Digite um título, o nome de uma série ou de alguém do elenco.</p>
          <Button asChild variant="outline" className="mt-5"><Link href="/movies-popular">Explorar filmes populares</Link></Button>
        </div>
      ) : isLoading || (isFetching && !searchResults) ? (
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5" aria-label="Carregando resultados">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} aria-hidden="true">
              <div className="skeleton-shimmer aspect-[2/3] rounded-2xl" />
              <div className="skeleton-shimmer mt-3 h-5 w-4/5 rounded" />
              <div className="skeleton-shimmer mt-2 h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <AlertCircle className="size-8 text-red-400" />
          <h2 className="mt-3 text-xl font-bold text-white">Não foi possível concluir a busca</h2>
          <p className="mt-2 text-sm text-slate-400">Verifique sua conexão e tente novamente.</p>
          <Button variant="outline" className="mt-5" onClick={() => refetch()}>Tentar novamente</Button>
        </div>
      ) : results.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <SearchX className="size-9 text-red-400" />
          <h2 className="mt-3 text-xl font-bold text-white">Nenhum resultado encontrado</h2>
          <p className="mt-2 max-w-md text-sm text-slate-400">Tente outro termo ou volte aos conteúdos que estão em alta.</p>
          <Button asChild variant="outline" className="mt-5"><Link href="/">Ver conteúdos em alta</Link></Button>
        </div>
      ) : (
        <>
          <section className={`mt-7 grid grid-cols-2 gap-x-3 gap-y-7 transition-opacity sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5 ${isFetching ? "opacity-60" : "opacity-100"}`} aria-live="polite">
            {results.map((result) => {
              const mediaType = result.media_type || (filter === "multi" ? undefined : filter);
              const year = extractYear(result.release_date || result.first_air_date);
              const href = mediaType === "tv" ? `/serie/${result.id}` : mediaType === "person" ? `/person/${result.id}` : `/movie/${result.id}`;
              const label = result.title || result.name || "resultado";
              return (
                <Link key={`${mediaType}-${result.id}`} href={href} className="rounded-2xl focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]" aria-label={`Ver detalhes de ${label}`}>
                  <InfoCard
                    title={result.title}
                    name={result.name}
                    poster_path={result.poster_path || ""}
                    profile_path={result.profile_path || ""}
                    media_type={mediaType}
                    vote_average={result.vote_average || 0}
                    known_for_department={result.known_for_department}
                    year={year}
                  />
                </Link>
              );
            })}
          </section>
          {searchResults && searchResults.total_pages > 1 && (
            <PaginationLists currentPage={page} totalPages={Math.min(searchResults.total_pages, 500)} onPageChange={setPage} />
          )}
        </>
      )}
    </div>
  );
}
