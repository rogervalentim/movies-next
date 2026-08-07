"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Expand, ImageOff } from "lucide-react";
import { apiKey } from "@/app/utils/api-key";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { SectionHeading } from "./section-heading";

interface ImagesData { file_path: string; }
interface ImagesApiResponse { backdrops: ImagesData[]; posters: ImagesData[]; }
interface ImagesProps { id: number; contentType: string; title?: string; }
interface GalleryItem extends ImagesData { kind: "backdrop" | "poster"; index: number; }

export default function Images({ id, contentType, title = "este título" }: ImagesProps) {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const { data: images, isLoading, isError, refetch } = useQuery<ImagesApiResponse>({
    queryKey: ["get-images", contentType, id],
    queryFn: async () => {
      const response = await fetch(`https://api.themoviedb.org/3/${contentType}/${id}/images?api_key=${apiKey}&include_image_language=pt,en,null`);
      if (!response.ok) throw new Error("Falha ao carregar galeria");
      return response.json();
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 10
  });

  const gallery = useMemo<GalleryItem[]>(() => {
    if (!images) return [];
    return [
      ...images.backdrops.map((item, index) => ({ ...item, kind: "backdrop" as const, index })),
      ...images.posters.map((item, index) => ({ ...item, kind: "poster" as const, index }))
    ];
  }, [images]);

  if (isLoading) return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <div key={index} className="skeleton-shimmer aspect-[4/3] rounded-2xl" />)}</div>;
  if (isError) return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center"><p className="font-semibold text-white">Não foi possível carregar a galeria.</p><Button variant="outline" className="mt-4" onClick={() => refetch()}>Tentar novamente</Button></div>;
  if (!gallery.length) return <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center"><ImageOff className="size-8 text-red-400" /><p className="mt-3 text-slate-400">Nenhuma foto disponível para {title}.</p></div>;

  const visibleGallery = showAll ? gallery : gallery.slice(0, 8);

  return (
    <section aria-labelledby="gallery-title">
      <SectionHeading title="Galeria" description={`${gallery.length} imagens disponíveis`} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {visibleGallery.map((item) => {
          const alt = item.kind === "backdrop" ? `Cena ${item.index + 1} de ${title}` : `Cartaz ${item.index + 1} de ${title}`;
          return (
            <button key={`${item.kind}-${item.file_path}`} type="button" onClick={() => setSelected(item)} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#151515] focus-visible:ring-2 focus-visible:ring-red-500" aria-label={`Ampliar ${alt.toLowerCase()}`}>
              <Image src={`https://image.tmdb.org/t/p/w780${item.file_path}`} alt={alt} fill sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw" className={`transition duration-500 group-hover:scale-[1.04] ${item.kind === "poster" ? "object-cover object-top" : "object-cover"}`} />
              <span className="absolute right-2 top-2 grid size-9 place-items-center rounded-full border border-white/10 bg-black/60 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><Expand className="size-4" /></span>
            </button>
          );
        })}
      </div>
      {gallery.length > 8 && <Button variant="outline" className="mt-6" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll}>{showAll ? "Mostrar menos fotos" : `Ver todas as fotos (${gallery.length})`}</Button>}

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="w-[calc(100%_-_2rem)] max-w-6xl border-white/10 bg-[#0c0c0c] p-2 sm:p-4">
          <DialogHeader className="sr-only"><DialogTitle>{selected ? `${selected.kind === "backdrop" ? "Cena" : "Cartaz"} de ${title}` : "Imagem ampliada"}</DialogTitle></DialogHeader>
          {selected && (
            <div className="flex max-h-[82vh] items-center justify-center overflow-hidden rounded-xl bg-black">
              <Image src={`https://image.tmdb.org/t/p/original${selected.file_path}`} alt={`${selected.kind === "backdrop" ? "Cena" : "Cartaz"} ${selected.index + 1} de ${title}`} width={selected.kind === "poster" ? 780 : 1920} height={selected.kind === "poster" ? 1170 : 1080} sizes="90vw" className="max-h-[82vh] w-auto object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
