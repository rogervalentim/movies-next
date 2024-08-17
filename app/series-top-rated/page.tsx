import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { SeriesTopRatedDetails } from "./_components/series-top-rated-details";

export default function SeriesTopRatedPage() {
  return (
    <>
      <Header />
      <div className="pt-4 px-5  lg:px-32">
        <h1 className="text-3xl font-bold mb-4">
          Séries melhores classificadas
        </h1>
        <SeriesTopRatedDetails />
      </div>

      <div className="pt-4">
        <Footer />
      </div>
    </>
  );
}
