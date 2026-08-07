import { Header } from "../_components/header";
import { Hero } from "../_components/hero";
import { Footer } from "../_components/footer";
import { SeriesTrending } from "../_components/series-trending";
import { SeriesTopRated } from "./_components/series-top-rated";
import { SeriesPopular } from "./_components/series-popular";
import { SeriesNowPlaying } from "./_components/series-now-playing";

export default function SeriesPage() {
  return (
    <>
      <Header />
      <main>
        <div className="page-container pt-4 sm:pt-6 lg:pt-8"><Hero contentType="tv" /></div>
        <div className="page-container section-spacing"><SeriesTrending /></div>
        <div className="page-container section-spacing pt-2"><SeriesTopRated /></div>
        <div className="page-container section-spacing pt-2"><SeriesPopular /></div>
        <div className="page-container section-spacing pt-2"><SeriesNowPlaying /></div>
      </main>
      <Footer />
    </>
  );
}
