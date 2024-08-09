"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  contentType: string;
}

interface Data {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
}

export function Hero({ contentType }: HeroProps) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/${contentType}/day?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setData(data.results[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
        className="bg-gradient-to-b from-black-600/10 via-transparent px-5 lg:px-0 rounded-lg lg:rounded-none overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          borderImage: "fill 0 linear-gradient(#0001, #000)"
        }}
      >
        <div className="w-full mx-auto px-4 rounded-lg lg:rounded-none sm:px-6 lg:px-8 py-24 space-y-8">
          <div className="flex justify-center">
            <Link
              className="group inline-flex items-center bg-white/10 hover:bg-white/10 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-none focus:bg-white/10"
              href={contentType === "tv" ? "/series" : "/movies"}
            >
              <p className="me-2 text-white text-sm">Buscar mais.</p>
              <span className="group-hover:bg-white/10 py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>

          <div className="max-w-3xl text-center mx-auto">
            <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {data?.title || data?.name}
            </h1>
          </div>

          <div className="max-w-3xl text-center mx-auto">
            <p className="text-lg text-white/70">
              {data?.overview && data.overview.length > 300
                ? data.overview.slice(0, 200)
                : data?.overview || ""}
            </p>
          </div>

          <div className="text-center">
            <Link
              className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-[#3a3cff] to-[#2a18ff] shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:shadow-blue-700/50 py-3 px-6"
              href={
                contentType === "tv"
                  ? `/serie/${data?.id}`
                  : `/movie/${data?.id}`
              }
            >
              Ver detalhes
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
