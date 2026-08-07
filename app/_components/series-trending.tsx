import { MediaCarouselSection } from "./media-carousel-section";

export function SeriesTrending() {
  return (
    <MediaCarouselSection
      endpoint="trending/tv/day"
      title="Séries em tendência"
      description="Temporadas e universos que todo mundo está comentando."
      viewAllHref="/series-trending"
      contentType="tv"
    />
  );
}
