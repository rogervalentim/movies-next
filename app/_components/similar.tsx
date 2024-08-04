import { Card } from "@/app/_components/card";
import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetchSimilarSeries();
  }, [id]);

  async function fetchSimilarSeries() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}/similar?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setSimilarSeries(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="lg:px-0">
        <h2 className="font-semibold text-[#323232]">{title}</h2>
      </div>
      <section className="flex gap-4 overflow-x-scroll  lg:gap-5  [&::-webkit-scrollbar]:hidden">
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
