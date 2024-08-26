import { useQuery } from "@tanstack/react-query";
import { apiKey } from "@/app/utils/api-key";

interface Video {
  key: string;
  name: string;
  site: string;
}

export function useVideos(id: number, contentType: string) {
  return useQuery<Video[]>({
    queryKey: ["get-videos", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}/videos?api_key=${apiKey}`
      );
      const data = await response.json();
      return data.results;
    },
    enabled: !!id
  });
}
