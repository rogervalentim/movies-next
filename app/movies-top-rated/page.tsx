import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MoviesTopRatedDetails } from "./_components/movies-top-rated-details";

export default function MoviesTopRatedPage() {
  return (
    <>
      <Header />
      <div className="pt-4 px-5  lg:px-32">
        <h1 className="text-3xl font-bold mb-4">
          Filmes melhores classificados
        </h1>
        <MoviesTopRatedDetails />
      </div>

      <div className="pt-4">
        <Footer />
      </div>
    </>
  );
}
