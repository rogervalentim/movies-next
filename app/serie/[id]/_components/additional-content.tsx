import { Episodes } from "@/app/_components/episodes";
import { Recommended } from "@/app/_components/recommended";
import { Similar } from "@/app/_components/similar";
import { SerieDetailsData } from "@/app/types";

interface AdditionalContentProps {
  id: number;
  serieDetails: SerieDetailsData;
}

export function AdditionalContent({
  id,
  serieDetails
}: AdditionalContentProps) {
  return (
    <>
      <div className="space-y-4 px-5 lg:px-32">
        <Recommended id={id} title="Séries recomendadas" contentType="tv" />
      </div>
      <div className="space-y-4 px-5 lg:px-32">
        <Similar id={id} title="Séries como essa" contentType="tv" />
      </div>
      <div className="space-y-4 px-5 lg:px-32">
        <Episodes id={id} />
      </div>
    </>
  );
}
