import { Card } from "@/app/_components/card";
import { Button } from "@/app/_components/ui/button";
import { apiKey } from "@/app/utils/api-key";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SimilarSeriesProps {
  id: number;
}

interface SimilarSeriesData {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  href: string;
}

export function SimilarSeries({ id }: SimilarSeriesProps) {
  const [similarSeries, setSimilarSeries] = useState<SimilarSeriesData[]>([]);

  useEffect(() => {
    fetchSimilarSeries();
  }, [id]);

  async function fetchSimilarSeries() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setSimilarSeries(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between lg:px-0">
        <h2 className="font-semibold text-[#323232]">Séries como este</h2>

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
        {similarSeries.map((series) => (
          <Card
            key={series.id}
            id={series.id}
            poster_path={series.poster_path}
            title={series.title}
            vote_average={series.vote_average}
            href="/series"
          />
        ))}
      </section>
    </>
  );
}
