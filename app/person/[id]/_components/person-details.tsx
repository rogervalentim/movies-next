"use client";

import React, { useEffect, useState, Suspense } from "react";
import { PersonImage } from "./person-image";
import { Loading } from "@/app/_components/loading";
import { Credits } from "./credits";
import { formatDate } from "@/app/utils/format-date";
import Image from "next/image";
import { Images } from "./images";
import { usePersonDetails } from "@/app/_hooks/use-person-details";
import { useCombinedCredits } from "@/app/_hooks/use-combined-credits";
import { Clapperboard } from "lucide-react";

interface PersonDetailsProps {
  id: number;
}

export function PersonDetails({ id }: PersonDetailsProps) {
  const [showCredits, setShowCredits] = useState(true);
  const [showImages, setShowImages] = useState(false);

  const { personDetails } = usePersonDetails(id);
  const { latestWork } = useCombinedCredits(id);

  function toggleCredits() {
    setShowCredits(true);
    setShowImages(false);
  }

  function toggleImages() {
    setShowImages(true);
    setShowCredits(false);
  }

  return (
    <div>
      {personDetails ? (
        <>
          <Suspense fallback={<Loading />}>
            <PersonImage
              profile_path={personDetails.profile_path}
              name={personDetails.name}
            />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <div className="relative lg:flex justify-center hidden items-center  px-32">
              <div className="relative w-full">
                {latestWork ? (
                  <>
                    {latestWork?.backdrop_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w1280/${latestWork?.backdrop_path}`}
                        alt={personDetails.name}
                        width={0}
                        height={0}
                        quality={100}
                        sizes="100vw"
                        className="object-cover h-[80dvh] w-full rounded-b-lg"
                      />
                    ) : (
                      <div className="flex justify-center items-center  h-[80dvh] w-full bg-[#3a3cff] rounded-lg shadow-md">
                        <Clapperboard size={100} className="text-white" />
                      </div>
                    )}
                    <div className="absolute right-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] font-medium text-[#323232]">
                      <p className="text-sm">
                        Este foi o último trabalho de {personDetails.name}:{" "}
                        {latestWork.title}
                      </p>
                    </div>
                  </>
                ) : null}
              </div>

              <div className="absolute left-32 bottom-0 transform translate-x-0 translate-y-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w780/${personDetails.profile_path}`}
                  alt={personDetails.name}
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
            <div className="px-5 lg:px-32 space-y-4">
              <h1 className="text-2xl font-semibold">{personDetails.name}</h1>

              <div className="flex flex-col gap-2">
                <span className="flex gap-2">
                  Nascido em:
                  <span className="text-muted-foreground">
                    {formatDate(personDetails.birthday)}
                  </span>
                </span>
                <span className="flex gap-2">
                  Local de nascimento:
                  <span className="text-muted-foreground">
                    {personDetails.place_of_birth}
                  </span>
                </span>
                {personDetails.deathday && (
                  <span className="flex gap-2">
                    Faleceu em:{" "}
                    <span className="text-muted-foreground">
                      {formatDate(personDetails.deathday)}
                    </span>
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg lg:text-3xl">Biografia</h3>
              <p className="text-sm text-muted-foreground lg:text-xl">
                {personDetails.biography.length === 0
                  ? "Esse ator não tem uma biografia"
                  : personDetails.biography}
              </p>
            </div>

            <div className="flex gap-2 overflow-x-scroll px-5 lg:px-32 [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                className={`flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-md ${
                  showCredits
                    ? "bg-[#3a3cff] text-white active:bg-[#3a3cff]"
                    : "bg-secondary text-secondary-foreground hover:bg-[#3a3cff] hover:text-white"
                }`}
                onClick={toggleCredits}
              >
                <span className="text-sm font-semibold">Créditos</span>
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-md ${
                  showImages
                    ? "bg-[#3a3cff] text-white active:bg-[#3a3cff]"
                    : "bg-secondary text-secondary-foreground hover:bg-[#3a3cff] hover:text-white"
                }`}
                onClick={toggleImages}
              >
                <span className="text-sm font-semibold">Imagens</span>
              </button>
            </div>

            {showCredits && (
              <div className="px-5 lg:px-32 space-y-4">
                <Suspense fallback={<Loading />}>
                  <Credits id={id} />
                </Suspense>
              </div>
            )}

            {showImages && (
              <div className="px-5 lg:px-32 space-y-4">
                <Suspense fallback={<Loading />}>
                  <Images id={id} />
                </Suspense>
              </div>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
