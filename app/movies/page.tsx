import { ChevronRightIcon } from "lucide-react";
import { Header } from "../_components/header";
import { Hero } from "../_components/hero";
import { Search } from "../_components/search";
import { Button } from "../_components/ui/button";
import { MoviesTrending } from "../_components/movies-trending";
import { MoviesTopRated } from "./_components/movies-top-rated";
import { Footer } from "../_components/footer";
import { MoviesPopular } from "./_components/movies-popular";
import { MoviesNowPlaying } from "./_components/movies-now-playing";
import { CategoriesList } from "../_components/categories-list";

export default function MoviesPage() {
  return (
    <>
      <Header />

      <div className="px-5 pt-6 lg:hidden">
        <Search />
      </div>

      <div className="flex lg:hidden gap-4 overflow-x-scroll px-5 lg:gap-5 lg:px-32 [&::-webkit-scrollbar]:hidden pt-6">
        <CategoriesList />
      </div>

      <div className="pt-6 lg:pt-4 px-5 lg:px-32">
        <Hero contentType="movie" />
      </div>

      <div className="hidden lg:flex gap-4 overflow-x-scroll px-5 lg:gap-5 lg:px-32 [&::-webkit-scrollbar]:hidden pt-10">
        <CategoriesList />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <div className="flex items-center justify-between  lg:px-0">
          <h2 className="font-semibold text-primary">Filmes em tendência</h2>

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
        <div className="flex items-center justify-between  lg:px-0">
          <h2 className="font-semibold text-primary">
            Filmes melhores classificados
          </h2>

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
        <MoviesTopRated />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <div className="flex items-center justify-between  lg:px-0">
          <h2 className="font-semibold text-primary">Filmes populares</h2>

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
        <MoviesPopular />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <div className="flex items-center justify-between  lg:px-0">
          <h2 className="font-semibold text-primary">Filmes novos</h2>

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
        <MoviesNowPlaying />
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </>
  );
}
