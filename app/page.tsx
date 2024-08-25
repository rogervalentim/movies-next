import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { Header } from "./_components/header";
import { MoviesTrending } from "./_components/movies-trending";
import { SeriesTrending } from "./_components/series-trending";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <div className="pt-6 lg:pt-4 px-5 lg:px-32">
        <Hero contentType="movie" />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <MoviesTrending />
      </div>

      <div className="pt-6 lg:hidden px-5">
        <Hero contentType="tv" />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <SeriesTrending />
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </>
  );
}
