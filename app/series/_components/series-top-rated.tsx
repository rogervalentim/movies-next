"use client";

import { Card } from "@/app/_components/card";
import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";

interface SeriesTopRatedData {
  id: number;
  poster_path: string;
  name: string;
  vote_average: number;
}

export function SeriesTopRated() {
  const [seriesTopRatedData, setSeriesTopRatedData] = useState<
    SeriesTopRatedData[]
  >([]);

  useEffect(() => {
    fetchSeriesTopRated();
  }, []);

  async function fetchSeriesTopRated() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setSeriesTopRatedData(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="flex gap-4 overflow-x-scroll  lg:gap-5 [&::-webkit-scrollbar]:hidden">
        {seriesTopRatedData.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            poster_path={item.poster_path}
            name={item.name}
            vote_average={item.vote_average}
            href="/serie"
          />
        ))}
      </section>
    </>
  );
}
