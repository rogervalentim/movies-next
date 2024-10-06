"use client";

import { InfoCard } from "@/app/_components/info-card";
import { apiKey } from "@/app/utils/api-key";
import { extractYear } from "@/app/utils/format-date";
import Link from "next/link";
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
  media_type: string;
  release_date: string;
  first_air_date: string;
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

      const uniqueCredits = data.cast.reduce(
        (acc: CreditsData[], current: CreditsData) => {
          const x = acc.find((item) => item.id === current.id);
          if (!x) {
            acc.push(current);
          }
          return acc;
        },
        []
      );

      setCreditsData(uniqueCredits);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {creditsData.map((credit) => {
          const href = credit.media_type === "movie" ? `/movie` : `/serie`;
          const year = extractYear(
            credit.release_date || credit.first_air_date
          );

          return (
            <Link href={`${href}/${credit.id}`} key={credit.id}>
              <InfoCard
                name={credit.name}
                title={credit.title}
                poster_path={credit.poster_path}
                year={year}
                vote_average={credit.vote_average}
              />
            </Link>
          );
        })}
      </section>
    </>
  );
}
