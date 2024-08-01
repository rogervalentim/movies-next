import { Clapperboard, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="flex justify-between items-center px-5 lg:px-32 p-4">
      <div className="flex gap-2 items-center">
        <Clapperboard size={25} className="text-[#2a18ff] " />
        <h1 className="font-bold text-2xl text-[#2a18ff]">Movies</h1>
      </div>

      <Button size="icon" variant="ghost">
        <MenuIcon size={25} />
      </Button>
    </header>
  );
}
