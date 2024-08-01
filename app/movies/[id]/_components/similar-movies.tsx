import { Card } from "@/app/_components/card";
import { Button } from "@/app/_components/ui/button";
import { apiKey } from "@/app/utils/api-key";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SimilarMoviesProps {
  id: number;
}

interface SimilarMoviesData {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  href: string;
}

export function SimilarMovies({ id }: SimilarMoviesProps) {
  const [similarMovies, setSimilarMovies] = useState<SimilarMoviesData[]>([]);

  useEffect(() => {
    fetchSimilarMovies();
  }, [id]);

  async function fetchSimilarMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setSimilarMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between lg:px-0">
        <h2 className="font-semibold text-[#323232]">Filmes como este</h2>

        <Button
          variant="ghost"
          className="h-fit p-0 text-[#3a3cff] hover:bg-transparent"
          asChild
        >
          <span>
            Ver todos
            <ChevronRightIcon size={16} />
          </span>
        </Button>
      </div>
      <section className="flex gap-4 overflow-x-scroll  lg:gap-5  [&::-webkit-scrollbar]:hidden">
        {similarMovies.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
            href="/movies"
          />
        ))}
      </section>
    </>
  );
}
