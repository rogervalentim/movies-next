import { Collection } from "@/app/_components/collection";
import { Recommended } from "@/app/_components/recommended";
import { Similar } from "@/app/_components/similar";
import { MovieDetailsData } from "@/app/types";

interface AdditionalContentProps {
  id: number;
  movieDetails: MovieDetailsData;
}

export function AdditionalContent({
  id,
  movieDetails
}: AdditionalContentProps) {
  return (
    <>
      <div className="space-y-4 px-5 lg:px-32">
        <Recommended id={id} title="Filmes recomendados" contentType="movie" />
      </div>
      <div className="space-y-4 px-5 lg:px-32">
        <Similar id={id} title="Filmes como este" contentType="movie" />
      </div>
      {movieDetails?.belongs_to_collection && (
        <div className="space-y-4 px-5 lg:px-32">
          <Collection
            key={movieDetails?.belongs_to_collection?.id}
            id={movieDetails?.belongs_to_collection?.id}
            backdrop_path={
              movieDetails?.belongs_to_collection?.backdrop_path || ""
            }
            name={movieDetails?.belongs_to_collection?.name}
          />
        </div>
      )}
    </>
  );
}
