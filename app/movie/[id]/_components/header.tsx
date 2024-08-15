import { MovieDetailsData } from "@/app/types";
import { StarIcon } from "lucide-react";
import { Genres } from "../../../_components/genres";
import { Description } from "../../../_components/description";

interface HeaderProps {
  movieDetails: MovieDetailsData;
}

export function Header({ movieDetails }: HeaderProps) {
  return (
    <div className="px-5 space-y-4">
      <div className="flex justify-between items-start">
        <h1 className="text-xl font-semibold">{movieDetails.title}</h1>
        <div className="flex items-center gap-1 rounded-full bg-foreground text-background px-1.5 py-[2px] ">
          <StarIcon size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-lg">
            {movieDetails.vote_average.toFixed(2)}
          </span>
        </div>
      </div>
      <Genres genres={movieDetails.genres} />
      <Description overview={movieDetails.overview} contentType="movie" />
    </div>
  );
}
