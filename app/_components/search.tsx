import { ChangeEvent, FormEvent } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  searchData: string;
  clearSearch: () => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

export function Search({ handleSearch, searchData, clearSearch, onSubmit }: SearchProps) {
  return (
    <form className="relative" role="search" onSubmit={onSubmit}>
      <label htmlFor="catalog-search" className="sr-only">Buscar filmes, séries e pessoas</label>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
        <Input
          id="catalog-search"
          placeholder="Busque por filmes, séries ou pessoas"
          className="h-14 rounded-2xl border-white/10 bg-white/[0.06] pl-12 pr-14 text-base shadow-card"
          onChange={handleSearch}
          value={searchData}
          autoComplete="off"
        />
        {searchData && (
          <Button
            type="button"
            onClick={clearSearch}
            size="icon"
            variant="ghost"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400"
            aria-label="Limpar busca"
          >
            <X className="size-5" />
          </Button>
        )}
      </div>
    </form>
  );
}
