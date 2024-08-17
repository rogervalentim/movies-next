import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MoviesNowPlayingDetails } from "./_components/movies-now-playing-details";

export default function MoviesNowPlayingPage() {
  return (
    <>
      <Header />
      <div className="pt-4 px-5  lg:px-32">
        <h1 className="text-3xl font-bold mb-4">Filmes agora em exibição</h1>
        <MoviesNowPlayingDetails />
      </div>

      <div className="pt-4">
        <Footer />
      </div>
    </>
  );
}
