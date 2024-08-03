"use client";

import { Card } from "@/app/_components/card";
import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";

interface CreditsProps {
  id: number;
}

interface CreditsData {
  id: number;
  poster_path: string;
  name: string;
  title: string;
  vote_average: number;
  media_type: string; // Adicione esta propriedade se for necessária
}

export function Credits({ id }: CreditsProps) {
  const [creditsData, setCreditsData] = useState<CreditsData[]>([]);

  useEffect(() => {
    fetchCreditsData();
  }, []);

  async function fetchCreditsData() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setCreditsData(data.cast);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="grid grid-cols-2 gap-4">
        {creditsData.map((credit) => {
          const href = credit.media_type === "movie" ? `/movie` : `/serie`;

          return (
            <Card
              id={credit.id}
              key={credit.id}
              name={credit.name}
              title={credit.title}
              poster_path={credit.poster_path}
              href={href}
              vote_average={credit.vote_average}
            />
          );
        })}
      </section>
    </>
  );
}
