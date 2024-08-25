import { Card } from "@/app/_components/card";
import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";
import { CarouselButton } from "./carousel-button";
import { useCarousel } from "../_hooks/use-carousel";

interface SimilarProps {
  id: number;
  title: string;
  contentType: string;
}

interface SimilarData {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  vote_average: number;
  href: string;
}

export function Similar({ id, contentType, title }: SimilarProps) {
  const [similarSeries, setSimilarSeries] = useState<SimilarData[]>([]);
  const [hasMovies, setHasMovies] = useState<boolean>(false);

  useEffect(() => {
    fetchSimilarSeries();
  }, [id]);

  const {
    isLeftDisabled,
    isRightDisabled,
    scrollLeft,
    scrollRight,
    carouselRef
  } = useCarousel();

  async function fetchSimilarSeries() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}/similar?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setSimilarSeries(data.results);
      setHasMovies(data.results.length > 0);
    } catch (error) {
      console.log(error);
    }
  }

  if (!hasMovies) {
    return null;
  }

  return (
    <>
      <div className="lg:px-0">
        <div className="flex gap-3 items-center">
          <h2 className="font-semibold text-primary lg:text-lg">{title}</h2>
          <div className="hidden lg:flex items-center gap-3">
            <CarouselButton
              direction="left"
              onClick={scrollLeft}
              disabled={isLeftDisabled}
            />
            <CarouselButton
              direction="right"
              onClick={scrollRight}
              disabled={isRightDisabled}
            />
          </div>
        </div>
      </div>
      <section
        ref={carouselRef}
        className="flex gap-4 overflow-x-scroll  lg:gap-5  [&::-webkit-scrollbar]:hidden"
      >
        {similarSeries.map((series) => (
          <Card
            key={series.id}
            id={series.id}
            poster_path={series.poster_path}
            title={series.title}
            name={series.name}
            vote_average={series.vote_average}
            href={contentType === "tv" ? "/serie" : "/movie"}
          />
        ))}
      </section>
    </>
  );
}
