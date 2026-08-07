import { Header } from "../_components/header";
import { Hero } from "../_components/hero";
import { MoviesTrending } from "../_components/movies-trending";
import { MoviesTopRated } from "./_components/movies-top-rated";
import { Footer } from "../_components/footer";
import { MoviesPopular } from "./_components/movies-popular";
import { MoviesNowPlaying } from "./_components/movies-now-playing";

export default function MoviesPage() {
  return (
    <>
      <Header />
      <main>
        <div className="page-container pt-4 sm:pt-6 lg:pt-8"><Hero contentType="movie" /></div>
        <div className="page-container section-spacing"><MoviesTrending /></div>
        <div className="page-container section-spacing pt-2"><MoviesTopRated /></div>
        <div className="page-container section-spacing pt-2"><MoviesPopular /></div>
        <div className="page-container section-spacing pt-2"><MoviesNowPlaying /></div>
      </main>
      <Footer />
    </>
  );
}
