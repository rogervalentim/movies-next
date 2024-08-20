import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { Loading } from "./loading";
import { Button } from "./ui/button";

interface EpisodesProps {
  id: number;
  onShowSeasons: () => void;
}

interface EpisodesData {
  name: string;
  overview: string;
  id: number;
  runtime: number;
  season_number: number;
  still_path: string;
  episode_number: number;
}

export function Episodes({ id, onShowSeasons }: EpisodesProps) {
  const [episodeData, setEpisodeData] = useState<EpisodesData | null>(null);

  useEffect(() => {
    fetchLatestEpisode();
  }, [id]);

  async function fetchLatestEpisode() {
    try {
      const seriesResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`
      );
      const seriesData = await seriesResponse.json();
      let seasonNumber = seriesData.number_of_seasons;

      while (seasonNumber > 0) {
        const seasonResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${apiKey}&language=pt-BR`
        );
        const seasonData = await seasonResponse.json();

        if (seasonData.episodes && seasonData.episodes.length > 0) {
          const lastEpisodeNumber =
            seasonData.episodes[seasonData.episodes.length - 1].episode_number;

          const episodeResponse = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${lastEpisodeNumber}?api_key=${apiKey}&language=pt-BR`
          );
          const episodeData = await episodeResponse.json();

          setEpisodeData({
            ...episodeData,
            episode_number: lastEpisodeNumber,
            season_number: seasonNumber
          });
          return;
        }

        seasonNumber--;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative min-h-[400px] flex items-center justify-center bg-black/80 rounded-xl shadow-xl overflow-hidden">
      {episodeData ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center space-y-8 px-4 lg:px-8 py-24">
          <div
            className="absolute inset-0 w-full h-full z-0 brightness-50"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${episodeData.still_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              {episodeData.name}
            </h1>
            <p className="text-white/80 mt-4 text-lg sm:text-xl leading-relaxed">
              {episodeData.overview}
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 text-gray-800 rounded-full shadow-md">
              <span className="font-medium">
                Temp {episodeData.season_number}
              </span>
              <span>•</span>
              <span>Ep {episodeData.episode_number}</span>
            </div>

            <Button
              className="px-8 py-3 bg-gradient-to-tl from-[#3a3cff] to-[#2a18ff] shadow-lg text-white text-sm font-medium rounded-full hover:scale-105 transition-transform duration-200 ease-in-out"
              onClick={onShowSeasons}
            >
              <a href="#seasons">Ver Episódios</a>
            </Button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
