"use client";

import {
  ChevronDown,
  Clapperboard,
  Film,
  Home,
  Menu,
  MonitorPlay,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "../_lib/utils";

const movieLinks = [
  { href: "/movies", label: "Explorar filmes" },
  { href: "/movies-trending", label: "Em tendência" },
  { href: "/movies-popular", label: "Populares" },
  { href: "/movies-top-rated", label: "Mais bem avaliados" },
  { href: "/movies-now-playing", label: "Em cartaz" },
];

const serieLinks = [
  { href: "/series", label: "Explorar séries" },
  { href: "/series-trending", label: "Em tendência" },
  { href: "/series-popular", label: "Populares" },
  { href: "/series-top-rated", label: "Mais bem avaliadas" },
  { href: "/series-now-playing", label: "No ar" },
];

function isSectionActive(pathname: string, section: "movies" | "series") {
  const prefixes =
    section === "movies" ? ["/movie", "/movies"] : ["/serie", "/series"];
  return prefixes.some((prefix) => pathname.startsWith(prefix));
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    if (pathname === "/search") {
      setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
    }
  }, [pathname]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuery = query.trim();
    setMobileMenuOpen(false);
    router.push(
      normalizedQuery
        ? `/search?q=${encodeURIComponent(normalizedQuery)}`
        : "/search",
    );
  }

  const navLinkClass = (active: boolean) =>
    cn(
      "relative inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
      active &&
        "bg-primary/10 text-foreground after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary",
    );

  const mobileNavLinkClass = (active: boolean) =>
    cn(
      "flex min-h-11 items-center rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-muted-foreground transition active:scale-[0.98]",
      active
        ? "border-primary/20 bg-primary/10 text-foreground shadow-sm"
        : "bg-muted/35 hover:bg-muted hover:text-foreground",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <div className="page-container flex min-h-16 items-center gap-2 sm:min-h-[72px] sm:gap-3">
        <Link
          href="/"
          className="group mr-auto inline-flex min-h-11 items-center gap-2.5 rounded-xl focus-visible:outline-none"
          aria-label="CineVerse — página inicial"
        >
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-red-800 shadow-glow">
            <Clapperboard className="size-5 text-white transition-transform group-hover:-rotate-6" />
            <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span className="hidden text-lg font-extrabold tracking-tight text-foreground min-[360px]:inline sm:text-xl">
            Cine<span className="text-red-500">Verse</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegação principal"
        >
          <Link href="/" className={navLinkClass(pathname === "/")}>
            <Home className="size-4" /> Início
          </Link>

          <Menubar className="h-auto border-0 bg-transparent p-0">
            <MenubarMenu>
              <MenubarTrigger
                className={navLinkClass(isSectionActive(pathname, "movies"))}
                aria-label="Abrir menu de filmes"
              >
                <Film className="size-4" /> Filmes{" "}
                <ChevronDown className="size-3.5" />
              </MenubarTrigger>
              <MenubarContent className="min-w-56 border-border bg-popover/95 p-2 text-popover-foreground shadow-2xl backdrop-blur-xl">
                {movieLinks.map((item) => (
                  <MenubarItem
                    key={item.href}
                    asChild
                    className="min-h-10 cursor-pointer rounded-lg focus:bg-accent focus:text-accent-foreground"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger
                className={navLinkClass(isSectionActive(pathname, "series"))}
                aria-label="Abrir menu de séries"
              >
                <MonitorPlay className="size-4" /> Séries{" "}
                <ChevronDown className="size-3.5" />
              </MenubarTrigger>
              <MenubarContent className="min-w-56 border-border bg-popover/95 p-2 text-popover-foreground shadow-2xl backdrop-blur-xl">
                {serieLinks.map((item) => (
                  <MenubarItem
                    key={item.href}
                    asChild
                    className="min-h-10 cursor-pointer rounded-lg focus:bg-accent focus:text-accent-foreground"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </nav>

        <form
          onSubmit={handleSubmit}
          role="search"
          className="hidden w-full max-w-[260px] md:block xl:max-w-[310px]"
        >
          <label htmlFor="global-search" className="sr-only">
            Buscar filmes, séries e pessoas
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="global-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar no CineVerse"
              className="h-11 bg-muted/60 pl-10 pr-4"
            />
          </div>
        </form>

        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          aria-label="Buscar no CineVerse"
          asChild
        >
          <Link href="/search">
            <Search className="size-5" />
          </Link>
        </Button>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="lg:hidden"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-[92%] max-w-[420px] flex-col gap-0 overflow-hidden border-border bg-background/98 p-0 text-foreground backdrop-blur-2xl"
          >
            <SheetHeader className="border-b border-border px-5 py-5 pr-14 text-left">
              <SheetTitle className="flex items-center gap-3 text-foreground">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-red-500 to-red-800 shadow-glow">
                  <Sparkles className="size-5 text-white" />
                </span>
                <span>
                  <span className="block text-base font-extrabold">
                    Cine<span className="text-red-500">Verse</span>
                  </span>
                  <span className="block text-xs font-normal text-muted-foreground">
                    O que você quer assistir?
                  </span>
                </span>
              </SheetTitle>
            </SheetHeader>

            <div className="border-b border-border p-4">
              <form onSubmit={handleSubmit} role="search">
                <label htmlFor="mobile-search" className="sr-only">
                  Buscar filmes, séries e pessoas
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="mobile-search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Filme, série ou pessoa"
                    className="h-12 rounded-xl bg-muted/60 pl-10 pr-4"
                  />
                </div>
              </form>
            </div>

            <nav
              className="scrollbar-none flex-1 space-y-4 overflow-y-auto p-4"
              aria-label="Navegação mobile"
            >
              <div className="grid grid-cols-2 gap-2">
                <SheetClose asChild>
                  <Link
                    href="/"
                    aria-current={pathname === "/" ? "page" : undefined}
                    className={cn(
                      mobileNavLinkClass(pathname === "/"),
                      "gap-2.5",
                    )}
                  >
                    <Home className="size-4 text-red-500" /> Início
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/search"
                    aria-current={
                      pathname === "/search" ? "page" : undefined
                    }
                    className={cn(
                      mobileNavLinkClass(pathname === "/search"),
                      "gap-2.5",
                    )}
                  >
                    <Search className="size-4 text-red-500" /> Buscar
                  </Link>
                </SheetClose>
              </div>

              <section
                className={cn(
                  "rounded-2xl border bg-card/55 p-3",
                  isSectionActive(pathname, "movies")
                    ? "border-primary/25"
                    : "border-border",
                )}
                aria-labelledby="mobile-movies-title"
              >
                <div className="mb-3 flex items-center gap-3 px-1">
                  <span className="grid size-9 place-items-center rounded-xl bg-red-500/10 text-red-500">
                    <Film className="size-4" />
                  </span>
                  <div>
                    <h2
                      id="mobile-movies-title"
                      className="text-sm font-bold text-foreground"
                    >
                      Filmes
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Descubra seu próximo favorito
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {movieLinks.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={mobileNavLinkClass(isActive)}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </section>

              <section
                className={cn(
                  "rounded-2xl border bg-card/55 p-3",
                  isSectionActive(pathname, "series")
                    ? "border-primary/25"
                    : "border-border",
                )}
                aria-labelledby="mobile-series-title"
              >
                <div className="mb-3 flex items-center gap-3 px-1">
                  <span className="grid size-9 place-items-center rounded-xl bg-red-500/10 text-red-500">
                    <MonitorPlay className="size-4" />
                  </span>
                  <div>
                    <h2
                      id="mobile-series-title"
                      className="text-sm font-bold text-foreground"
                    >
                      Séries
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Encontre sua próxima maratona
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {serieLinks.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={mobileNavLinkClass(isActive)}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </section>
            </nav>

          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
