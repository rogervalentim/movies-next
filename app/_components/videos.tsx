import { Loading } from "@/app/_components/loading";
import { apiKey } from "@/app/utils/api-key";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface VideosProps {
  id: number;
  contentType: string;
}

interface Video {
  key: string;
  name: string;
  site: string;
}

export default function Videos({ id, contentType }: VideosProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");

  const openModal = (videoId: string) => {
    setSelectedVideoId(videoId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideoId("");
    setModalOpen(false);
  };

  useEffect(() => {
    fetchVideos();
  }, [id]);

  async function fetchVideos() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}/videos?api_key=${apiKey}&language=en-US`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setVideos(data.results);
      console.log(data.results);
      setLoading(true);
    } catch (error) {
      setError("Failed to fetch videos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
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
                  src={
                    video.key
                      ? `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`
                      : "/youtube-6.svg"
                  }
                  alt={video.name}
                  width={0}
                  height={0}
                  quality={100}
                  sizes="100vh"
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
                <button
                  className="absolute inset-0 flex justify-center items-center"
                  onClick={() => openModal(video.key)}
                >
                  <div className="rounded-full bg-black/60 flex items-center justify-center w-10 h-10">
                    <Play className="text-gray-300 fill-gray-300 size-6" />
                  </div>
                </button>
              </div>
              <h2 className="font-smeibold text-primary">{video.name}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sem videos para esse filme selecionado</p>
      )}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="p-4 rounded-lg">
            <button
              className="absolute top-1 right-1 z-100 p-3 text-3xl bg-black/60 rounded-full hover:text-primary transition"
              onClick={closeModal}
            >
              <X className="text-2xl text-white" />
            </button>
            <div className="flex justify-center items-center">
              <iframe
                title="YouTube Video"
                allow="autoplay; encrypted-media"
                className="max-w-full w-[800px] h-screen m-5 lg:m-20 border-none"
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                allowFullScreen={true}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
