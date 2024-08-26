import { ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search as SearchIcon, X as ClearIcon } from "lucide-react";

interface SearchProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  searchData: string;
  clearSearch: () => void;
}

export function Search({ handleSearch, searchData, clearSearch }: SearchProps) {
  return (
    <form className="relative flex gap-2 lg:gap-0">
      <div className="relative flex-grow">
        <Input
          placeholder="Busque por filmes ou séries"
          className="border-none lg:rounded lg:rounded-l-md pr-10"
          onChange={handleSearch}
          value={searchData}
        />
        {searchData && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
          >
            <ClearIcon size={20} />
          </button>
        )}
      </div>
      <Button
        className="lg:rounded-l-none lg:rounded-r-md bg-gradient-to-b from-[#3a3cff] to-[#2a18ff] hover:bg-gradient-to-b hover:from-[#2a18ff] hover:to-[#1e0ae3]"
        size="icon"
      >
        <SearchIcon size={20} className="text-white" />
      </Button>
    </form>
  );
}
