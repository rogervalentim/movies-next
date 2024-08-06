import { ChevronRightIcon } from "lucide-react";
import { Header } from "../_components/header";
import { Hero } from "../_components/hero";
import { Search } from "../_components/search";
import { Button } from "../_components/ui/button";
import { Footer } from "../_components/footer";
import { CategoriesList } from "../_components/categories-list";
import { SeriesTrending } from "../_components/series-trending";
import { SeriesTopRated } from "./_components/series-top-rated";
import { SeriesPopular } from "./_components/series-popular";
import { SeriesNowPlaying } from "./_components/series-now-playing";

export default function SeriesPage() {
  return (
    <>
      <Header />

      <div className="px-5 pt-6 lg:hidden">
        <Search />
      </div>

      <div className="flex lg:hidden gap-4 overflow-x-scroll px-5 lg:gap-5 lg:px-32 [&::-webkit-scrollbar]:hidden pt-6">
        <CategoriesList />
      </div>

      <div className="pt-6 lg:pt-0 px-5 lg:px-0">
        <Hero contentType="tv" />
      </div>

      <div className="hidden lg:flex gap-4 overflow-x-scroll px-5 lg:gap-5 lg:px-32 [&::-webkit-scrollbar]:hidden pt-10">
        <CategoriesList />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <div className="flex items-center justify-between  lg:px-0">
          <h2 className="font-semibold text-primary">Séries em tendência</h2>

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

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <div className="flex items-center justify-between  lg:px-0">
          <h2 className="font-semibold text-primary">
            Séries melhores classificadas
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
        <SeriesTopRated />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <div className="flex items-center justify-between  lg:px-0">
          <h2 className="font-semibold text-primary">Séries populares</h2>

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
        <SeriesPopular />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <div className="flex items-center justify-between  lg:px-0">
          <h2 className="font-semibold text-primary">Séries novas</h2>

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
        <SeriesNowPlaying />
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </>
  );
}
