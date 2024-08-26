import { Loading } from "@/app/_components/loading";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useVideos } from "../_hooks/use-videos";

interface VideosProps {
  id: number;
  contentType: string;
}

export default function Videos({ id, contentType }: VideosProps) {
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

  const { data: videos, isLoading } = useVideos(id, contentType);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      {videos && videos.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos?.map((video) => (
            <li className="relative aspect-video" key={video.key}>
              <div className="relative aspect-video cursor-pointer">
                <Image
                  src={
                    video.key
                      ? `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`
                      : "/youtube-6.svg"
                  }
                  alt={video.name}
                  unoptimized
                  fill
                  className="rounded-md border border-border object-cover"
                  loading="lazy"
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
              <h2 className="font-semibold text-primary mt-2">{video.name}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          {contentType === "tv"
            ? "sem videos para essa série selecionada"
            : "sem videos para esse filme selecionado"}
        </p>
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
