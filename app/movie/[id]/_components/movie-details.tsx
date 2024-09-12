import React, { useState, useCallback, Suspense, useEffect } from "react";
import { TabButton } from "@/app/_components/tab-button";
import { Header } from "./header";
import { AdditionalContent } from "./additional-content";
import { Loading } from "@/app/_components/loading";
import { useMovieDetails } from "@/app/_hooks/use-movie-details";

const Overview = React.lazy(() => import("@/app/_components/overview"));
const Cast = React.lazy(() => import("@/app/_components/cast"));
const Images = React.lazy(() => import("@/app/_components/images"));
const Videos = React.lazy(() => import("@/app/_components/videos"));
const MediaImage = React.lazy(() => import("@/app/_components/media-image"));

interface MovieDetailsProps {
  id: number;
}

const TABS = {
  OVERVIEW: "overview",
  ACTORS: "actors",
  IMAGES: "images",
  VIDEOS: "videos"
};

export function MovieDetails({ id }: MovieDetailsProps) {
  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
  const { movieDetails, error } = useMovieDetails(id);

  useEffect(() => {
    if (movieDetails?.title) {
      document.title = `${movieDetails.title} | Movies`;
    } else {
      document.title = "Movies";
    }
  }, [movieDetails]);

  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  const renderContent = () => {
    if (!movieDetails) return null;

    switch (activeTab) {
      case TABS.OVERVIEW:
        return (
          <Suspense fallback={<Loading />}>
            <Overview {...movieDetails} />
          </Suspense>
        );
      case TABS.ACTORS:
        return (
          <Suspense fallback={<Loading />}>
            <Cast id={id} contentType="movie" />
          </Suspense>
        );
      case TABS.IMAGES:
        return (
          <Suspense fallback={<Loading />}>
            <Images id={id} contentType="movie" />
          </Suspense>
        );
      case TABS.VIDEOS:
        return (
          <Suspense fallback={<Loading />}>
            <Videos id={id} contentType="movie" />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {movieDetails ? (
        <>
          <Suspense fallback={<Loading />}>
            <MediaImage
              poster_path={movieDetails.poster_path}
              backdrop_path={movieDetails.backdrop_path}
              title={movieDetails.title}
            />
          </Suspense>

          <div className="relative z-50 mt-40 space-y-4 lg:rounded-none bg-background py-5">
            <Header movieDetails={movieDetails} />

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
            </div>

            <div className="px-5 lg:px-32">{renderContent()}</div>
            <AdditionalContent id={id} movieDetails={movieDetails} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
