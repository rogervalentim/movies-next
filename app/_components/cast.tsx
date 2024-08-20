"use client";

import { CastCard } from "@/app/_components/cast-card";
import { apiKey } from "@/app/utils/api-key";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./loading";

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

async function fetchCastData(
  id: number,
  contentType: string
): Promise<CastData[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${id}/credits?api_key=${apiKey}&language=pt-BR`
  );
  const data = await response.json();
  return data.cast;
}

export default function Cast({ id, contentType }: CastProps) {
  const {
    data: castData = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["castData", id, contentType],
    queryFn: () => fetchCastData(id, contentType)
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading cast data</p>;

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
