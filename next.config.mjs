/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Usa a rota com cache do próprio projeto, sem consumir o Image Optimization.
    loader: "custom",
    loaderFile: "./app/image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**"
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**"
      }
    ]
  }
};

export default nextConfig;
