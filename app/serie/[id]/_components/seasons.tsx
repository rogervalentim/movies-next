import React, { useState, useCallback, useEffect, Suspense } from "react";
import { apiKey } from "@/app/utils/api-key";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/app/_components/ui/dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TabButton } from "@/app/_components/tab-button";
import { SeasonsItem } from "./seasons-item";
import { EpisodeItem } from "./episode-item";
import { Loading } from "@/app/_components/loading";
import { CrewItem } from "./crew-item";

interface SeasonsProps {
  id: number;
}

interface SeasonsData {
  episode_count: number;
  id: number;
  name: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  season_number: number;
}

interface CrewProps {
  id: number;
  name: string;
  job: string;
  profile_path: string;
}

interface GuestStarsProps {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

interface EpisodeData {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  runtime: number;
  still_path: string;
  vote_average: number;
  crew: CrewProps[];
  guest_stars: GuestStarsProps[];
}

const TABS = {
  EPISODES: "episodes",
  CREW: "crew",
  GUEST_STARS: "guest star"
};

export function Seasons({ id }: SeasonsProps) {
  const [seasonsData, setSeasonsData] = useState<SeasonsData[]>([]);
  const [episodesData, setEpisodesData] = useState<EpisodeData[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(TABS.EPISODES);

  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  useEffect(() => {
    if (id) {
      fetchSeasons();
    }
  }, [id]);

  async function fetchSeasons() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch series details");
      }
      const data = await response.json();
      setSeasonsData(data.seasons);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchEpisodes(seasonNumber: number) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${apiKey}&language=pt-BR`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch episodes");
      }
      const data = await response.json();
      setEpisodesData(data.episodes);
      setSelectedSeason(seasonNumber);
    } catch (error) {
      console.log(error);
    }
  }

  const selectedSeasonData = seasonsData.find(
    (season) => season.season_number === selectedSeason
  );

  const getUniqueCrew = (episodes: EpisodeData[]) => {
    const crewMap = new Map<number, CrewProps>();
    episodes.forEach((episode) =>
      episode.crew.forEach((crewMember) =>
        crewMap.set(crewMember.id, crewMember)
      )
    );
    return Array.from(crewMap.values());
  };

  const getUniqueGuestStars = (episodes: EpisodeData[]) => {
    const guestStarsMap = new Map<number, GuestStarsProps>();
    episodes.forEach((episode) =>
      episode.guest_stars.forEach((castMember) =>
        guestStarsMap.set(castMember.id, castMember)
      )
    );
    return Array.from(guestStarsMap.values());
  };

  const uniqueCrew = getUniqueCrew(episodesData);
  const uniqueGuestStars = getUniqueGuestStars(episodesData);

  const renderContent = () => {
    switch (activeTab) {
      case TABS.EPISODES:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {episodesData?.map((item) => (
              <EpisodeItem
                key={item.id}
                name={item.name}
                still_path={item.still_path}
                air_date={item.air_date}
                overview={item.overview}
                episode_number={item.episode_number}
                runtime={item.runtime}
                vote_average={item.vote_average}
              />
            ))}
          </div>
        );

      case TABS.CREW:
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {uniqueCrew?.map((crewMember) => (
              <CrewItem
                key={crewMember.id}
                id={crewMember.id}
                name={crewMember.name}
                profile_path={crewMember.profile_path}
                job={crewMember.job}
              />
            ))}
          </div>
        );

      case TABS.GUEST_STARS:
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {uniqueGuestStars?.map((castMember) => (
              <CrewItem
                key={castMember.id}
                id={castMember.id}
                name={castMember.name}
                profile_path={castMember.profile_path}
                character={castMember.character}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {seasonsData.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-5 pt-4">
          {seasonsData.map((season) => (
            <button
              key={season.id}
              onClick={() => {
                fetchEpisodes(season.season_number);
                setActiveTab(TABS.EPISODES);
              }}
            >
              <SeasonsItem
                poster_path={season.poster_path}
                name={season.name}
                vote_average={season.vote_average}
                episode_count={season.episode_count}
              />
            </button>
          ))}
        </div>
      )}

      {selectedSeason !== null && (
        <Dialog
          modal
          open={selectedSeason !== null}
          onOpenChange={() => setSelectedSeason(null)}
        >
          <DialogContent className="max-w-screen-lg pb-10">
            <ScrollArea className="max-h-[80dvh] md:pr-4">
              <DialogHeader>
                <DialogTitle>Temporada {selectedSeason}</DialogTitle>
                <div className="flex gap-2 overflow-x-scroll pt-4 [&::-webkit-scrollbar]:hidden">
                  <TabButton
                    onClick={() => handleTabClick(TABS.EPISODES)}
                    isActive={activeTab === TABS.EPISODES}
                    label="Episódios"
                  />
                  <TabButton
                    onClick={() => handleTabClick(TABS.CREW)}
                    isActive={activeTab === TABS.CREW}
                    label="Equipe"
                  />
                  <TabButton
                    onClick={() => handleTabClick(TABS.GUEST_STARS)}
                    isActive={activeTab === TABS.GUEST_STARS}
                    label="Estrelas convidadas"
                  />
                </div>
              </DialogHeader>

              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
