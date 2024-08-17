import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { SeriesPopularDetails } from "./_components/series-popular-details";

export default function SeriesPopularPage() {
  return (
    <>
      <Header />
      <div className="pt-4 px-5  lg:px-32">
        <h1 className="text-3xl font-bold mb-4">Séries Populares</h1>
        <SeriesPopularDetails />
      </div>

      <div className="pt-4">
        <Footer />
      </div>
    </>
  );
}
