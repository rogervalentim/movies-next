"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import Image from "next/image";
import { Ghost, Heart, Smile } from "lucide-react";
import { GiRevolver } from "react-icons/gi";
import { FaRegSadCry } from "react-icons/fa";
import { Search } from "./search";

interface Movie {
  poster_path: string;
  backdrop_path: string;
}

export function Hero() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMovie(data.results[0]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section className="lg:hidden px-5">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path})`}
          alt="backdrop"
          className="h-auto w-full rounded-3xl object-contain"
          height={0}
          width={0}
          sizes="100vw"
          quality={100}
        />
      </section>
      <section
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie?.backdrop_path})`,
          borderImage: "fill 0 linear-gradient(#0001, #000)"
        }}
        className="hidden w-full h-[31.25rem] bg-cover bg-center lg:flex justify-between px-32"
      >
        <div className="pt-32">
          <h1 className="font-bold  text-white text-5xl">
            Encontre o seu filme ou série favorito?
          </h1>
          <p className="text-white text-lg">
            Encontre e explore sua próxima obsessão cinematográfica com apenas
            <br />
            alguns cliques
          </p>
          <div className="bg-white  flex px-6 mt-8  justify-center items-center rounded-lg w-[41.125rem] h-20">
            <Search />
          </div>
        </div>

        <div className="flex  gap-4 overflow-x-scroll px-5 lg:hidden  [&::-webkit-scrollbar]:hidden pt-10">
          <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
            <GiRevolver size={20} />
            <span className="text-sm font-semibold text-[#323232]">Ação</span>
          </div>
          <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
            <Smile size={20} />
            <span className="text-sm font-semibold text-[#323232]">
              Comédia
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
            <FaRegSadCry size={20} />
            <span className="text-sm font-semibold text-[#323232]">Drama</span>
          </div>
          <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
            <Heart size={20} className="text-red-600 fill-red-600" />
            <span className="text-sm font-semibold text-[#323232]">
              Romance
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
            <span className="text-sm font-semibold text-[#323232]">
              Suspense
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
            <Ghost size={20} />
            <span className="text-sm font-semibold text-[#323232]">Terror</span>
          </div>
        </div>

        <div className="pt-[8.125rem]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt="backdrop path"
            className="w-64 h-[23.125rem] rounded-lg"
            height={0}
            width={0}
            sizes="100vw"
            quality={100}
          />
        </div>
      </section>
    </>
  );
}
