"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useVideos } from "../_hooks/use-videos";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { SectionHeading } from "./section-heading";

interface VideosProps { id: number; contentType: string; }

export default function Videos({ id, contentType }: VideosProps) {
  const { data: videos = [], isLoading, isError } = useVideos(id, contentType);

  if (isLoading) return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="skeleton-shimmer aspect-video rounded-2xl" />)}</div>;
  if (isError) return <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-slate-400">Não foi possível carregar os vídeos.</p>;
  if (!videos.length) return <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-slate-400">Nenhum vídeo disponível para este título.</p>;

  return (
    <section aria-labelledby="videos-title">
      <SectionHeading title="Vídeos" description={`${videos.length} vídeos disponíveis`} />
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <li key={video.key}>
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="group w-full text-left focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808] rounded-2xl" aria-label={`Assistir ${video.name}`}>
                  <span className="relative block aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#151515]">
                    <Image src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`} alt={`Miniatura de ${video.name}`} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 32vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/5" />
                    <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur"><Play className="ml-0.5 size-5 fill-current" /></span>
                  </span>
                  <span className="mt-3 line-clamp-2 block text-sm font-semibold text-white group-hover:text-red-400">{video.name}</span>
                </button>
              </DialogTrigger>
              <DialogContent className="w-[calc(100%_-_2rem)] max-w-5xl border-white/10 bg-[#0c0c0c] p-2 sm:p-4">
                <DialogHeader className="sr-only"><DialogTitle>{video.name}</DialogTitle></DialogHeader>
                <div className="aspect-video overflow-hidden rounded-xl bg-black"><iframe title={video.name} src={`https://www.youtube.com/embed/${video.key}?autoplay=1`} className="h-full w-full border-0" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </section>
  );
}
