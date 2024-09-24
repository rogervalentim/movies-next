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
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 brightness-75"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/w1280${data?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          zIndex: -1
        }}
      />
      <div className="relative px-6 py-20 space-y-10 text-center lg:px-0 lg:py-32">
        {/* Call to action for search */}
        <div className="flex justify-center">
          <Link
            className="group flex items-center bg-white/20 hover:bg-white/30 border border-white/20 p-1 ps-4 rounded-full shadow-md transition-all duration-300 focus:outline-none"
            href="/search"
          >
            <p className="mr-2 text-white text-sm">Buscar mais</p>
            <span className="flex items-center gap-x-2 rounded-full bg-white/20 p-2 transition-all duration-300 group-hover:bg-white/30">
              <ArrowRight size={16} className="text-white" />
            </span>
          </Link>
        </div>

        {/* Title */}
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-100 line-clamp-1">
            {data?.title || data?.name}
          </h1>
        </div>

        {/* Overview */}
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-gray-300 line-clamp-3">{data?.overview}</p>
        </div>

        {/* "Ver detalhes" Button */}
        <div>
          <Link
            className="inline-flex items-center justify-center gap-x-3 bg-gradient-to-tl from-[#3a3cff] to-[#2a18ff] hover:shadow-lg hover:shadow-blue-700/50 border-transparent text-white text-sm font-medium rounded-full focus:outline-none py-3 px-6 transition-all duration-300"
            href={
              contentType === "tv" ? `/serie/${data?.id}` : `/movie/${data?.id}`
            }
          >
            Ver detalhes
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
