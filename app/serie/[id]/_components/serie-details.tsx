import React, { useState, useCallback, Suspense } from "react";
import { TabButton } from "@/app/_components/tab-button";
import { Header } from "./header";
import { AdditionalContent } from "./additional-content";
import { Loading } from "@/app/_components/loading";
import { useSerieDetails } from "@/app/_hooks/use-serie-details";
import Image from "next/image";

const Overview = React.lazy(() => import("@/app/_components/overview"));
const Cast = React.lazy(() => import("@/app/_components/cast"));
const Images = React.lazy(() => import("@/app/_components/images"));
const Videos = React.lazy(() => import("@/app/_components/videos"));
const SerieImage = React.lazy(() => import("./serie-image"));

interface SerieDetailsProps {
  id: number;
}

const TABS = {
  OVERVIEW: "overview",
  ACTORS: "actors",
  IMAGES: "images",
  VIDEOS: "videos"
};

export function SerieDetails({ id }: SerieDetailsProps) {
  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
  const { serieDetails, error } = useSerieDetails(id);

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
      default:
        return null;
    }
  };

  return (
    <div>
      {serieDetails ? (
        <>
          <Suspense fallback={<Loading />}>
            <SerieImage
              poster_path={serieDetails.poster_path}
              name={serieDetails.name}
            />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <div className="relative  lg:flex justify-center hidden items-center">
              <div className="relative w-full px-32">
                <Image
                  src={`https://image.tmdb.org/t/p/w1280/${serieDetails.backdrop_path}`}
                  alt={serieDetails.name}
                  width={0}
                  height={0}
                  quality={100}
                  sizes="100vw"
                  className="object-cover h-[80dvh] w-full rounded-b-lg"
                />
              </div>

              <div className="absolute left-32 bottom-0  transform translate-x-0 translate-y-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w780/${serieDetails.poster_path}`}
                  alt={serieDetails.name}
                  width={0}
                  height={0}
                  quality={100}
                  sizes="100vh"
                  className="w-32 md:w-40 lg:w-48 xl:w-56 h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </Suspense>
          <div className="relative z-50 mt-[-1.5rem] lg:mt-0 rounded-tl-3xl space-y-4 rounded-tr-3xl lg:rounded-none bg-background py-5 ">
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
            </div>

            <div className="px-5 lg:px-32">{renderContent()}</div>
            <AdditionalContent id={id} serieDetails={serieDetails} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
