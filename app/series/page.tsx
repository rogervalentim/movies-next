import { ChevronRightIcon } from "lucide-react";
import { Header } from "../_components/header";
import { Hero } from "../_components/hero";
import { Button } from "../_components/ui/button";
import { Footer } from "../_components/footer";
import { SeriesTrending } from "../_components/series-trending";
import { SeriesTopRated } from "./_components/series-top-rated";
import { SeriesPopular } from "./_components/series-popular";
import { SeriesNowPlaying } from "./_components/series-now-playing";
import Link from "next/link";

export default function SeriesPage() {
  return (
    <>
      <Header />

      <div className="pt-6 lg:pt-4 px-5 lg:px-32">
        <Hero contentType="tv" />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <SeriesTrending />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <SeriesTopRated />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <SeriesPopular />
      </div>

      <div className="space-y-4 pt-10 px-5 lg:px-32">
        <SeriesNowPlaying />
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </>
  );
}
