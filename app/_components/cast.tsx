"use client";

import { CastCard } from "@/app/_components/cast-card";
import { apiKey } from "@/app/utils/api-key";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./loading";
import { useCarousel } from "../_hooks/use-carousel";
import { CarouselButton } from "./carousel-button";

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
    isLeftDisabled,
    isRightDisabled,
    scrollLeft,
    scrollRight,
    carouselRef
  } = useCarousel();

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
    <>
      <div className="hidden lg:flex items-center gap-3">
        <CarouselButton
          direction="left"
          onClick={scrollLeft}
          disabled={false}
        />
        <CarouselButton
          direction="right"
          onClick={scrollRight}
          disabled={isRightDisabled}
        />
      </div>
      <section
        ref={carouselRef}
        className="flex gap-4 overflow-x-scroll lg:gap-5  [&::-webkit-scrollbar]:hidden pt-4"
      >
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
    </>
  );
}
