"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface CollectionProps {
  id: number | undefined;
  name: string | undefined;
  backdrop_path: string | undefined;
}

interface CollectionData {
  overview: string;
  parts: [
    {
      id: number;
      title: string;
      poster_path: string;
      backdrop_path: string;
    }
  ];
}

export function Collection({ id, name, backdrop_path }: CollectionProps) {
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
    <div className="relative overflow-hidden">
      <div
        className="absolute brightness-50 rounded-lg inset-0"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          zIndex: -1
        }}
      />
      <div className="relative px-5 lg:px-0 py-24 space-y-8">
        <div className="w-full mx-auto px-4 rounded-lg sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {name}
            </h1>
          </div>

          <p className="max-w-3xl text-center text-white/70 mx-auto">
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
  );
}
