"use client";

import { apiKey } from "@/app/utils/api-key";
import { useEffect, useState } from "react";
import { PersonImage } from "./person-image";
import { Loading } from "@/app/_components/loading";
import { Users, Image as ImageLucide } from "lucide-react";
import { Images } from "./images";
import { Credits } from "./credits";

interface PersonDetailsProps {
  id: number;
}

interface PersonDetailsData {
  id: number;
  name: string;
  profile_path: string;
  biography: string;
  birthday: string;
  known_for_department: string;
}

export function PersonDetails({ id }: PersonDetailsProps) {
  const [personData, setPersonData] = useState<PersonDetailsData | null>(null);
  const [showCredits, setShowCredits] = useState(true);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    fetchPersonData();
  }, []);

  async function fetchPersonData() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setPersonData(data);
    } catch (error) {
      console.log(error);
    }
  }

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
      {personData ? (
        <>
          <PersonImage
            profile_path={personData.profile_path}
            name={personData.name}
          />

          <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl space-y-4 rounded-tr-3xl bg-white py-5 lg:hidden ">
            <div className="px-5 space-y-4">
              <div className="flex justify-between">
                <h1 className="text-xl font-semibold">{personData.name}</h1>
              </div>

              <h3 className="font-semibold">Biografia</h3>
              <p className="text-sm text-muted-foreground">
                {personData.biography.length === 0
                  ? "Esse ator não tem uma biografia"
                  : personData.biography}
              </p>
            </div>

            <div className="flex gap-4 overflow-x-scroll px-5 lg:hidden [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                className={`flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-md ${
                  showCredits
                    ? "bg-[#3a3cff] text-white active:bg-[#3a3cff]"
                    : "bg-white text-[#323232] hover:bg-[#3a3cff] hover:text-white"
                }`}
                onClick={toggleCredits}
              >
                <Users size={20} />
                <span className="text-sm font-semibold">Créditos</span>
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-md ${
                  showImages
                    ? "bg-[#3a3cff] text-white active:bg-[#3a3cff]"
                    : "bg-white text-[#323232] hover:bg-[#3a3cff] hover:text-white"
                }`}
                onClick={toggleImages}
              >
                <ImageLucide size={20} />
                <span className="text-sm font-semibold">Imagens</span>
              </button>
            </div>

            {showCredits && (
              <div className=" px-5 space-y-4">
                <Credits id={id} />
              </div>
            )}

            {showImages && (
              <div className=" px-5 space-y-4">
                <Images id={id} />
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
