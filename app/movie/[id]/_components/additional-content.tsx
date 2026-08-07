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
      <div className="page-container section-spacing">
        <Recommended id={id} title="Filmes recomendados" contentType="movie" />
      </div>
      <div className="page-container section-spacing pt-2">
        <Similar id={id} title="Filmes como este" contentType="movie" />
      </div>
      {movieDetails?.belongs_to_collection && (
        <div className="page-container section-spacing pt-2">
          <Collection
            key={movieDetails?.belongs_to_collection?.id}
            id={movieDetails?.belongs_to_collection?.id}
            backdrop_path={
              movieDetails?.belongs_to_collection?.backdrop_path || ""
            }
            poster_path={movieDetails?.belongs_to_collection?.poster_path || ""}
            name={movieDetails?.belongs_to_collection?.name}
          />
        </div>
      )}
    </>
  );
}
