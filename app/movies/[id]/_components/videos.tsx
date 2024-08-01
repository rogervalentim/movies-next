"use client";

import { apiKey } from "@/app/utils/api-key";
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface VideosProps {
  id: number;
}

interface Video {
  key: string;
  name: string;
  site: string;
}

export function Videos({ id }: VideosProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, [id]);

  async function fetchVideos() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setVideos(data.results);
    } catch (error) {
      setError("Failed to fetch videos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      {videos.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {videos.map((video) => (
            <li className="space-y-2" key={video.key}>
              <div className="relative">
                <Image
                  src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                  alt={video.name}
                  width={0}
                  height={0}
                  quality={100}
                  sizes="100vh"
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
                <button className="absolute inset-0 flex justify-center items-center">
                  <div className="rounded-full bg-black/60 flex items-center justify-center w-10 h-10">
                    <a
                      href={`https://www.${video.site}.com/watch?v=${video.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="text-gray-300 fill-gray-300 size-6" />
                    </a>
                  </div>
                </button>
              </div>
              <h2 className="font-smeibold text-[#323232]">{video.name}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <p>No videos available</p>
      )}
    </section>
  );
}
