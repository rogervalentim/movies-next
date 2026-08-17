import type { ImageLoaderProps } from "next/image";

const PROXIED_IMAGE_HOSTS = [
  "https://image.tmdb.org/",
  "https://img.youtube.com/",
];

export default function imageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  if (!PROXIED_IMAGE_HOSTS.some((host) => src.startsWith(host))) {
    return src;
  }

  const params = new URLSearchParams({
    url: src,
    width: String(width),
    quality: String(quality ?? 75),
  });

  return `/api/image?${params.toString()}`;
}
