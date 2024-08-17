import { Description } from "@/app/_components/description";
import { Genres } from "@/app/_components/genres";
import { SerieDetailsData } from "@/app/types";
import { StarIcon } from "lucide-react";

interface HeaderProps {
  serieDetails: SerieDetailsData;
}
export function Header({ serieDetails }: HeaderProps) {
  return (
    <div className="px-5 lg:px-32 space-y-4">
      <div className="flex justify-between items-start">
        <h1 className="text-xl lg:text-3xl font-semibold">
          {serieDetails.name}
        </h1>
        <div className="flex items-center gap-1 rounded-full bg-foreground text-background px-1.5 py-[2px]">
          <StarIcon size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-lg">
            {serieDetails.vote_average.toFixed(2)}
          </span>
        </div>
      </div>
      <Genres genres={serieDetails.genres} />
      <Description overview={serieDetails.overview} contentType="tv" />
    </div>
  );
}
