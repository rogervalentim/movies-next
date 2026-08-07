import { MediaCarouselSection } from "./media-carousel-section";

interface SimilarProps { id: number; title: string; contentType: string; }

export function Similar({ id, title, contentType }: SimilarProps) {
  const type = contentType === "tv" ? "tv" : "movie";
  return <MediaCarouselSection endpoint={`${type}/${id}/similar`} title={title} description="Mais histórias com uma atmosfera parecida." contentType={type} />;
}
