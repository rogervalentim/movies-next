import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search as SearchIcon } from "lucide-react";

export function Search() {
  return (
    <form className="flex gap-2 lg:gap-0">
      <Input
        placeholder="Busque por filmes ou séries"
        className=" border-none  lg:w-[570px] lg:rounded lg:rounded-l-md"
      />
      <Button
        className="bg-gradient-to-b rounded-l-none rounded-r-md from-[#3a3cff] to-[#2a18ff] hover:bg-gradient-to-b hover:from[#2a18ff] hover:to-[#1e0ae3]"
        size="icon"
      >
        <SearchIcon size={20} className="text-white" />
      </Button>
    </form>
  );
}
