import { ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  searchData: string;
}

export function Search({ handleSearch, searchData }: SearchProps) {
  return (
    <form className="flex gap-2 lg:gap-0">
      <Input
        placeholder="Busque por filmes ou séries"
        className=" border-none lg:rounded lg:rounded-l-md"
        onChange={handleSearch}
        value={searchData}
      />
      <Button
        className=" lg:rounded-l-none lg:rounded-r-md bg-gradient-to-b from-[#3a3cff] to-[#2a18ff] hover:bg-gradient-to-b hover:from[#2a18ff] hover:to-[#1e0ae3]"
        size="icon"
      >
        <SearchIcon size={20} className="text-white" />
      </Button>
    </form>
  );
}
