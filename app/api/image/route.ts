import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const ALLOWED_HOSTS = new Set(["image.tmdb.org", "img.youtube.com"]);
const CACHE_CONTROL =
  "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=604800";

const TMDB_WIDTHS = [92, 154, 185, 342, 500, 780] as const;

function getRequestedWidth(value: string | null) {
  const width = Number(value);

  if (!Number.isFinite(width)) return 500;

  return Math.min(Math.max(Math.round(width), 16), 3840);
}

function getTmdbImageUrl(url: URL, requestedWidth: number) {
  const match = url.pathname.match(/^\/t\/p\/(?:w\d+|original)(\/.+)$/);

  if (!match) return null;

  const tmdbWidth = TMDB_WIDTHS.find((width) => width >= requestedWidth);
  const size = tmdbWidth ? `w${tmdbWidth}` : "original";

  return new URL(`/t/p/${size}${match[1]}`, "https://image.tmdb.org");
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl || rawUrl.length > 2048) {
    return NextResponse.json({ error: "URL de imagem inválida." }, { status: 400 });
  }

  let imageUrl: URL;

  try {
    imageUrl = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "URL de imagem inválida." }, { status: 400 });
  }

  if (imageUrl.protocol !== "https:" || !ALLOWED_HOSTS.has(imageUrl.hostname)) {
    return NextResponse.json({ error: "Origem de imagem não permitida." }, { status: 403 });
  }

  if (imageUrl.hostname === "image.tmdb.org") {
    const tmdbUrl = getTmdbImageUrl(
      imageUrl,
      getRequestedWidth(request.nextUrl.searchParams.get("width")),
    );

    if (!tmdbUrl) {
      return NextResponse.json({ error: "Caminho de imagem inválido." }, { status: 400 });
    }

    imageUrl = tmdbUrl;
  }

  try {
    const response = await fetch(imageUrl, {
      headers: { Accept: "image/avif,image/webp,image/*,*/*;q=0.8" },
      next: { revalidate: 2592000 },
    });

    const contentType = response.headers.get("content-type") ?? "";

    if (!response.ok || !contentType.startsWith("image/") || !response.body) {
      return NextResponse.json({ error: "Imagem indisponível." }, { status: 502 });
    }

    return new NextResponse(response.body, {
      headers: {
        "Cache-Control": CACHE_CONTROL,
        "Content-Type": contentType,
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Falha ao carregar a imagem." }, { status: 502 });
  }
}
