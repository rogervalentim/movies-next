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
  vote_average: number;
}

export function Episodes({ id, onShowSeasons }: EpisodesProps) {
  const [episodeData, setEpisodeData] = useState<EpisodesData | null>(null);

  useEffect(() => {
    fetchBestEpisode();
  }, [id]);

  async function fetchBestEpisode() {
    try {
      const seriesResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`
      );
      const seriesData = await seriesResponse.json();
      let seasonNumber = seriesData.number_of_seasons;

      let bestEpisode: EpisodesData | null = null;

      for (let season = 1; season <= seasonNumber; season++) {
        const seasonResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${apiKey}&language=pt-BR`
        );
        const seasonData = await seasonResponse.json();

        for (const episode of seasonData.episodes) {
          if (!bestEpisode || episode.vote_average > bestEpisode.vote_average) {
            const episodeResponse = await fetch(
              `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode.episode_number}?api_key=${apiKey}&language=pt-BR`
            );
            const episodeData = await episodeResponse.json();

            bestEpisode = {
              ...episodeData,
              episode_number: episode.episode_number,
              season_number: season,
              vote_average: episode.vote_average
            };
          }
        }
      }

      setEpisodeData(bestEpisode);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative min-h-[400px] flex items-center justify-center bg-black/80 rounded-xl shadow-2xl overflow-hidden">
      {episodeData ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center space-y-10 px-6 lg:px-10 py-24">
          <div
            className="absolute inset-0 w-full h-full z-0 brightness-50"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${episodeData.still_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1 className="text-white text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
              {episodeData.name}
            </h1>
            <p className="text-white/90 mt-4 text-lg sm:text-xl leading-relaxed drop-shadow-md">
              {episodeData.overview}
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 text-gray-900 rounded-full shadow-lg">
              <span className="font-semibold">
                Temporada {episodeData.season_number}
              </span>
              <span>•</span>
              <span>Episódio {episodeData.episode_number}</span>
            </div>

            <Button
              className="px-10 py-3 bg-gradient-to-tr from-[#4e46ff] to-[#1e00ff] shadow-xl text-white text-sm font-medium rounded-full hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
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
