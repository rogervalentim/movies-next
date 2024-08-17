import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { SeriesNowPlayingDetails } from "./_components/series-now-playing-details";

export default function SeriesNowPlayingPage() {
  return (
    <>
      <Header />
      <div className="pt-4 px-5  lg:px-32">
        <h1 className="text-3xl font-bold mb-4">Séries agora em exibição</h1>
        <SeriesNowPlayingDetails />
      </div>

      <div className="pt-4">
        <Footer />
      </div>
    </>
  );
}
