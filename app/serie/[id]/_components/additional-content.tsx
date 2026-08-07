import { Recommended } from "@/app/_components/recommended";
import { Similar } from "@/app/_components/similar";
import { SerieDetailsData } from "@/app/types";

interface AdditionalContentProps {
  id: number;
  serieDetails: SerieDetailsData;
}

export function AdditionalContent({ id }: AdditionalContentProps) {
  return (
    <>
      <div className="page-container section-spacing">
        <Recommended id={id} title="Séries recomendadas" contentType="tv" />
      </div>
      <div className="page-container section-spacing pt-2">
        <Similar id={id} title="Séries como essa" contentType="tv" />
      </div>
    </>
  );
}
