import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MoviesTrendingDetails } from "./_components/movies-trending-details";

export default function MoviesTrendingPage() {
  return (
    <>
      <Header />
      <div className="pt-4 px-5  lg:px-32">
        <h1 className="text-3xl font-bold mb-4">Filmes em Tendência</h1>
        <MoviesTrendingDetails />
      </div>

      <div className="pt-4">
        <Footer />
      </div>
    </>
  );
}
