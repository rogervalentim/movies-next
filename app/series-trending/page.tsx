import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { SeriesTrendingDetails } from "./_components/series-trending-details";

export default function SeriesTrendingPage() {
  return (
    <>
      <Header />
      <div className="pt-4 px-5  lg:px-32">
        <h1 className="text-3xl font-bold mb-4">Séries em Tendência</h1>
        <SeriesTrendingDetails />
      </div>

      <div className="pt-4">
        <Footer />
      </div>
    </>
  );
}
