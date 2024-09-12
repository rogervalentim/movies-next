import React, { useState, useCallback, Suspense, useEffect } from "react";
import { TabButton } from "@/app/_components/tab-button";
import { Header } from "./header";
import { AdditionalContent } from "./additional-content";
import { Loading } from "@/app/_components/loading";
import { useSerieDetails } from "@/app/_hooks/use-serie-details";
import Image from "next/image";
import { Seasons } from "./seasons";
import { Episodes } from "@/app/_components/episodes";
import { Clapperboard } from "lucide-react";

const Overview = React.lazy(() => import("@/app/_components/overview"));
const Cast = React.lazy(() => import("@/app/_components/cast"));
const Images = React.lazy(() => import("@/app/_components/images"));
const Videos = React.lazy(() => import("@/app/_components/videos"));
const MediaImage = React.lazy(() => import("@/app/_components/media-image"));

interface SerieDetailsProps {
  id: number;
}

const TABS = {
  OVERVIEW: "overview",
  ACTORS: "actors",
  IMAGES: "images",
  VIDEOS: "videos",
  TEMPORADAS: "temporadas"
};

export function SerieDetails({ id }: SerieDetailsProps) {
  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
  const { serieDetails, error } = useSerieDetails(id);

  useEffect(() => {
    if (serieDetails?.name) {
      document.title = `${serieDetails.name} | Series`;
    } else {
      document.title = "Movies";
    }
  }, [serieDetails]);

  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  const renderContent = () => {
    if (!serieDetails) return null;

    switch (activeTab) {
      case TABS.OVERVIEW:
        return (
          <Suspense fallback={<Loading />}>
            <Overview {...serieDetails} />
          </Suspense>
        );
      case TABS.ACTORS:
        return (
          <Suspense fallback={<Loading />}>
            <Cast id={id} contentType="tv" />
          </Suspense>
        );
      case TABS.IMAGES:
        return (
          <Suspense fallback={<Loading />}>
            <Images id={id} contentType="tv" />
          </Suspense>
        );
      case TABS.VIDEOS:
        return (
          <Suspense fallback={<Loading />}>
            <Videos id={id} contentType="tv" />
          </Suspense>
        );
      case TABS.TEMPORADAS:
        return (
          <Suspense fallback={<Loading />}>
            <Seasons id={id} />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {serieDetails ? (
        <>
          <Suspense fallback={<Loading />}>
            <MediaImage
              poster_path={serieDetails.poster_path}
              backdrop_path={serieDetails.backdrop_path}
              name={serieDetails.name}
            />
          </Suspense>

          <div className="relative z-50 mt-40 space-y-4 lg:rounded-none bg-background py-5">
            <Header serieDetails={serieDetails} />

            <div className="flex gap-2 overflow-x-scroll px-5 lg:px-32 [&::-webkit-scrollbar]:hidden">
              <TabButton
                onClick={() => handleTabClick(TABS.OVERVIEW)}
                isActive={activeTab === TABS.OVERVIEW}
                label="Resumo"
              />
              <TabButton
                onClick={() => handleTabClick(TABS.ACTORS)}
                isActive={activeTab === TABS.ACTORS}
                label="Elenco"
              />
              <TabButton
                onClick={() => handleTabClick(TABS.IMAGES)}
                isActive={activeTab === TABS.IMAGES}
                label="Imagens"
              />
              <TabButton
                onClick={() => handleTabClick(TABS.VIDEOS)}
                isActive={activeTab === TABS.VIDEOS}
                label="Videos"
              />
              <TabButton
                onClick={() => handleTabClick(TABS.TEMPORADAS)}
                isActive={activeTab === TABS.TEMPORADAS}
                label="Temporadas"
              />
            </div>

            <div className="px-5 lg:px-32">{renderContent()}</div>
            <AdditionalContent id={id} serieDetails={serieDetails} />
          </div>
          <div className="space-y-4 px-5 lg:px-32">
            <Episodes
              id={id}
              onShowSeasons={() => handleTabClick(TABS.TEMPORADAS)}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
