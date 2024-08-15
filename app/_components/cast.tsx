"use client";

import { CastCard } from "@/app/_components/cast-card";
import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";

interface CastProps {
  id: number;
  contentType: string;
}

interface CastData {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export default function Cast({ id, contentType }: CastProps) {
  const [castData, setCastData] = useState<CastData[]>([]);

  useEffect(() => {
    fetchCastData();
  }, []);

  async function fetchCastData() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}/credits?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setCastData(data.cast);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex gap-4 overflow-x-scroll lg:gap-5  [&::-webkit-scrollbar]:hidden">
      {castData.map((cast) => (
        <CastCard
          key={cast.id}
          id={cast.id}
          profile_path={cast.profile_path}
          name={cast.name}
          character={cast.character}
        />
      ))}
    </section>
  );
}
