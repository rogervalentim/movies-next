import { ChevronRightIcon } from "lucide-react";
import { Header } from "../_components/header";
import { Hero } from "../_components/hero";
import { Button } from "../_components/ui/button";
import { MoviesTrending } from "../_components/movies-trending";
import { MoviesTopRated } from "./_components/movies-top-rated";
import { Footer } from "../_components/footer";
import { MoviesPopular } from "./_components/movies-popular";
import { MoviesNowPlaying } from "./_components/movies-now-playing";
import Link from "next/link";

export default function MoviesPage() {
  return (
    <>
      <Header />

      <div className="pt-6 lg:pt-4 px-5 lg:px-32">
        <Hero contentType="movie" />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <MoviesTrending />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <MoviesTopRated />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <MoviesPopular />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <MoviesNowPlaying />
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </>
  );
}
