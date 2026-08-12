/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // As imagens já são servidas em tamanhos adequados pelo TMDB e YouTube.
    // Entregá-las diretamente evita consumir a cota do Image Optimization da Vercel.
    unoptimized: true,
    domains: ["image.tmdb.org", "img.youtube.com"]
  }
};

export default nextConfig;
