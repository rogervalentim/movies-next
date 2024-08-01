"use client";

import { Card } from "@/app/_components/card";
import { Button } from "@/app/_components/ui/button";
import { apiKey } from "@/app/utils/api-key";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface RecommendedSeriesProps {
  id: number;
}

interface RecommendedSeriesData {
  id: number;
  poster_path: string;
  name: string;
  vote_average: number;
  href: string;
}

export function RecommendedSeries({ id }: RecommendedSeriesProps) {
  const [recommendedSeries, setRecommendedSeries] = useState<
    RecommendedSeriesData[]
  >([]);
  const [hasSeries, setHasSeries] = useState<boolean>(false);

  useEffect(() => {
    fetchRecommendedSeries();
  }, [id]);

  async function fetchRecommendedSeries() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setRecommendedSeries(data.results);
      setHasSeries(data.results.length > 0);
    } catch (error) {
      console.log(error);
    }
  }

  if (!hasSeries) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between lg:px-0">
        <h2 className="font-semibold text-[#323232]">Series recomendadas</h2>

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
      <section className="flex gap-4 overflow-x-scroll lg:gap-5 [&::-webkit-scrollbar]:hidden">
        {recommendedSeries.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            name={movie.name}
            vote_average={movie.vote_average}
            href="/series"
          />
        ))}
      </section>
    </>
  );
}
