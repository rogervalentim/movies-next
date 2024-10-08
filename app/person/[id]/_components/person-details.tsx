"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Loading } from "@/app/_components/loading";
import { Credits } from "./credits";
import { formatDate } from "@/app/utils/format-date";
import Image from "next/image";
import { Images } from "./images";
import { usePersonDetails } from "@/app/_hooks/use-person-details";
import { useCombinedCredits } from "@/app/_hooks/use-combined-credits";
import { Clapperboard } from "lucide-react";
import MediaImage from "@/app/_components/media-image";

interface PersonDetailsProps {
  id: number;
}

export function PersonDetails({ id }: PersonDetailsProps) {
  const [showCredits, setShowCredits] = useState(true);
  const [showImages, setShowImages] = useState(false);

  const { personDetails } = usePersonDetails(id);
  const { latestWork } = useCombinedCredits(id);

  useEffect(() => {
    if (personDetails?.name) {
      document.title = `${personDetails.name} | Movies`;
    } else {
      document.title = "Movies";
    }
  }, [personDetails]);

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
            <MediaImage
              profile_path={personDetails.profile_path}
              name={personDetails.name}
              backdrop_path={latestWork?.backdrop_path}
            />
          </Suspense>

          <div className="relative z-50 mt-40 space-y-4 lg:rounded-none bg-background py-5">
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
