import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { MoviesTrending } from "./_components/movies-trending";
import { SeriesTrending } from "./_components/series-trending";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="page-container pt-4 sm:pt-6 lg:pt-8">
          <Hero contentType="movie" />
        </div>
        <div className="page-container section-spacing">
          <MoviesTrending />
        </div>
        <div className="page-container section-spacing pt-2 sm:pt-4">
          <SeriesTrending />
        </div>
      </main>
      <Footer />
    </>
  );
}
