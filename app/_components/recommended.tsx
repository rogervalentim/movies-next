import { MediaCarouselSection } from "./media-carousel-section";

interface RecommendedProps { id: number; title: string; contentType: string; }

export function Recommended({ id, title, contentType }: RecommendedProps) {
  const type = contentType === "tv" ? "tv" : "movie";
  return <MediaCarouselSection endpoint={`${type}/${id}/recommendations`} title={title} description="Escolhas sugeridas a partir deste título." contentType={type} />;
}
