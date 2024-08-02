import { Button } from "./_components/ui/button";
import { ChevronRightIcon, Ghost, Heart, Smile } from "lucide-react";
import { Header } from "./_components/header";
import { GiRevolver } from "react-icons/gi";
import { FaRegSadCry } from "react-icons/fa";
import { MoviesTrending } from "./_components/movies-trending";
import { SeriesTrending } from "./_components/series-trending";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";
import { Search } from "./_components/search";
import { CategoriesList } from "./_components/categories-list";

export default function Home() {
  return (
    <>
      <Header />

      <div className="px-5 pt-6 lg:hidden">
        <Search />
      </div>

      <div className="flex lg:hidden gap-4 overflow-x-scroll px-5 lg:gap-5 lg:px-32 [&::-webkit-scrollbar]:hidden pt-6">
        <CategoriesList />
      </div>

      <div className="pt-6 lg:pt-0">
        <Hero />
      </div>

      <div className="hidden lg:flex gap-4 overflow-x-scroll px-5 lg:gap-5 lg:px-32 [&::-webkit-scrollbar]:hidden pt-10">
        <CategoriesList />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <div className="flex items-center justify-between  lg:px-0">
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
        <div className="flex items-center justify-between lg:px-0">
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

      <Footer />
    </>
  );
}
