import { Button } from "./_components/ui/button";
import { ChevronRightIcon, Ghost, Heart, Search, Smile } from "lucide-react";
import { Header } from "./_components/header";
import { GiRevolver } from "react-icons/gi";
import { FaRegSadCry } from "react-icons/fa";
import { MoviesTrending } from "./_components/movies-trending";
import { SeriesTrending } from "./_components/series-trending";
import { Hero } from "./_components/hero";

export default function Home() {
  return (
    <>
      <Header />

      <Hero />

      <div className="hidden lg:flex  gap-4 overflow-x-scroll px-5 lg:gap-5 lg:px-32 [&::-webkit-scrollbar]:hidden pt-10">
        <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
          <GiRevolver size={20} />
          <span className="text-sm font-semibold text-[#323232]">Ação</span>
        </div>
        <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
          <Smile size={20} />
          <span className="text-sm font-semibold text-[#323232]">Comédia</span>
        </div>
        <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
          <FaRegSadCry size={20} />
          <span className="text-sm font-semibold text-[#323232]">Drama</span>
        </div>
        <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
          <Heart size={20} className="text-red-600 fill-red-600" />
          <span className="text-sm font-semibold text-[#323232]">Romance</span>
        </div>
        <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
          <span className="text-sm font-semibold text-[#323232]">Suspense</span>
        </div>
        <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
          <Ghost size={20} />
          <span className="text-sm font-semibold text-[#323232]">Terror</span>
        </div>
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <div className="flex items-center justify-between px-5 lg:px-0">
          <h2 className="font-semibold text-[#323232]">Filmes em tendência</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-[#3a3cff] hover:bg-transparent"
            asChild
          >
            <span>
              Ver todos
              <ChevronRightIcon size={16} />
            </span>
          </Button>
        </div>
        <MoviesTrending />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <div className="flex items-center justify-between px-5 lg:px-0">
          <h2 className="font-semibold text-[#323232]">Séries em tendência</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-[#3a3cff] hover:bg-transparent"
            asChild
          >
            <span>
              Ver todos
              <ChevronRightIcon size={16} />
            </span>
          </Button>
        </div>
        <SeriesTrending />
      </div>
    </>
  );
}
