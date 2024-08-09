"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface CollectionProps {
  id: number | undefined;
  name: string | undefined;
  poster_path: string | undefined;
}

interface CollectionData {
  overview: string;
  parts: [
    {
      id: number;
      title: string;
      overview: string;
      poster_path: string;
      backdrop_path: string;
    }
  ];
}

export function Collection({ id, name, poster_path }: CollectionProps) {
  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null
  );

  useEffect(() => {
    fetchCollection();
  }, []);

  async function fetchCollection() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setCollectionData(data);
      console.log("collection =>", data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="px-5 lg:px-0">
        <div
          className="bg-gradient-to-b from-black-600/10 h-[34rem] via-transparent px-5 lg:px-0 rounded-lg lg:rounded-none overflow-hidden"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${poster_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            borderImage: "fill 0 linear-gradient(#0001, #000)"
          }}
        >
          <div className="w-full mx-auto px-4 rounded-lg lg:rounded-none sm:px-6 lg:px-8 py-24 space-y-8">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                {name}
              </h1>
            </div>

            <div className="max-w-3xl text-center space-y-4 mx-auto">
              <p className="text-lg text-white/70">
                {collectionData?.overview &&
                collectionData?.overview.length > 300
                  ? collectionData?.overview.slice(0, 200)
                  : collectionData?.overview || ""}
              </p>

              <p className="text-lg text-white/70">
                Incluindo{" "}
                {collectionData?.parts.map((item) => item.title).join(", ")}
              </p>
            </div>

            <div className="text-center">
              <Button className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-[#3a3cff] to-[#2a18ff] shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:shadow-blue-700/50 py-3 px-6">
                Ver Coleção
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
