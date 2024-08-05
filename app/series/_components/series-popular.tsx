"use client";

import { Card } from "@/app/_components/card";
import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";

interface SeriesPopularData {
  id: number;
  poster_path: string;
  name: string;
  vote_average: number;
}

export function SeriesPopular() {
  const [seriesPopularData, setSeriesPopularData] = useState<
    SeriesPopularData[]
  >([]);

  useEffect(() => {
    fetchSeriesPopular();
  }, []);

  async function fetchSeriesPopular() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setSeriesPopularData(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="flex gap-4 overflow-x-scroll  lg:gap-5 [&::-webkit-scrollbar]:hidden">
        {seriesPopularData.map((item) => (
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
