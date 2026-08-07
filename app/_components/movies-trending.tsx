import { MediaCarouselSection } from "./media-carousel-section";

export function MoviesTrending() {
  return (
    <MediaCarouselSection
      endpoint="trending/movie/day"
      title="Filmes em tendência"
      description="As histórias que estão movimentando o cinema hoje."
      viewAllHref="/movies-trending"
      contentType="movie"
    />
  );
}
