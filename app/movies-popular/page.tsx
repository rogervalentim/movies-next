import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MoviesPopularDetails } from "./_components/movies-popular-details";

export default function MoviesTopRatedPage() {
  return (
    <>
      <Header />
      <div className="pt-4 px-5  lg:px-32">
        <h1 className="text-3xl font-bold mb-4">Filmes populares</h1>
        <MoviesPopularDetails />
      </div>

      <div className="pt-4">
        <Footer />
      </div>
    </>
  );
}
