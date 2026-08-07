"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { AdditionalContent } from "./additional-content";
import { Seasons } from "./seasons";
import { Episodes } from "@/app/_components/episodes";
import { useSerieDetails } from "@/app/_hooks/use-serie-details";
import { DetailsHero } from "@/app/_components/details-hero";
import { DetailsSkeleton } from "@/app/_components/details-skeleton";
import { ErrorState } from "@/app/_components/error-state";
import { TabButton } from "@/app/_components/tab-button";
import { Loading } from "@/app/_components/loading";

const Overview = React.lazy(() => import("@/app/_components/overview"));
const Cast = React.lazy(() => import("@/app/_components/cast"));
const Images = React.lazy(() => import("@/app/_components/images"));
const Videos = React.lazy(() => import("@/app/_components/videos"));

interface SerieDetailsProps { id: number; }

const TABS = { OVERVIEW: "overview", ACTORS: "actors", IMAGES: "images", VIDEOS: "videos", SEASONS: "seasons" } as const;

export function SerieDetails({ id }: SerieDetailsProps) {
  const [activeTab, setActiveTab] = useState<string>(TABS.OVERVIEW);
  const { serieDetails, error, refetch } = useSerieDetails(id);

  useEffect(() => {
    document.title = serieDetails?.name ? `${serieDetails.name} | CineVerse` : "CineVerse";
  }, [serieDetails]);

  const handleTabClick = useCallback((tab: string) => setActiveTab(tab), []);

  const showSeasons = useCallback(() => {
    setActiveTab(TABS.SEASONS);
    requestAnimationFrame(() => {
      document
        .getElementById("series-details-tabs")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  if (error) return <ErrorState title="Esta série saiu do ar" description={error} onRetry={refetch} />;
  if (!serieDetails) return <DetailsSkeleton />;

  const renderContent = () => {
    switch (activeTab) {
      case TABS.ACTORS:
        return <Cast id={id} contentType="tv" />;
      case TABS.IMAGES:
        return <Images id={id} contentType="tv" title={serieDetails.name} />;
      case TABS.VIDEOS:
        return <Videos id={id} contentType="tv" />;
      case TABS.SEASONS:
        return <Seasons id={id} />;
      default:
        return <Overview {...serieDetails} />;
    }
  };

  return (
    <main>
      <DetailsHero
        id={id}
        contentType="tv"
        title={serieDetails.name}
        overview={serieDetails.overview}
        poster_path={serieDetails.poster_path}
        backdrop_path={serieDetails.backdrop_path}
        vote_average={serieDetails.vote_average}
        genres={serieDetails.genres || []}
        date={serieDetails.first_air_date}
        seasons={serieDetails.number_of_seasons}
      />

      <div id="series-details-tabs" className="page-container scroll-mt-24 py-8 sm:py-10">
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Detalhes da série">
          <TabButton onClick={() => handleTabClick(TABS.OVERVIEW)} isActive={activeTab === TABS.OVERVIEW} label="Visão geral" />
          <TabButton onClick={() => handleTabClick(TABS.ACTORS)} isActive={activeTab === TABS.ACTORS} label="Elenco" />
          <TabButton onClick={() => handleTabClick(TABS.IMAGES)} isActive={activeTab === TABS.IMAGES} label="Galeria" />
          <TabButton onClick={() => handleTabClick(TABS.VIDEOS)} isActive={activeTab === TABS.VIDEOS} label="Vídeos" />
          <TabButton onClick={() => handleTabClick(TABS.SEASONS)} isActive={activeTab === TABS.SEASONS} label="Temporadas" />
        </div>
        <div className="mt-6" role="tabpanel">
          <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
        </div>
      </div>
      <AdditionalContent id={id} serieDetails={serieDetails} />
      <div className="page-container section-spacing pt-2">
        <Episodes id={id} onShowSeasons={showSeasons} />
      </div>
    </main>
  );
}
