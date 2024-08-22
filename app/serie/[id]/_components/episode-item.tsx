import { formatDate } from "@/app/utils/format-date";
import { formatDuration } from "@/app/utils/format-duration";
import Image from "next/image";

interface EpisodeItemData {
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  runtime: number;
  still_path: string;
  vote_average: number;
}

export function EpisodeItem({
  name,
  overview,
  air_date,
  episode_number,
  runtime,
  still_path,
  vote_average
}: EpisodeItemData) {
  return (
    <div className="flex flex-col items-center bg-background border border-border rounded-lg shadow">
      {still_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w780${still_path}`}
          alt={name}
          width={0}
          height={0}
          quality={100}
          sizes="100vh"
          className="rounded-t-lg shadow-md h-60  w-full"
        />
      ) : (
        <div className="flex justify-center items-center w-full h-56 lg:h-60 bg-[#3a3cff] rounded-lg shadow-md" />
      )}
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-lg flex gap-2 font-bold tracking-tight text-primary">
          <span>{episode_number}</span>
          {name}{" "}
        </h5>
        <p className="mb-3 font-normal text-muted-foreground">
          {overview === "" ? "sem descrição" : overview}
        </p>
        <div className="flex gap-3 items-center">
          <div className="text-primary">{vote_average.toFixed(2)}</div>
          <div>{formatDuration(runtime)}</div>
          <div>{formatDate(air_date)}</div>
        </div>
      </div>
    </div>
  );
}
