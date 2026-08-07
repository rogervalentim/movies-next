"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiKey } from "@/app/utils/api-key";
import { CastCard } from "./cast-card";
import { useCarousel } from "../_hooks/use-carousel";
import { CarouselButton } from "./carousel-button";
import { SectionHeading } from "./section-heading";
import { Button } from "./ui/button";

interface CastProps { id: number; contentType: string; }
interface CastData { id: number; name: string; character: string; profile_path: string; }

async function fetchCastData(id: number, contentType: string): Promise<CastData[]> {
  const response = await fetch(`https://api.themoviedb.org/3/${contentType}/${id}/credits?api_key=${apiKey}&language=pt-BR`);
  if (!response.ok) throw new Error("Falha ao carregar elenco");
  const data = await response.json();
  return data.cast ?? [];
}

export default function Cast({ id, contentType }: CastProps) {
  const [expanded, setExpanded] = useState(false);
  const { isLeftDisabled, isRightDisabled, scrollLeft, scrollRight, carouselRef } = useCarousel();
  const { data: castData = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["castData", id, contentType],
    queryFn: () => fetchCastData(id, contentType),
    staleTime: 1000 * 60 * 10
  });

  if (isLoading) {
    return <div className="flex gap-4 overflow-hidden">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="w-40 min-w-40"><div className="skeleton-shimmer aspect-[3/4] rounded-2xl" /><div className="skeleton-shimmer mt-3 h-5 rounded" /></div>)}</div>;
  }

  if (isError) {
    return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center"><p className="font-semibold text-white">Não foi possível carregar o elenco.</p><Button variant="outline" className="mt-4" onClick={() => refetch()}>Tentar novamente</Button></div>;
  }

  if (!castData.length) return <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-slate-400">Elenco não informado.</p>;

  const visibleCast = expanded ? castData : castData.slice(0, 12);

  return (
    <section aria-labelledby="cast-title">
      <SectionHeading title="Elenco" description={`${castData.length} pessoas creditadas`}>
        <div className="hidden gap-2 sm:flex"><CarouselButton direction="left" onClick={scrollLeft} disabled={isLeftDisabled} /><CarouselButton direction="right" onClick={scrollRight} disabled={isRightDisabled} /></div>
      </SectionHeading>
      <div ref={carouselRef} className="scrollbar-none flex snap-x gap-4 overflow-x-auto pb-3" tabIndex={0} aria-label="Carrossel do elenco">
        {visibleCast.map((cast) => <CastCard key={`${cast.id}-${cast.character}`} {...cast} />)}
      </div>
      {castData.length > 12 && (
        <Button variant="outline" className="mt-5" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
          {expanded ? "Mostrar elenco resumido" : `Ver elenco completo (${castData.length})`}
        </Button>
      )}
    </section>
  );
}
