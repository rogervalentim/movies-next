"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { AdditionalContent } from "./additional-content";
import { useMovieDetails } from "@/app/_hooks/use-movie-details";
import { DetailsHero } from "@/app/_components/details-hero";
import { DetailsSkeleton } from "@/app/_components/details-skeleton";
import { ErrorState } from "@/app/_components/error-state";
import { TabButton } from "@/app/_components/tab-button";
import { Loading } from "@/app/_components/loading";

const Overview = React.lazy(() => import("@/app/_components/overview"));
const Cast = React.lazy(() => import("@/app/_components/cast"));
const Images = React.lazy(() => import("@/app/_components/images"));
const Videos = React.lazy(() => import("@/app/_components/videos"));

interface MovieDetailsProps { id: number; }

const TABS = { OVERVIEW: "overview", ACTORS: "actors", IMAGES: "images", VIDEOS: "videos" } as const;

export function MovieDetails({ id }: MovieDetailsProps) {
  const [activeTab, setActiveTab] = useState<string>(TABS.OVERVIEW);
  const { movieDetails, error, refetch } = useMovieDetails(id);

  useEffect(() => {
    document.title = movieDetails?.title ? `${movieDetails.title} | CineVerse` : "CineVerse";
  }, [movieDetails]);

  const handleTabClick = useCallback((tab: string) => setActiveTab(tab), []);

  if (error) return <ErrorState title="Este filme saiu de cena" description={error} onRetry={refetch} />;
  if (!movieDetails) return <DetailsSkeleton />;

  const renderContent = () => {
    switch (activeTab) {
      case TABS.ACTORS:
        return <Cast id={id} contentType="movie" />;
      case TABS.IMAGES:
        return <Images id={id} contentType="movie" title={movieDetails.title} />;
      case TABS.VIDEOS:
        return <Videos id={id} contentType="movie" />;
      default:
        return <Overview {...movieDetails} />;
    }
  };

  return (
    <main>
      <DetailsHero
        id={id}
        contentType="movie"
        title={movieDetails.title}
        overview={movieDetails.overview}
        poster_path={movieDetails.poster_path}
        backdrop_path={movieDetails.backdrop_path}
        vote_average={movieDetails.vote_average}
        genres={movieDetails.genres || []}
        date={movieDetails.release_date}
        runtime={movieDetails.runtime}
        imdbId={movieDetails.imdb_id}
      />

      <div className="page-container py-8 sm:py-10">
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Detalhes do filme">
          <TabButton onClick={() => handleTabClick(TABS.OVERVIEW)} isActive={activeTab === TABS.OVERVIEW} label="Visão geral" />
          <TabButton onClick={() => handleTabClick(TABS.ACTORS)} isActive={activeTab === TABS.ACTORS} label="Elenco" />
          <TabButton onClick={() => handleTabClick(TABS.IMAGES)} isActive={activeTab === TABS.IMAGES} label="Galeria" />
          <TabButton onClick={() => handleTabClick(TABS.VIDEOS)} isActive={activeTab === TABS.VIDEOS} label="Vídeos" />
        </div>
        <div className="mt-6" role="tabpanel">
          <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
        </div>
      </div>
      <AdditionalContent id={id} movieDetails={movieDetails} />
    </main>
  );
}
