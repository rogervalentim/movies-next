"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../utils/api-key";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";

interface CollectionProps {
  id: number | undefined;
  name: string | undefined;
  backdrop_path: string | undefined;
  poster_path: string | undefined;
}

interface CollectionData {
  overview: string;
  parts: [
    {
      id: number;
      title: string;
      poster_path: string;
      backdrop_path: string;
      overview: string;
    }
  ];
}

export function Collection({
  id,
  name,
  backdrop_path,
  poster_path
}: CollectionProps) {
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
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path || poster_path})`,
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

          <p className="max-w-3xl text-center text-white/70 mx-auto mt-4">
            Incluindo{" "}
            {collectionData?.parts.map((item) => item.title).join(", ")}
          </p>
        </div>

        <Dialog modal>
          <div className="text-center">
            <DialogTrigger className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-[#3a3cff] to-[#2a18ff] shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:shadow-blue-700/50 py-3 px-6">
              Ver Coleção
            </DialogTrigger>
          </div>
          <DialogContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="max-w-screen-lg"
          >
            <ScrollArea className="max-h-[80dvh] md:pr-4">
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription>
                  {collectionData?.overview}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  mt-4">
                {collectionData?.parts.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center bg-background border border-border rounded-lg shadow"
                  >
                    <div className="flex w-full">
                      <Image
                        src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
                        alt={item.title}
                        width={0}
                        height={0}
                        quality={100}
                        sizes="100vh"
                        className="shadow-md h-72 w-[45%] object-cover"
                        loading="lazy"
                      />
                      <Image
                        src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                        alt={item.title}
                        width={0}
                        height={0}
                        quality={100}
                        sizes="100vh"
                        className="shadow-md h-72 w-[55%] object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-primary">
                        {item.title}
                      </h5>
                      <p className="mb-3 font-normal text-muted-foreground line-clamp-3">
                        {item.overview}
                      </p>

                      <Link href={`/movie/${item.id}`} passHref>
                        <Button className="bg-gradient-to-b w-full text-white rounded-md from-[#3a3cff] to-[#2a18ff] hover:from[#2a18ff] hover:to-[#1e0ae3]">
                          Ver detalhes
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
